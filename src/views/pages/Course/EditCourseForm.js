import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Space,
  Select,
  Upload,
  Row,
  Col,
  Divider,
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  handleAddCourseApi,
  handleSubCatagoryApi,
  
  handleCourseListApi,
  handleViewCourseApi,
  handleUpdateCourseApi, // <-- You need to define this in your API utils
} from "../../../utils/services";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import DraftEditorFormItem from "../../../components/QuillEditorFormItem";
import DraftEditorEdit from "../../../components/DraftEditorEdit";

const { TextArea } = Input;
const { Title } = Typography;

const EditCourseForm = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const newChapeter = values?.category_id?.map((item) => item).join(",");
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("short_description", values.short_description);
      formData.append("description", values.description);
      formData.append("requirement", values.requirements);
      formData.append("price", values.price);
      formData.append("discounted_price", values.discount);
      formData.append("feature_json", JSON.stringify(values.feature_json));
      formData.append("objectives_summary", JSON.stringify(values.objectives_summary));
      formData.append("tags", JSON.stringify(values.tags));
      formData.append("category", newChapeter);

      const imageFile = values.image?.[0]?.originFileObj;
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const bannerFile = values.banner_image?.[0]?.originFileObj;
      if (bannerFile) {
        formData.append("banner_image", bannerFile);
      }

      const res = await handleUpdateCourseApi(formData,id);
    
      toast.success(`Course ${id ? "updated" : "created"} successfully!`);
      navigate("/course");
    } catch (error) {
      console.error("Failed to submit course:", error);
      toast.error("Failed to submit course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await handleSubCatagoryApi();
      setCategoryList(response.res.data);
    };
    const fetchCourseData = async () => {
      if (!id) return;
      try {
        const response = await handleViewCourseApi(id);  // You must implement this in services
        const data = response.res.data

        form.setFieldsValue({
          ...data,
          image: data.image
            ? [
                {
                  uid: "-1",
                  name: "course-image.jpg",
                  status: "done",
                  url: data.image,
                },
              ]
            : [],
          banner_image: data.banner_image
            ? [
                {
                  uid: "-2",
                  name: "banner-image.jpg",
                  status: "done",
                  url: data.banner_image,
                },
              ]
            : [],
        });
      } catch (err) {
        console.error("Error fetching course:", err);
        toast.error("Failed to load course data");
      }
    };

    fetchCategories();
    fetchCourseData();
  }, [id, form]);

  return (
    <div className="course-form-wrapper">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: "",
          short_description: "",
          description: "",
          requirements: "",
          price: 0,
          discount: 0,
          feature_json: [""],
          objectives_summary: [""],
          tags: [],
          category_id: [],
        }}
      >
        <Title level={3} className="form-title">
          {id ? "Edit Course Information" : "Create New Course"}
        </Title>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Course Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Enter course name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Categories"
              name="category_id"
              rules={[{ required: true, message: "Please select categories" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select course categories"
                optionFilterProp="children"
              >
                {categoryList.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Price" name="price" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Discounted Price" name="discount" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Tags"
              name="tags"
              rules={[{ required: true, message: "Please select at least one tag" }]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select tags"
                options={[
                  { label: "React", value: "react" },
                  { label: "JavaScript", value: "javascript" },
                  { label: "UI/UX", value: "uiux" },
                  { label: "Backend", value: "backend" },
                  { label: "API", value: "api" },
                  { label: "Database", value: "database" },
                  { label: "Premium", value: "Premium" },
                  { label: "BestSeller", value: "BestSeller" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Short description"
              name="short_description"
              rules={[{ required: true, message: "short_description is required" }]}
              getValueFromEvent={(content) => content}
            >
              <DraftEditorEdit />
            </Form.Item>
          </Col>
          <Col xs={24}>
          <Form.Item label="Description" 
              name="description"
              rules={[{ required: true, message: "description is required" }]}
              getValueFromEvent={(content) => content}>
               <DraftEditorEdit />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Requirement" name="requirements"
               rules={[{ required: true, message: "Requirement is required" }]}
               getValueFromEvent={(content) => content}
             >
            
            <DraftEditorEdit />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Course Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            >
              <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Banner Image"
              name="banner_image"
              valuePropName="fileList"
              getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            >
              <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload Banner</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="center">Course Features</Divider>
        <Form.List name="feature_json">
          {(fields, { add, remove }) => (
            <Row gutter={[16, 16]}>
              {fields.map(({ key, name, ...restField }) => (
                <Col xs={24} md={6} key={key}>
                  <Space className="form-list-item" align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true, message: "Please input a feature" }]}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="Enter feature" />
                    </Form.Item>
                    <MinusCircleOutlined className="remove-icon" onClick={() => remove(name)} />
                  </Space>
                </Col>
              ))}
              <Col span={24}>
                <Form.Item>
                  <Button onClick={() => add()} icon={<PlusOutlined />}>
                    Add Feature
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form.List>

        <Divider orientation="center">Objectives Summary</Divider>
        <Form.List name="objectives_summary">
          {(fields, { add, remove }) => (
            <Row gutter={[16, 16]}>
              {fields.map(({ key, name, ...restField }) => (
                <Col xs={24} md={6} key={key}>
                  <Space className="form-list-item" align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true, message: "Please input an objective" }]}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="Enter objective" />
                    </Form.Item>
                    <MinusCircleOutlined className="remove-icon" onClick={() => remove(name)} />
                  </Space>
                </Col>
              ))}
              <Col span={24}>
                <Form.Item>
                  <Button onClick={() => add()} icon={<PlusOutlined />}>
                    Add Objective
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form.List>

        <Divider />
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loading}>
            {id ? "Update Course" : "Submit Course"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditCourseForm;
