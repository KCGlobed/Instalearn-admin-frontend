import React, { useContext, useState } from "react";
import { Table, Button, Input, Drawer, Checkbox } from "antd";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";
import FreeTrialForm from "../../modals/AddFreeTrailModal";
import EditFreeTrialForm from "../../modals/EditFreeTrailModal";
export const initialData = [
    {
        key: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        ph_number: "1234567890",
        free_trial_course: "React for Beginners",
        enrolled_date: "2025-03-15"
    },
    {
        key: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        ph_number: "9876543210",
        free_trial_course: "Intro to Python",
        enrolled_date: "2025-03-12"
    },
    {
        key: "3",
        name: "Robert Brown",
        email: "robert.brown@example.com",
        ph_number: "4561237890",
        free_trial_course: "Web Development Bootcamp",
        enrolled_date: "2025-03-10"
    },
    {
        key: "4",
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
        ph_number: "7894561230",
        free_trial_course: "Machine Learning Basics",
        enrolled_date: "2025-03-18"
    }
];


const FreeTrail = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(initialData);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        name: true,
        email: true,
        ph_number: true,
        free_trial_course: true,
        enrolled_date: true,
        actions: true
    });

    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;

    const handleView = (selectedUser) => {
        const addCollateral = <ViewUserReportModal selectedUser={selectedUser} />;
        handleModalData(addCollateral, "lg");
    };
    const handleAdd = (selectedUser) => {
        const addCollateral = <FreeTrialForm selectedUser={selectedUser} />;
        handleModalData(addCollateral, "md");
    };

    const handleDeleteUser = (item) => {
        const userReportDelete = <DeleteUserReportModal />;
        handleModalData(userReportDelete, "sm");
    };

    const handleSearch = () => {
        const filtered = initialData.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const  handleEditFreeTrail=()=>{
        const edit = <EditFreeTrialForm  />;
        handleModalData(edit, "md");
    }

    

    const allColumns = [
        { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name), width: 150 },
        { title: "Email", dataIndex: "email", key: "email", width: 150, sorter: (a, b) => a.email.localeCompare(b.email) },
        { title: "Phone Number", dataIndex: "ph_number", key: "ph_number", width: 150, sorter: (a, b) => a.ph_number - b.ph_number },
        { title: "Free Trial Course", dataIndex: "free_trial_course", key: "free_trial_course", width: 200, render: (course) => course || "N/A" },
        { title: "Enrolled Date", dataIndex: "enrolled_date", key: "enrolled_date", width: 150 },
        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
                    <Button type="primary" className="view-btn" onClick={() => handleView(item)}>
                        View
                    </Button>
                    <Button type="dashed" className="edit-btn" onClick={() => handleEditFreeTrail()}>
                        Edit
                    </Button>
                    <Button type="dashed" className="edit-btn">
                        Aprove
                    </Button>
                    <Button type="dashed" className="edit-btn">
                        Rejected
                    </Button>
                    <Button type="danger" className="delete-btn" onClick={() => handleDeleteUser()}>
                        Delete
                    </Button>
                </div>
            ),
            fixed: "right"
        },
    ];

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
                    <Button type="primary" onClick={handleSearch}>Search</Button>
                    <Button type="primary" className="ms-2" onClick={() => setDrawerVisible(true)}>Select Columns</Button>
                </div>
                <Button type="default" onClick={handleAdd}>Create Free Trial </Button>
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
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
                <Button type="primary" block onClick={() => setDrawerVisible(false)}>Apply</Button>
            </Drawer>
        </div>
    );
};

export default FreeTrail;
