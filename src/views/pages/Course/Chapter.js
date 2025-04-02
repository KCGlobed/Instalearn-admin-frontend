import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Input, Descriptions, Drawer, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleFilled, EyeOutlined } from "@ant-design/icons";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { initialData } from "../../../_dummyData/userReport";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";
import CreateBlogModal from "../../modals/CreateBlogModal";
import EditBlogModal from "../../modals/EditBlogModal";
import { handleChapterListApi } from "../../../utils/services";
import AddChapterModal from "../../modals/AddChapterModal";
import EditChapterModal from "../../modals/EditChapterModal";
import DeleteChapter from "../../modals/DeleteChapter";




const Chapter = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        name: true,
        age: true,
        email: true,
        visible: true,
        description: true,
        actions: true
    });

    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;


    const handleView = (selectedUser) => {
        console.log(selectedUser)
        const addCollateral = <ViewUserReportModal selectedUser={selectedUser} />
        handleModalData(addCollateral, "lg")
    }



    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const handleSearch = () => {
        const filtered = initialData.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };


    const allColumns = [
        { title: "Title", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name), width: 150 },
        { title: "Description", dataIndex: "description", key: "description", },
        { title: "Created At", dataIndex: "create_at", key: "create_at",  },
        { title: "update date", dataIndex: "ph_number", key: "ph_number",  },
        { title: "Active", dataIndex: "visible", key: "visible",  render: (item) => `${item.visible === "1" ? "Yes" : "No"}` },
        { title: "Status", dataIndex: "city", key: "city" },
        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
                    <Button
                        type="text"
                        icon={<EyeOutlined style={{ color: "white" }} />}
                        className="icon_btn aprove_icon"
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined style={{ color: "white" }} />}
                        className="icon_btn edit_icon"
                        onClick={()=>handleEdit(item)}
                    />

                    <Button
                        type="text"
                        icon={<DeleteOutlined />}

                        className="icon_btn delete_icon"
                        onClick={()=>handleDelete(item)}
                    />
                    <Button
                        type="text"
                        icon={<CheckCircleOutlined />}
                        className="icon_btn aprove_icon"
                    />
                    <Button
                        type="text"
                        icon={<CloseCircleFilled />}
                        className="icon_btn reject_icon"
                    />

                </div>
            ),
            fixed: "right"

        },
    ];

    const columns = allColumns.filter(col => columnsConfig[col.key]);


    const handleCreate = (item) => {
        const AddChapter = <AddChapterModal handleChapter={handleChapter} />
        handleModalData(AddChapter, "lg")
    }

    const handleEdit = (chapterData) => {
        const userReportDelete = <EditChapterModal chapterData={chapterData} handleChapter={handleChapter}   />
        handleModalData(userReportDelete, "lg")
    }

    const handleDelete = (item) => {
        const Delete = <DeleteChapter item={item} handleGetApi={handleChapterListApi} />
        handleModalData(Delete, "md")
    }

    const handleChapter = async () => {
        let result = await handleChapterListApi();
        setFilteredData(result.res.results)
    }

    useEffect(() => {
        handleChapter()
    }, [])


    return (
        <div className="fancy-table-container">
            <div style={{ marginBottom: 16, display: "flex", gap: "8px", justifyContent: "space-between" }}>
                <div className="table_search" >
                    <Input
                        placeholder="Search in all fields"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onPressEnter={handleSearch}
                    />
                    <Button type="primary" onClick={handleSearch} >
                        Search
                    </Button>
                    <Button type="primary" className="ms-2" onClick={() => setDrawerVisible(true)} >
                        Select Columns
                    </Button>
                </div>
                <div>
                    <Button type="default" style={{ marginRight: "5px" }} onClick={() => handleCreate()}>
                        Create Chapter
                    </Button>
                </div>

            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                onChange={handleChange}
                className="fancy-table"
                scroll={{ x: 'max-content', y: 500 }}
            />

            <Drawer
                title="Select Table Columns"
                placement="right"
                width={300}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
            >
                <h3>Manage Columns</h3>
                <div className="manage_column">
                    {allColumns.map(col => (
                        <div key={col.key} style={{ marginBottom: 10 }}>
                            <Checkbox
                                checked={columnsConfig[col.key]}
                                onChange={(e) => {
                                    setColumnsConfig({ ...columnsConfig, [col.key]: e.target.checked });
                                }}
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
     
        </div>
    );
};

export default Chapter;
