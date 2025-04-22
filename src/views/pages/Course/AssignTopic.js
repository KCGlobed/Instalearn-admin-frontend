import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Table, Button, Input, Drawer, Checkbox, Switch } from "antd";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleFilled, EyeOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';
import {
    handleActiveChapterApi,
    handleAssigedChapterListApi,
    handleAssignTopiclistApi
} from "../../../utils/services";
import AssignChapterModal from "../../modals/AssignChapterModal";
import AssignChapterTopicModal from "../../modals/AssignChapterTopicModal";
import DeleteAssgnTopicModal from "../../modals/DeleteAssgnTopicModal";

const AssignTopic = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        name: true,
        id: true,
        create_at: true,
        ph_number: true,
        visible: true,
        city: true,
        active: true,
        actions:true
    });

    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;
    const { id } = useParams();


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
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 150
        },
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
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 150
        },
      
        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
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

    const handleDelete = (item) => {
        const modal = <DeleteAssgnTopicModal handleTopic={handleTopic} id={item.key} topicId={id}  />
        handleModalData(modal, "sm");
    };
 

    const handleTopic = async (id) => {
        try {
            const result = await handleAssignTopiclistApi(id);
        
            const transformedData = result.res.data.map((item, index) => ({
                key: item.id || index,
                id: item.id,
                ...item.topic_info,
            }));
            console.log(transformedData)
            setFilteredData(transformedData);
        } catch (error) {
            console.error("Error fetching chapters:", error);
            toast.error("Failed to fetch chapters");
        }
    };

    useEffect(() => {
        if (id) {
            handleTopic(id);
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
                        Assign Topic
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

            <AssignChapterTopicModal chapterCourseId={id} handleChapter={handleTopic}  visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)}  />
        </div>
    );
};

export default AssignTopic;
