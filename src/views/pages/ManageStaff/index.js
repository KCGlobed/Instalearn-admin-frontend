import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Table, Button, Input, Switch } from "antd";
import { ModalContext } from "../../../Context";
import AddStaffModal from "../../modals/AddStaffModal";
import EditStaffModal from "../../modals/EditStaffModal";
import { getListOfStaff, handleActiveStaffApi } from "../../../utils/services";
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleFilled, EyeOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import ViewStaffModal from "../../modals/ViewStaffModal";
import { useNavigate } from "react-router-dom";

const ManageStaff = () => {
    const [searchText, setSearchText] = useState("");
    const [staffData, setStaffData] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;
    const navigate = useNavigate();

    // Fetch Staff List (Runs Only Once)
    const fetchStaffList = async () => {
        try {
            const result = await getListOfStaff();
            setStaffData(result.res);
        } catch (error) {
            console.error("Error fetching staff list:", error);
        }
    };
    useEffect(() => {

        fetchStaffList();
    }, []);

    // Handle Toggle Active Status
    const handleToggleActive = useCallback(async (id, checked) => {
        try {
            await handleActiveStaffApi({ status: checked ? "1" : "0" }, id);
            setStaffData((prev) =>
                prev.map((staff) =>
                    staff.id === id ? { ...staff, is_active: checked } : staff
                )
            );
            toast.success("Successfully updated!");
        } catch (error) {
            console.error("Error updating active status:", error);
        }
    }, []);

    // Memoized Filtered Data (Avoids Re-renders)
    const filteredData = useMemo(() => {
        return staffData.filter((staff) =>
            Object.values(staff).some((value) =>
                value?.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [staffData, searchText]);

    // Table Columns
    const columns = useMemo(() => [
        { title: "ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id, width: 150 },
        { title: "First Name", dataIndex: "first_name", key: "first_name", sorter: (a, b) => a.first_name.localeCompare(b.first_name), width: 150 },
        { title: "Last Name", dataIndex: "last_name", key: "last_name", sorter: (a, b) => a.last_name.localeCompare(b.last_name), width: 150 },
        { title: "Email", dataIndex: "email", key: "email", width: 150 },
        { title: "Phone No", dataIndex: "phone1", key: "phone1", width: 150 },
        { title: "Active Status", key: "is_active", render: (staff) => (staff.is_active ? "Yes" : "No"), width: 150 },
        {
            title: "Active",
            key: "active",
            render: (staff) => (
                <Switch checked={staff.is_active} onChange={(checked) => handleToggleActive(staff.id, checked)} />
            ),
            width: 150
        },
        {
            title: "Permision",
            key: "active",
            render: (staff) => (
                <Button className="" onClick={() => handlePermison(staff.id)}> Give Permision</Button>
            ),
            width: 150
        },
        {
            title: "Actions",
            key: "actions",
            render: (staff) => (
                <div className="action-buttons">
                    <Button
                        type="text"
                        icon={<EyeOutlined style={{ color: "white" }} />}
                        className="icon_btn aprove_icon"
                        onClick={() => handleView(staff.id)}
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined style={{ color: "white" }} />}
                        onClick={() => { setSelectedStaff(staff); setIsEditModalVisible(true); }}
                        className="icon_btn edit_icon"
                    />

                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(item.id)}
                        className="icon_btn delete_icon"
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
        },
    ], [handleToggleActive]);


    const handleView = (id) => {
        const addCollateral = <ViewStaffModal id={id} />
        handleModalData(addCollateral, "lg")
    }
    const handlePermison = (id) => {
        navigate(`/staff/manage-permission/${id}`);
    }

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
                    <Button type="default" className="create_badgebtn" onClick={() => setIsAddModalVisible(true)}>
                        Create Staff
                    </Button>
                </div>

            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                className="fancy-table"
                scroll={{ x: "max-content", y: 500 }}
            />
            <AddStaffModal visible={isAddModalVisible} fetchStaffList={fetchStaffList} onCancel={() => setIsAddModalVisible(false)} />
            <EditStaffModal visible={isEditModalVisible} selectedStaff={selectedStaff} fetchStaffList={fetchStaffList} onCancel={() => setIsEditModalVisible(false)} />
        </div>
    );
};

export default ManageStaff;
