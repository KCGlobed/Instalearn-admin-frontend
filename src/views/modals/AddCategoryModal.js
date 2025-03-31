
// import React, { useState } from "react";
// import { Modal, Form, Input, Button } from "antd";
// import axios from "axios";
// import { toast } from "react-toastify";

// const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// const AddCategoryModal = ({ visible, onCancel, refreshCategories }) => {
//     const [form] = Form.useForm();
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (values) => {
//         const token = localStorage.getItem('access_token');
//         setLoading(true);
//         try {
//             await axios.post(`${API_BASE_URL}/content/create-category/`, values, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json"
//                 }
//             });
//             toast.success("Category added successfully!");
//             form.resetFields();
//             onCancel();
//             refreshCategories();
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Modal 
//             title="Add Category" 
//             open={visible} 
//             onCancel={onCancel} 
//             footer={null} 
//             width={800} 
//             centered
//         >
//             <Form form={form} layout="vertical" onFinish={handleSubmit}>
//                 <div style={{ display: "flex", gap: "16px" }}>
//                     <Form.Item 
//                         label="Title" 
//                         name="name" 
//                         style={{ flex: 1 }}
//                         rules={[{ required: true, message: "Please enter a title" }]}
//                     >
//                         <Input placeholder="Enter Title" />
//                     </Form.Item>
//                 </div>
//                 <div style={{ display: "flex", gap: "16px" }}>
//                     <Form.Item 
//                         label="Description" 
//                         name="description" 
//                         style={{ flex: 1 }}
//                         rules={[{ required: true, message: "Please enter a description" }]}
//                     >
//                         <Input.TextArea placeholder="Enter course description" rows={3} />
//                     </Form.Item>
//                 </div>
//                 <Button type="primary" htmlType="submit" loading={loading}>
//                     Submit
//                 </Button>
//             </Form>
//         </Modal>
//     );
// };

// export default AddCategoryModal;




import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const AddCategoryModal = ({ visible, onCancel, refreshCategories }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        const token = localStorage.getItem("access_token");
        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/content/create-category/`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            toast.success("Category added successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            form.resetFields();
            onCancel();
            refreshCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Modal
                title="Add Category"
                open={visible}
                onCancel={onCancel}
                footer={null}
                width={800}
                centered
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Form.Item
                            label="Title"
                            name="name"
                            style={{ flex: 1 }}
                            rules={[{ required: true, message: "Please enter a title" }]}
                        >
                            <Input placeholder="Enter Title" />
                        </Form.Item>
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Form.Item
                            label="Description"
                            name="description"
                            style={{ flex: 1 }}
                            rules={[{ required: true, message: "Please enter a description" }]}
                        >
                            <Input.TextArea placeholder="Enter course description" rows={3} />
                        </Form.Item>
                    </div>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

export default AddCategoryModal;
