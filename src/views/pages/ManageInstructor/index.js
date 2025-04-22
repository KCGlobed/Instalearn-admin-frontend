import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Table, Button, Input, Drawer, Checkbox, Switch } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { ModalContext } from "../../../Context";
import { handleActiveChapterApi, handleInstructorList } from "../../../utils/services";
import toast from "react-hot-toast";
import InstructorDetailsModal from "../../modals/InstructorDetailsModal";
import CreateInstructorModal from "../../modals/CreateInstructorModal";
import UpdateInstractorDetails from "../../modals/UpdateInstractorDetails";

const ManageInstructor = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        name: true,
        email: true,
        phone: true,
        active: true,
        actions: true,
    });

    const { handleModalData } = useContext(ModalContext);

    const handleToggleActive = useCallback(async (id, checked) => {
        try {
            await handleActiveChapterApi({ status: checked ? "1" : "0" }, id);
            handleFetchInstructors();
            toast.success("Successfully updated!");
        } catch (error) {
            console.error("Error updating active status:", error);
        }
    }, []);

    const allColumns = useMemo(() => [
        {
            title: "Name",
            dataIndex: "first_name",
            key: "name",
            render: (_, record) => `${record.first_name} ${record.last_name}`,
            sorter: (a, b) => a.first_name.localeCompare(b.first_name),
            width: 150,
        },
        { title: "Email", dataIndex: "email", key: "email", width: 150 },
        { title: "Phone", dataIndex: "phone1", key: "phone", width: 150 },
        {
            title: "Active",
            key: "active",
            render: (record) => (
                <Switch checked={record.is_active} onChange={(checked) => handleToggleActive(record.id, checked)} />
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (record) => (
                <div className="action-buttons">
                <Button
                    type="text"
                    icon={<EyeOutlined style={{ color: "white" }} />}
                    className="icon_btn aprove_icon"
                    onClick={() => handleView(record)}
                />
                <Button
                    type="text"
                    icon={<EditOutlined style={{ color: "white" }} />}
                    onClick={() => { handleUpdateInstructor(record) }}
                    className="icon_btn edit_icon"
                />

                <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(item.id)}
                    className="icon_btn delete_icon"
                />
               

            </div>
            ),
            fixed: "right",
        },
    ], [handleToggleActive]);

    const columns = allColumns.filter(col => columnsConfig[col.key]);

    const handleSearch = () => {
        const filtered = filteredData.filter((item) =>
            Object.values(item).some((value) =>
                value?.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

   const handleUpdateInstructor = (item) => {
        handleModalData(<UpdateInstractorDetails item={item} handleFetchInstructors={handleFetchInstructors} />, "md")    
    
  }
    const handleCreate = () => {
        setIsAddModalVisible(true);
        // handleModalData(<CreateInstructorModal />, "lg")
    }

    const handleView = (record) => {
        handleModalData(<InstructorDetailsModal record={record} />, "lg")
    }

    const handleFetchInstructors = async () => {
        const result = await handleInstructorList();
        setFilteredData(result?.res?.results || []);
    };

    useEffect(() => {
        handleFetchInstructors();
    }, []);

    return (
        <div className="fancy-table-container">
            <div style={{ marginBottom: 16, display: "flex", gap: "8px", justifyContent: "space-between" }}>
                <div className="table_search" >
                    <Input
                        placeholder="Search in all fields"
                    />
                    <Button type="primary" >
                        Search
                    </Button>
                </div>
                <div>
                    <Button type="default" className="create_badgebtn" onClick={handleCreate} >
                        Create Instructor
                    </Button>
                </div>

            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                onChange={(pagination, filters, sorter) => setSortedInfo(sorter)}
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
                <div>
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

            <CreateInstructorModal handleFetchInstructors={handleFetchInstructors} visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} />
        </div>
    );
};

export default ManageInstructor;
