import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Table, Button, Input, Descriptions, Drawer, Checkbox, Switch } from "antd";
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleFilled, EyeOutlined } from "@ant-design/icons";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { initialData } from "../../../_dummyData/userReport";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";
import CreateBlogModal from "../../modals/CreateBlogModal";
import EditBlogModal from "../../modals/EditBlogModal";
import { handleActiveChapterApi, handleChapterListApi } from "../../../utils/services";
import AddChapterModal from "../../modals/AddChapterModal";
import EditChapterModal from "../../modals/EditChapterModal";
import DeleteChapter from "../../modals/DeleteChapter";
import toast from "react-hot-toast";




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
        actions: true,
        active: true
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


    // Handle Toggle Active Status
    const handleToggleActive = useCallback(async (id, checked) => {
        console.log(checked)
        try {
            await handleActiveChapterApi({ status: checked ? "1" : "0" }, id);
            handleChapter()
            toast.success("Successfully updated!");
        } catch (error) {
            console.error("Error updating active status:", error);
        }
    }, []);


    const allColumns = useMemo(() => [
        { title: "Title", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name), width: 150 },
        { title: "Description", dataIndex: "description", key: "description" ,width:200 },
        { title: "Created At", dataIndex: "create_at", key: "create_at" },
        { title: "Update Date", dataIndex: "ph_number", key: "ph_number" },
        { title: "Active Status", key: "visible",render:(item)=>`${item.visible ==1 ? "Yes" :"No"}`,width:150 },
        { title: "Status", dataIndex: "city", key: "city" },
        {
            title: "Active",
            key: "active",
            render: (staff) => (
                <Switch checked={staff.visible} onChange={(checked) => handleToggleActive(staff.id, checked)} />
            ),
        
        },
        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
                    <Button type="text" icon={<EyeOutlined style={{ color: "white" }} />} className="icon_btn aprove_icon" />
                    <Button type="text" icon={<EditOutlined style={{ color: "white" }} />} className="icon_btn edit_icon" onClick={() => handleEdit(item)} />
                    <Button type="text" icon={<DeleteOutlined />} className="icon_btn delete_icon" onClick={() => handleDelete(item)} />
                    <Button type="text" icon={<CheckCircleOutlined />} className="icon_btn aprove_icon" />
                    <Button type="text" icon={<CloseCircleFilled />} className="icon_btn reject_icon" />
                </div>
            ),
            fixed: "right",
        },
    ], [handleToggleActive]); 

    const columns = allColumns.filter(col => columnsConfig[col.key]);


    const handleCreate = (item) => {
        const AddChapter = <AddChapterModal handleChapter={handleChapter} />
        handleModalData(AddChapter, "lg")
    }

    const handleEdit = (chapterData) => {
        const userReportDelete = <EditChapterModal chapterData={chapterData} handleChapter={handleChapter} />
        handleModalData(userReportDelete, "lg")
    }

    const handleDelete = (item) => {
        const Delete = <DeleteChapter item={item} handleGetApi={handleChapter} />
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
