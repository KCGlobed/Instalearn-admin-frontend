import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Table, Button, Input, Drawer, Checkbox, Image } from "antd";
import { ModalContext } from "../../../Context";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';
import {
    handleActiveChapterApi,
    handleAssignVideolistApi
} from "../../../utils/services";
import AssignChapterModal from "../../modals/AssignChapterModal";
import ViewVideoModal from "../../modals/ViewVideoModal";
import DeleteAssignPrevVideoModal from "../../modals/DeleteAssignPrevVideoModal";
import AddPrevVideo from "../../modals/AddPrevVideo";

const AssignVideo = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        id: true,
        name: true,
        thumbnail: true,
        duration: true,
        actions: true,
    });

    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;
    const { id } = useParams();

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
            await handleVideoList(id);
            toast.success("Successfully updated!");
        } catch (error) {
            console.error("Error updating active status:", error);
        }
    }, []);

    const handleVideoList = async (id) => {
        try {
            const result = await handleAssignVideolistApi(id);
            setFilteredData(result.res.data);
        } catch (error) {
            console.error("Error fetching videos:", error);
            toast.error("Failed to fetch videos");
        }
    };

    useEffect(() => {
        if (id) {
            handleVideoList(id);
        }
    }, [id]);

    const allColumns = useMemo(() => [
        {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            key: "thumbnail",
            render: (text, record) => (
                <Image
                    alt="preview video"
                    width={80}
                    height={50}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                    src={record.thumbnail}
                />
            ),
            width: 120,
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
        },
        {
            title: "Title",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 200,
        },
        {
            title: "Duration (s)",
            dataIndex: "duration",
            key: "duration",
            width: 120,
        },
        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        className="icon_btn delete_icon"
                        onClick={() => handleViewVideo(item.videos)}
                    />
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        className="icon_btn delete_icon"
                        onClick={() => handleDelete(item)}
                    />
                </div>
            ),
            fixed: "right",
        },
    ], []);

    const columns = allColumns.filter(col => columnsConfig[col.key]);

    const handleViewVideo = (url) => {
        handleModalData(<ViewVideoModal url={url} />, "lg");
    };

    const handleDelete = (item) => {
        handleModalData(<DeleteAssignPrevVideoModal handleVideoList={handleVideoList} courseId={id} item={item} />, "sm");
    };
    const handleAddPrevVideo = (url) => {
        handleModalData(<AddPrevVideo  courseId={id} handleVideoList={handleVideoList}  />, "lg");
    };

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
                    <Button type="default" onClick={handleAddPrevVideo}>
                        Assign Preview Video
                    </Button>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={filteredData}
                className="fancy-table"
                scroll={{ x: 'max-content', y: 500 }}
                rowKey="id"
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

            <AssignChapterModal
                courseId={id}
                handleChapter={handleVideoList}
                visible={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
            />
        </div>
    );
};

export default AssignVideo;
