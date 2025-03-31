import React, { useContext, useState } from "react";
import { Table, Button, Input, Drawer, Checkbox } from "antd";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";

export const initialData = [
    {
        key: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        ph_number: "1234567890",
        subscribed_course: "Advanced React",
        subscription_date: "2025-03-15"
    },
    {
        key: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        ph_number: "9876543210",
        subscribed_course: "Python for Data Science",
        subscription_date: "2025-03-12"
    }
];

const SubscribedUsers = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(initialData);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        name: true,
        email: true,
        ph_number: true,
        subscribed_course: true,
        subscription_date: true,
        actions: true
    });

    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;

    const handleView = (selectedUser) => {
        handleModalData(<ViewUserReportModal selectedUser={selectedUser} />, "lg");
    };

    const handleDeleteUser = () => {
        handleModalData(<DeleteUserReportModal />, "sm");
    };

    const handleSearch = () => {
        const filtered = initialData.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const allColumns = [
        { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
        { title: "Email", dataIndex: "email", key: "email", sorter: (a, b) => a.email.localeCompare(b.email) },
        { title: "Phone Number", dataIndex: "ph_number", key: "ph_number" },
        { title: "Subscribed Course", dataIndex: "subscribed_course", key: "subscribed_course" },
        { title: "Subscription Date", dataIndex: "subscription_date", key: "subscription_date" },
        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
                    <Button type="primary" className="view-btn" onClick={() => handleView(item)}>
                        View
                    </Button>
                  
                    <Button type="danger" className="delete-btn" onClick={() => handleDeteleUser()}>
                        Delete
                    </Button>
                </div>
            ),
            fixed: "right"
        }
    ];

    const columns = allColumns.filter(col => columnsConfig[col.key]);
    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

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

export default SubscribedUsers;
