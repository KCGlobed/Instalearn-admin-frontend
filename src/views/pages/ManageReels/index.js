import React, { useContext, useState } from "react";
import { Table, Button, Input, Descriptions, Drawer, Checkbox } from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { initialData } from "../../../_dummyData/userReport";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";



const ManageReels = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(initialData);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        name: false,
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

    const exportToPDF = () => {
        const doc = new jsPDF();
        let y = 10;
        doc.text("Fancy Table Data", 10, y);
        y += 10;
        filteredData.forEach((item) => {
            doc.text(`${item.name}, ${item.age}, ${item.address}`, 10, y);
            y += 10;
        });
        doc.save("table_data.pdf");
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "table_data.xlsx");
    };

    const allColumns = [
        { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name), width: 150 },
        { title: "Age", dataIndex: "age", key: "age", width: 100, sorter: (a, b) => a.age - b.age },
        { title: "Email", dataIndex: "email", key: "email", width: 150, sorter: (a, b) => a.email.localeCompare(b.email) },
        { title: "Phone Number", dataIndex: "ph_number", key: "ph_number", width: 150, sorter: (a, b) => a.ph_number - b.ph_number },
        { title: "Address", dataIndex: "address", key: "address", width: 150, sorter: (a, b) => a.address.localeCompare(b.address) },
        { title: "City", dataIndex: "city", key: "city", width: 150, sorter: (a, b) => a.city.localeCompare(b.city) },
        { title: "State", dataIndex: "state", key: "state", width: 150, sorter: (a, b) => a.state.localeCompare(b.state) },
        { title: "Country", dataIndex: "country", key: "country", width: 150, sorter: (a, b) => a.country.localeCompare(b.country) },
        { title: "Pincode", dataIndex: "pincode", key: "pincode", width: 150, sorter: (a, b) => a.pincode - b.pincode },
        { title: "Last Login", dataIndex: "last_Login", key: "last_Login", width: 150 },
        { title: "Active", dataIndex: "isActive", key: "isActive", width: 150, sorter: (a, b) => a.isActive.localeCompare(b.isActive) },
        { title: "Permission", dataIndex: "permission", key: "permission", width: 150, sorter: (a, b) => a.permission.localeCompare(b.permission) },
        { title: "Courses", dataIndex: "courses", width: 150, key: "courses", render: (courses) => courses.map(c => `${c.course_name} (${c.progress}%)`).join(", ") },
        { title: "Wishlist", dataIndex: "wishlist", width: 150, key: "wishlist", render: (wishlist) => wishlist.join(", ") },
        { title: "Goals", dataIndex: "mygoals", key: "mygoals", width: 150 },
        { title: "Reviews", dataIndex: "review", key: "review", render: (reviews) => reviews.length ? reviews.map(r => `${r.course_id}: ${r.rating}⭐`).join(", ") : "No Reviews" },
        ,
        { title: "Total Watch Time", dataIndex: "total_watch_time", key: "total_watch_time", width: 150, sorter: (a, b) => a.total_watch_time - b.total_watch_time },
        { title: "Certificates Earned", dataIndex: "certificates_earned", key: "certificates_earned", width: 150, sorter: (a, b) => a.certificates_earned - b.certificates_earned },
        { title: "Enrolled Date", dataIndex: "enrolled_date", key: "enrolled_date", width: 150 },
        { title: "Subscription Type", dataIndex: "subscription_type", key: "subscription_type", width: 150, sorter: (a, b) => a.subscription_type.localeCompare(b.subscription_type) },
        { title: "Last Course Activity", dataIndex: "last_course_activity", key: "last_course_activity", width: 150 },

        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
                    <Button type="primary" className="view-btn" onClick={() => handleView(item)}>
                        View
                    </Button>
                    <Button type="dashed" className="edit-btn">
                        Excel
                    </Button>
                    <Button type="dashed" className="edit-btn">
                        Pdf
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
                    <Button type="default" onClick={exportToPDF} style={{ marginRight: "5px" }}>
                        Download PDF
                    </Button>
                    <Button type="default" onClick={exportToExcel}>
                        Download Excel
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

export default ManageReels;
