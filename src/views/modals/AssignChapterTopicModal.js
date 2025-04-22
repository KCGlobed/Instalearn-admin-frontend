import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Button, message } from "antd";
import { handleAssignChapterApi, handleAssignchapterlistApi, handleAssignChapterTopicApi, handleAssignchapterTopiclistApi } from "../../utils/services";
import toast from "react-hot-toast";
import sound from "../../sound/success.mp3"

const { Option } = Select;

const AssignChapterTopicModal = ({ visible, onCancel, chapterCourseId, handleChapter }) => {
    const [form] = Form.useForm();
    const [courseOptions, setCourseOptions] = useState([]);

    const handleChapterAssignList = async () => {
        try {
            const response = await handleAssignchapterTopiclistApi();
            console.log(response)
            if (response?.res?.data) {
                setCourseOptions(response.res.data);
            }
        } catch (error) {
            console.error("Failed to fetch chapter list:", error);
        }
    };

    useEffect(() => {
        handleChapterAssignList();
    }, []);

    const onFinish = async(values) => {
        console.log("Form Values:", values);
        let res =await handleAssignChapterTopicApi(
            {
                "course_chapter_id":chapterCourseId,
                "topic_id":values.courses.join(",")
            }
        )
        console.log(res)
        if (handleChapter) {
            handleChapter(chapterCourseId);
        }
        toast.success("Chapter assigned successfully!");
        form.resetFields();
        onCancel(); // Close modal
    };

    return (
        <Modal
            title="Add Topic"
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={800}
            centered
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item
                        label="Select Topics"
                        name="courses"
                        style={{ flex: 1 }}
                        rules={[{ required: true, message: "Please select at least one course" }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Select Topic Name"
                            allowClear
                        >
                            {courseOptions.map((course) => (
                                <Option key={course.id} value={course.id}>
                                    {course.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AssignChapterTopicModal;
