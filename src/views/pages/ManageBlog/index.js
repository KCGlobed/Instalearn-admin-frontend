import React, { useContext, useState } from "react";
import { Table, Button, Input, Descriptions, Drawer, Checkbox } from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { initialData } from "../../../_dummyData/userReport";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";
import CreateBlogModal from "../../modals/CreateBlogModal";
import EditBlogModal from "../../modals/EditBlogModal";




const ManageBlog = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(initialData);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        name: true,
        age: true,
        email: true,
        ph_number: true,
        address: true,
        city: true,
        state: true,
        country: true,
        pincode: true,
        last_Login: true,
        isActive: true,
        permission: true,
        courses: true,
        wishlist: true,
        mygoals: true,
        review: true,
        total_watch_time: true,
        certificates_earned: true,
        enrolled_date: true,
        subscription_type: true,
        last_course_activity: true,
        actions: true
    });

    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;


    const handleView = (selectedUser) => {
        console.log(selectedUser)
        const addCollateral = <ViewUserReportModal selectedUser={selectedUser} />
        handleModalData(addCollateral, "lg")
    }

    const handleDeteleUser = (item) => {
        const userReportDelete = <DeleteUserReportModal />
        handleModalData(userReportDelete, "md")
    }

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
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
        { title: "Title", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name), width: 150 },
        { title: "Content", dataIndex: "age", key: "age", width: 100, sorter: (a, b) => a.age - b.age },
        { title: "Created At", dataIndex: "email", key: "email", width: 150, sorter: (a, b) => a.email.localeCompare(b.email) },
        { title: "update date", dataIndex: "ph_number", key: "ph_number", width: 150, sorter: (a, b) => a.ph_number - b.ph_number },
        { title: "Active", dataIndex: "address", key: "address", width: 150, sorter: (a, b) => a.address.localeCompare(b.address) },
        { title: "Status", dataIndex: "city", key: "city", width: 150, sorter: (a, b) => a.city.localeCompare(b.city) },
        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
                    <Button type="primary" className="view-btn" onClick={() => handleView(item)}>
                        View
                    </Button>
                    <Button type="dashed" className="edit-btn" onClick={()=>handleEdit()}>
                        Edit
                    </Button>
                    <Button type="danger" className="delete-btn" onClick={() => handleDeteleUser(item)}>
                        Delete
                    </Button>
                </div>
            ),
            fixed: "right"

        },
    ];

    const columns = allColumns.filter(col => columnsConfig[col.key]);


    const handleCreate = (item) => {
        const userReportDelete = <CreateBlogModal />
        handleModalData(userReportDelete, "lg")
    }
    
    const handleEdit = (item) => {
        const userReportDelete = <EditBlogModal />
        handleModalData(userReportDelete, "lg")
    }


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
                    <Button type="default"  style={{ marginRight: "5px" }} onClick={()=>handleCreate()}>
                       Create Blog
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

export default ManageBlog;
