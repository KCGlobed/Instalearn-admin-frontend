import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Input, Image, Tag, Switch, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { ModalContext } from "../../../Context";
import { handleCourseListApi } from "../../../utils/services";
import AddCourseModal from "../../modals/AddCourseModal";
import EditCourseModal from "../../modals/EditCourseModal";
import DeleteCourseModal from "../../modals/DeleteCourseModal";
import ViewCourseModal from "../../modals/ViewCourseModal";

const TAG_COLORS = ["green", "blue", "orange", "gold", "lime", "geekblue", "purple"];

const Course = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);

    const { handleModalData } = useContext(ModalContext);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        const result = await handleCourseListApi();
        setFilteredData(result?.res?.results || []);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = (course) => {
        const modal = <DeleteCourseModal data={course} handleCourseList={fetchCourses} />;
        handleModalData(modal, "sm");
    };

    const handleSearch = () => {
        if (!searchText) return fetchCourses();
        const filtered = filteredData.filter((item) =>
            Object.values(item).some((val) =>
                String(val).toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const renderActionButton = (label, color, onClick) => (
        <Button
           type="primary"
            onClick={onClick}
        >
            {label}
        </Button>
    );

    const handleView = (course) => {
        const modal = <ViewCourseModal course={course} />;
        handleModalData(modal, "lg");
    };

    const showDrawer = (course) => {
        setCurrentCourse(course);
        setDrawerVisible(true);
    };

    const closeDrawer = () => {
        setDrawerVisible(false);
        setCurrentCourse(null);
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (src) => (
                <Image
                    src={src}
                    alt="Course"
                    width={80}
                    height={50}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                />
            ),
        },
        { title: "Course Name", dataIndex: "name", key: "name", width: 100 },
        {
            title: "Course Price",
            key: "price",
            width: 150,
            render: (item) => <>₹ {item.price}</>,
        },
        {
            title: "Tags",
            key: "tags",
            width: 150,
            render: (item) => (
                <>
                    {item?.tags?.map((tag, index) => (
                        <Tag
                            color={TAG_COLORS[index % TAG_COLORS.length]}
                            key={index}
                            style={{ marginBottom: "4px" }}
                        >
                            {tag}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: "Active",
            key: "active",
            width: 150,
            render: () => (
                <div className="switch_item">
                    <Switch defaultChecked />
                </div>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            fixed: "right",
            render: (item) => (
                  <div className="action-buttons">
                    <Button type="primary" onClick={() => showDrawer(item)} icon={<PlusCircleOutlined />} />
                   <Button
                      type="text"
                      icon={<EyeOutlined style={{ color: "white" }} />}
                      onClick={() => {
                        handleView(item);
                      }}
                      className="icon_btn edit_icon"
                   />
                   <Button
                      type="text"
                      icon={<EditOutlined style={{ color: "white" }} />}
                      onClick={() => {
                        navigate(`/edit-course/${item.id}`);
                      
                    }}
                      className="icon_btn edit_icon"
                   />

                  <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        handleDelete(item);
                    
                    }}
                      className="icon_btn delete_icon"
                  />
              </div>
            ),
        },
    ];

    return (
        <div className="fancy-table-container">
            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "8px",
                    flexWrap: "wrap",
                }}
            >
                <div className="table_search" style={{ display: "flex", gap: 8 }}>
                    <Input
                        placeholder="Search in all fields"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onPressEnter={handleSearch}
                    />
                    <Button type="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
                <Button type="default" onClick={() => navigate("/create-course")}>
                    Create Course
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={filteredData}
                className="fancy-table"
                scroll={{ x: "max-content", y: 500 }}
                rowKey="id"
            />

            {/* Drawer for actions */}
            <Drawer
                title={currentCourse?.name || "Course Actions"}
                placement="right"
                onClose={closeDrawer}
                open={drawerVisible}
                width={350}
            >
                {currentCourse && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {renderActionButton("Assign Chapter", {
                            bg: "#f0f4ff",
                            text: "#1e40af",
                            border: "#d0dbff",
                        }, () => {
                            // navigate(`/assign-chapter/${currentCourse.id}`);
                            navigate(`/chapter-transfer`);
                            closeDrawer();
                        })}

                        {renderActionButton("Assign Preview Videos", {
                            bg: "#fff0f6",
                            text: "#c41d7f",
                            border: "#f5c2d5",
                        }, () => {
                            navigate(`/assign-preview-video/${currentCourse.id}`);
                            closeDrawer();
                        })}
                         {renderActionButton("Assign Instructor", {
                            bg: "#fff0f6",
                            text: "#c41d7f",
                            border: "#f5c2d5",
                        }, () => {
                            // navigate(`/assign-preview-video/${currentCourse.id}`);
                            closeDrawer();
                        })}
                        {renderActionButton("Assign Related Course", {
                            bg: "#fff0f6",
                            text: "#c41d7f",
                            border: "#f5c2d5",
                        }, () => {
                            navigate(`/assign-related-course/${currentCourse.id}`);
                            closeDrawer();
                        })}

                    
                    </div>
                )}
            </Drawer>

            {/* Modals */}
            <AddCourseModal
                visible={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
            />
            <EditCourseModal
                visible={isEditModalVisible}
                selectedCourse={selectedCourse}
                onCancel={() => setIsEditModalVisible(false)}
            />
        </div>
    );
};

export default Course;
