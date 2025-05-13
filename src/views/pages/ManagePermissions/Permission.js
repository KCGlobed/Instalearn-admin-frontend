import React, { useEffect, useMemo, useState } from "react";
import { Table, Button, Input, Drawer, Checkbox } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { handleActiveInstructorApi, handleRoleListing } from "../../../utils/services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Permission = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        id: true,
        title: true,
        actions: true,
    });
    const navigate = useNavigate();

 

    const handleFetch = async () => {
        const result = await handleRoleListing();
        const data = result?.res?.data || [];
        setOriginalData(data);
        setFilteredData(data);
    };

    useEffect(() => {
        handleFetch();
    }, []);

    const handleSearch = () => {
        const filtered = originalData.filter((item) =>
            Object.values(item).some((value) =>
                value?.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const allColumns = useMemo(() => [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Actions",
            key: "actions",
            render: (record) => (
                <div className="action-buttons">
                    <Button
                        type="text"
                        icon={<EditOutlined style={{ color: "white" }} />}
                        onClick={() => {
                            navigate(`/manage-permission/${record.id}`);
                        }}
                        className="icon_btn edit_icon"
                    />
                </div>
            ),
            fixed: "right",
        },
    ], []);

    const columns = allColumns.filter(col => columnsConfig[col.key]);

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
                </div>
                <Button icon={<EditOutlined />} onClick={() => setDrawerVisible(true)}>
                    Columns
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={filteredData}
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
                {allColumns.map(col => (
                    <div key={col.key} style={{ marginBottom: 10 }}>
                        <Checkbox
                            checked={columnsConfig[col.key]}
                            onChange={(e) =>
                                setColumnsConfig(prev => ({ ...prev, [col.key]: e.target.checked }))
                            }
                        >
                            {col.title}
                        </Checkbox>
                    </div>
                ))}
                <Button type="primary" block onClick={() => setDrawerVisible(false)}>
                    Apply
                </Button>
            </Drawer>
        </div>
    );
};

export default Permission;
