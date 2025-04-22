import React, { useContext, useMemo, useState, useEffect } from "react";
import { Table, Button, Input, Drawer, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ModalContext } from "../../../Context";
import AddRelatedCourse from "../../modals/AddRelatedCourse";
import { useParams } from "react-router-dom";
import { handleCourseRelatedApi } from "../../../utils/services";
import DeleteRelatedCourse from "../../modals/DeleteRelatedCourse";
import { Helmet } from "react-helmet";

const AssignedRelatedCourses = () => {
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [columnVisibility, setColumnVisibility] = useState({
        courseId: true,
        courseTitle: true,
        courseImage: true,
        actions: true,
    });
    const { id } = useParams();
    const { handleModalData } = useContext(ModalContext);

    // Fetch or mock assigned related courses
    const handleGetRelatedCourses=async(id)=>{
        try {
            let response = await handleCourseRelatedApi(id)
            setRelatedCourses(response.res.data);
        } catch (error) {
            
        }
    }
    useEffect(() => {
        if(id){
            handleGetRelatedCourses(id)
        }
    }, [id]);

    // Table columns
    const allColumns = useMemo(() => [
        {
            title: "Course ID",
            dataIndex: "id",
            key: "courseId",
            width: 100,
        },
        {
            title: "Course Image",
            dataIndex: ["course_info", "image"],
            key: "courseImage",
            render: (imageUrl) => (
                <img
                    src={imageUrl}
                    alt="Course"
                    style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }}
                />
            ),
            width: 120,
        },
        {
            title: "Course Title",
            dataIndex: ["course_info", "name"],
            key: "courseTitle",
            sorter: (a, b) => a.course_info?.name?.localeCompare(b.course_info?.name),
            width: 300,
        },
      
        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    className="icon_btn delete_icon"
                    onClick={()=>handleDelete(item)}
                />
            ),
            fixed: "right",
            width: 100,
        },
    ], []);

    const handleDelete = (item)=>{
        handleModalData(<DeleteRelatedCourse coursId={id} id={item.id} handleGetRelatedCourses={handleGetRelatedCourses}  />,"sm")

    }


    const handleCreate = () => {
        setIsAddModalVisible(true);
    };

    const visibleColumns = allColumns.filter(col => columnVisibility[col.key]);

    return (
        <div className="fancy-table-container">
              <Helmet>
        <title>Home | My React App</title>
        <meta name="description" content="Welcome to my React homepage!" />
      </Helmet>
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ display: "flex", gap: 8 }}>
                    <Input placeholder="Search related courses" />
                    <Button type="primary">Search</Button>
                </div>
                <Button type="default" onClick={handleCreate}>
                    Assign Related Course
                </Button>
            </div>

            <Table
                columns={visibleColumns}
                dataSource={relatedCourses}
                rowKey="id"
                className="fancy-table"
                scroll={{ x: "max-content", y: 500 }}
            />

            <Drawer
                title="Select Table Columns"
                placement="right"
                width={300}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
            >
                <h3>Manage Columns</h3>
                <div>
                    {allColumns.map(col => (
                        <div key={col.key} style={{ marginBottom: 10 }}>
                            <Checkbox
                                checked={columnVisibility[col.key]}
                                onChange={e =>
                                    setColumnVisibility({
                                        ...columnVisibility,
                                        [col.key]: e.target.checked,
                                    })
                                }
                            >
                                {col.title}
                            </Checkbox>
                        </div>
                    ))}
                </div>
                <Button type="primary" block onClick={() => setDrawerVisible(false)}>
                    Apply
                </Button>
            </Drawer>
            <AddRelatedCourse handleGetRelatedCourses={handleGetRelatedCourses}  courseId={id}  visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)}/>
        </div>
    );
};

export default AssignedRelatedCourses;
