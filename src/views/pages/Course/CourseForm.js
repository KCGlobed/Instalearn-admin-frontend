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
import { handleAddCourseApi, handleSubCatagoryApi } from "../../../utils/services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import DraftEditorFormItem from "../../../components/QuillEditorFormItem";

const { TextArea } = Input;
const { Title } = Typography;

const CourseForm = ({ onSave, initialData }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {

      onSave(values)
      toast.success("Course created successfully!");
    } catch (error) {
      console.error("Failed to submit course:", error);
      toast.error("Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await handleSubCatagoryApi();
      console.log(response.res.data);
      setCategoryList(response.res.data);
    };
    fetchCategories();
  }, []);



  return (
    <div className="course-form-wrapper mb-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: "",
          short_description: "",
          description: "",
          requirement: "",
          price: 0,
          discounted_price: 0,
          feature_json: [""],
          objectives_summary: [""],
          tags: [],
          category: [],
        }}
      >
        <Title level={3} className="form-title">Course Information</Title>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Course Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Enter course name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Categories" name="category" rules={[{ required: true, message: "Please select categories" }]}>
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
            <Form.Item label="Discounted Price" name="discounted_price" rules={[
              { required: true, message: "Discounted price is required" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const price = getFieldValue('price');
                  if (value === undefined || value === null || value < price) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Discounted price must be less than the original price")
                  );
                },
              }),
            ]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Tags" name="tags" rules={[{ required: true, message: "Please select at least one tag" }]}>
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
              <DraftEditorFormItem />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Description"
              name="description"
              rules={[{ required: true, message: "description is required" }]}
              getValueFromEvent={(content) => content}>
              <DraftEditorFormItem />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Requirement" name="requirement"
              rules={[{ required: true, message: "Requirement is required" }]}
              getValueFromEvent={(content) => content}
            >

              <DraftEditorFormItem />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Course Image" name="image" valuePropName="file" rules={[{ required: true, message: "Image is required" }]}>
              <Upload name="image" listType="picture" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Banner Image" name="banner_image" valuePropName="file" rules={[{ required: true, message: "Banner Image is required" }]}>
              <Upload name="banner" listType="picture" maxCount={1} beforeUpload={() => false}>
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
                  <Button className="add-feature-button" onClick={() => add()} icon={<PlusOutlined />}>
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
                  <Button className="add-objective-button" onClick={() => add()} icon={<PlusOutlined />}>
                    Add Objective
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form.List>

        <Divider />
        <Form.Item>
          <div className="form-action-buttons">

            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Next
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CourseForm;
