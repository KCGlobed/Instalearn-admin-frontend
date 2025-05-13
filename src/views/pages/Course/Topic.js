import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { Table, Button, Input, Drawer, Checkbox, Switch } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { ModalContext } from "../../../Context";
import { handleTopicApi, handleActiveChapterApi, handleActiveTopicApi } from "../../../utils/services";
import AddTopic from "../../modals/AddTopic";
import DeleteTopic from "../../modals/DeleteTopic";
import UpdateTopic from "../../modals/UpdateTopic";

const Topic = () => {
    const { handleModalData } = useContext(ModalContext);

    // States
    const [topics, setTopics] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        description: true,
        visible: true,
        active: true,
        actions: true,
    });

    // Fetch topics from API
    const fetchData = async () => {
        try {
            const response = await handleTopicApi();
            setTopics(response.res.results);
            setFilteredTopics(response.res.results);
        } catch (error) {
            console.error("Error fetching topics:", error);
        }
    };
    useEffect(() => {
      
        fetchData();
    }, []);

    // Search handler
    const handleSearch = useCallback(() => {
        const query = searchText.trim().toLowerCase();
        if (!query) {
            setFilteredTopics(topics);
            return;
        }
        const filtered = topics.filter(topic =>
            Object.values(topic).some(value =>
                String(value).toLowerCase().includes(query)
            )
        );
        setFilteredTopics(filtered);
    }, [searchText, topics]);

    // Toggle active status
    const toggleActiveStatus = useCallback(async (id, status) => {
        try {
            await handleActiveTopicApi({ status: status ? "1" : "0" }, id);
            toast.success("Status updated!");
            fetchData()
        } catch (error) {
            console.error("Error updating status:", error);
        }
    }, []);

    // Define all columns
    const allColumns = useMemo(() => [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Visible",
            key: "visible",
            render: item => item.visible === 1 ? "Yes" : "No",
        },
        {
            title: "Active",
            key: "active",
            render: item => (
                <Switch
                    checked={item.visible}
                    onChange={checked => toggleActiveStatus(item.id, checked)}
                />
            ),
        },
        {
            title: "Actions",
            key: "actions",
            fixed: "right",
            render: (item) => (
               <>
                <div className="action-buttons">
                   <Button
                    type="text"
                    className="icon_btn edit_icon"
                    icon={<EditOutlined style={{color:"#fff",fontSize: '16px' }} />}
                    onClick={() => handleModalData(<UpdateTopic data={item} fetchData={fetchData} />, "md")}
               
                  />
                  <Button
                    type="text"
                    className="icon_btn delete_icon"
                    icon={<DeleteOutlined />}
                    onClick={() => handleModalData(<DeleteTopic item={item} fetchData={fetchData}/>, "sm")}
                  />
                </div>
               </>
            ),
        },
    ], [toggleActiveStatus, handleModalData]);

    // Columns to display
    const displayedColumns = useMemo(
        () => allColumns.filter(col => visibleColumns[col.key]),
        [allColumns, visibleColumns]
    );

    // Placeholder function
    const handleCreate = () => {
        handleModalData(<AddTopic fetchData={fetchData}  />, "md")
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
                    <Button type="primary" className="ms-2" onClick={() => setIsDrawerOpen(true)}>
                        Select Columns
                    </Button>
                </div>
                <div>
                    <Button type="default" className="create_btn" style={{ marginRight: "5px" }} onClick={handleCreate}>
                        Create Topic
                    </Button>
                </div>
            </div>

            <Table
                columns={displayedColumns}
                dataSource={filteredTopics}
                rowKey="id"
                className="fancy-table"
                scroll={{ x: "max-content", y: 500 }}
            />

            <Drawer
                title="Select Table Columns"
                placement="right"
                width={300}
                onClose={() => setIsDrawerOpen(false)}
                open={isDrawerOpen}
            >
                <h3>Manage Columns</h3>
                <div className="manage_column">
                    {allColumns.map(col => (
                        <div key={col.key} style={{ marginBottom: 10 }}>
                            <Checkbox
                                checked={visibleColumns[col.key]}
                                onChange={(e) => {
                                    setVisibleColumns(prev => ({
                                        ...prev,
                                        [col.key]: e.target.checked,
                                    }));
                                }}
                            >
                                {col.title}
                            </Checkbox>
                        </div>
                    ))}
                </div>
                <Button type="primary" block onClick={() => setIsDrawerOpen(false)}>
                    Apply
                </Button>
            </Drawer>
        </div>
    );
};

export default Topic;
