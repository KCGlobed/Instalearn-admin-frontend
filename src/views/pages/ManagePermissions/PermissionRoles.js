import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table, Button, Input, Drawer, Checkbox, Switch } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { handleRoleDetails, handleUpdateRolePermisionApi } from "../../../utils/services";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const PermissionRoles = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [permissionsData, setPermissionsData] = useState([]);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        id: false,
        permission_name: true,
        active: true,
    });

    const { id: roleId } = useParams();

    const handleTogglePermissionStatus = useCallback(async (record, checked) => {
        try {
            await handleUpdateRolePermisionApi({
                role_id: roleId,
                permission_status: checked,
                permission_name: record.permission_name,
            });
            fetchPermissions();
            toast.success("Successfully updated!");
        } catch (error) {
            console.error("Error updating permission status:", error);
        }
    }, [roleId]);

    const allColumns = useMemo(() => [
        { title: "Id", dataIndex: "id", key: "id" },
        { title: "Permission Name", dataIndex: "permission_name", key: "permission_name", width: 150 },
        {
            title: "Active",
            key: "active",
            render: (record) => (
                <Switch
                    checked={record.permission_status}
                    onChange={(checked) => handleTogglePermissionStatus(record, checked)}
                />
            ),
        },
    ], [handleTogglePermissionStatus]);

    const filteredColumns = allColumns.filter(col => visibleColumns[col.key]);

    const handleSearch = () => {
        const filtered = permissionsData.filter((item) =>
            Object.values(item).some((value) =>
                value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setPermissionsData(filtered);
    };

    const fetchPermissions = async () => {
        const result = await handleRoleDetails(roleId);
        setPermissionsData(result?.res?.data || []);
    };

    useEffect(() => {
        fetchPermissions();
    }, [roleId]);

    return (
        <div className="fancy-table-container">
            <div style={{ marginBottom: 16, display: "flex", gap: 8, justifyContent: "space-between" }}>
                <div className="table_search">
                    <Input
                        placeholder="Search in all fields"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onPressEnter={handleSearch}
                    />
                    <Button type="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
                <Button icon={<SettingOutlined />} onClick={() => setIsDrawerVisible(true)}>
                    Columns
                </Button>
            </div>

            <Table
                columns={filteredColumns}
                dataSource={permissionsData}
                rowKey="id"
                className="fancy-table"
                scroll={{ x: "max-content", y: 500 }}
            />

            <Drawer
                title="Select Table Columns"
                placement="right"
                width={300}
                onClose={() => setIsDrawerVisible(false)}
                open={isDrawerVisible}
            >
                {allColumns.map(col => (
                    <div key={col.key} style={{ marginBottom: 10 }}>
                        <Checkbox
                            checked={visibleColumns[col.key]}
                            onChange={(e) =>
                                setVisibleColumns(prev => ({ ...prev, [col.key]: e.target.checked }))
                            }
                        >
                            {col.title}
                        </Checkbox>
                    </div>
                ))}
                <Button type="primary" block onClick={() => setIsDrawerVisible(false)}>
                    Apply
                </Button>
            </Drawer>
        </div>
    );
};

export default PermissionRoles;
