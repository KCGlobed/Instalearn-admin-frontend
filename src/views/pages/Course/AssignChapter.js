import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Table, Button, Input, Drawer, Checkbox, Switch } from "antd";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleFilled, EyeOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import {
    handleActiveChapterApi,
    handleAssigedChapterListApi
} from "../../../utils/services";
import AssignChapterModal from "../../modals/AssignChapterModal";
import DeleteAssignChapterModal from "../../modals/DeleteAssignChapterModal";

const AssignChapter = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        name: true,
        description: true,
        create_at: true,
        ph_number: true,
        visible: true,
        city: true,
        active: true,
        actions: true
    });

    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;
    const { id } = useParams();
    const navigation = useNavigate()


    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const handleSearch = () => {
        const filtered = filteredData.filter((item) =>
            Object.values(item).some((value) =>
                value?.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const handleToggleActive = useCallback(async (id, checked) => {
        try {
            await handleActiveChapterApi({ status: checked ? "1" : "0" }, id);
            await handleChapter(id);
            toast.success("Successfully updated!");
        } catch (error) {
            console.error("Error updating active status:", error);
        }
    }, []);

    const allColumns = useMemo(() => [
        {
            title: "Title",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 150
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            width: 200
        },
        {
            title: "Created At",
            dataIndex: "create_at",
            key: "create_at"
        },
        {
            title: "Update Date",
            dataIndex: "ph_number",
            key: "ph_number"
        },
        {
            title: "Active Status",
            key: "visible",
            render: (item) => `${item.visible === 1 ? "Yes" : "No"}`,
            width: 150
        },
        {
            title: "Status",
            dataIndex: "city",
            key: "city"
        },
        {
            title: "Active",
            key: "active",
            render: (item) => (
                <Switch
                    checked={item.visible}
                    onChange={(checked) => handleToggleActive(item.id, checked)}
                />
            )
        },
        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
                    <Button
                        type="default"
                        style={{
                            backgroundColor: "#e6fffb",
                            color: "#08979c",
                            borderColor: "#b5f5ec",
                            borderRadius: "10px",
                            fontWeight: 500,
                        }}
                        onClick={() => navigation(`/assign-topic/${item.key}`)}
                    >
                        Assign Topic
                    </Button>
                    <Button type="text" icon={<DeleteOutlined />} className="icon_btn delete_icon" onClick={() => handleDelete(item)} />
                </div>
            ),
            fixed: "right",
        },
    ], [handleToggleActive]);

    const columns = allColumns.filter(col => columnsConfig[col.key]);

    const handleCreate = () => {
        setIsAddModalVisible(true);
    };

    const handleChapter = async (id) => {
        try {
            const result = await handleAssigedChapterListApi(id);
            const transformedData = result.res.data.map((item, index) => ({
                key: item.id || index,
                ...item.chapter_info,
                visible: item.visible || false,
                create_at: item.create_at || "—",
                ph_number: item.ph_number || "—",
                city: item.city || "—"
            }));
            console.log(result.res.data)
            console.log(transformedData)
            setFilteredData(transformedData);
        } catch (error) {
            console.error("Error fetching chapters:", error);
            toast.error("Failed to fetch chapters");
        }
    };

    let handleDelete =(item)=>{
        // console.log(item)
        handleModalData(<DeleteAssignChapterModal chpaterById={id} id={item.key} handleChapter={handleChapter}  />,"sm")
    }

    useEffect(() => {
        if (id) {
            handleChapter(id);
        }
    }, [id]);

    return (
        <div className="fancy-table-container">
            <div style={{ marginBottom: 16, display: "flex", gap: "8px", justifyContent: "space-between" }}>
                <div className="table_search">
                    <Input
                        placeholder="Search in all fields"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onPressEnter={handleSearch}
                    />
                    <Button type="primary" onClick={handleSearch}>
                        Search
                    </Button>
                    <Button type="primary" className="ms-2" onClick={() => setDrawerVisible(true)}>
                        Select Columns
                    </Button>
                </div>
                <div>
                    <Button type="default" style={{ marginRight: "5px" }} onClick={handleCreate}>
                        Assign Chapter
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

            {/* <DragTable columns={columns} dataSource={filteredData} setDataSource={setFilteredData}   /> */}

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

            <AssignChapterModal courseId={id} handleChapter={handleChapter} visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} />
        </div>
    );
};

export default AssignChapter;
