import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Button, Avatar } from "antd";
import toast from "react-hot-toast";
import successSoundFile from "../../sound/success.mp3";
import { handleAddCourseInstructorApi, handleInstructorListing } from "../../utils/services";

const { Option } = Select;

const AssignInstructorModal = ({
  visible,
  onCancel,
  courseId,
  fetchInstructors,
}) => {
  const [form] = Form.useForm();
  const [instructorOptions, setInstructorOptions] = useState([]);

  const fetchInstructorList = async () => {
    try {
      const response = await handleInstructorListing();
      const instructors = response?.res?.data || [];
      setInstructorOptions(instructors);
    } catch (error) {
      console.error("Failed to fetch instructors:", error);
      toast.error("Could not load instructor options.");
    }
  };

  useEffect(() => {
    fetchInstructorList();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        course_id: courseId,
        instructor_id: values.instructors.join(","),
      };

      const response = await handleAddCourseInstructorApi(payload);

      if (response) {
        fetchInstructors?.(courseId);
        new Audio(successSoundFile).play().catch(console.warn);
        toast.success("Instructors added successfully!");
        form.resetFields();
        onCancel();
      }
    } catch (error) {
      console.error("Failed to add instructors:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal
      title="Add Instructors"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Select Instructor(s)"
          name="instructors"
          rules={[
            { required: true, message: "Please select at least one instructor." },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Choose instructor(s)"
            allowClear
            showSearch
            optionFilterProp="label"
            optionLabelProp="label"
          >
            {instructorOptions.map((instructor) => (
              <Option
                key={instructor.id}
                value={instructor.id}
                label={instructor.text_1}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={instructor.image}
                    alt={instructor.text_1}
                    size={32}
                    style={{ marginRight: 10 }}
                  />
                  <div>
                    <div style={{ fontWeight: "bold" }}>{instructor.text_1}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      {instructor.text_2}
                      {instructor.experience && ` | ${instructor.experience} yrs`}
                    </div>
                  </div>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignInstructorModal;