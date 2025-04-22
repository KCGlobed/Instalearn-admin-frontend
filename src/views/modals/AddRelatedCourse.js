import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Button } from "antd";
import toast from "react-hot-toast";
import successSoundFile from "../../sound/success.mp3";
import {
  handleAddRelatedCourseApi,
  handleCourseSuggestlistApi,
} from "../../utils/services";

const { Option } = Select;

const AddRelatedCourse = ({ visible, onCancel, courseId, handleGetRelatedCourses }) => {
  const [form] = Form.useForm();
  const [courseOptions, setCourseOptions] = useState([]);

  const fetchCourseSuggestions = async () => {
    try {
      const response = await handleCourseSuggestlistApi();
      const courses = response?.res?.data || [];
      setCourseOptions(courses);
    } catch (error) {
      console.error("Failed to fetch course suggestions:", error);
      toast.error("Could not load course options.");
    }
  };

  useEffect(() => {
    fetchCourseSuggestions();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        course_id: courseId,
        related_course_id: values.courses.join(","),
      };

      const response = await handleAddRelatedCourseApi(payload);

      if (response) {
        handleGetRelatedCourses?.(courseId);
        const audio = new Audio(successSoundFile);
        audio.play().catch(err => console.warn("Sound play error:", err));
        toast.success("Related courses added successfully!");
        form.resetFields();
        onCancel();
      }
    } catch (error) {
      console.error("Failed to add related courses:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal
      title="Add Related Course"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Select Course Name"
          name="courses"
          rules={[{ required: true, message: "Please select at least one course." }]}
        >
          <Select
            mode="multiple"
            placeholder="Choose course(s) to relate"
            allowClear
            showSearch
            optionFilterProp="children"
          >
            {courseOptions.map(course => (
              <Option key={course.id} value={course.id}>
                {course.name}
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

export default AddRelatedCourse;
