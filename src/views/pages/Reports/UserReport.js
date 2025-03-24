import React, { useContext, useState } from "react";
import { Table, Button, Input, Descriptions } from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { initialData } from "../../../_dummyData/userReport";



const UserReport = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(initialData);
    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;


    const handleDelete = (data) => {
        const addCollateral = "Hello"
        handleModalData(addCollateral, "md")

    }
    const handleView = (selectedUser) => {
        console.log(selectedUser)
        const addCollateral = <ViewUserReportModal selectedUser={selectedUser} />
        handleModalData(addCollateral, "lg")

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

    const columns = [
        { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name), width: 150 },
        { title: "Age", dataIndex: "age", key: "age", width: 100, sorter: (a, b) => a.age - b.age },
        { title: "Email", dataIndex: "email", key: "email", width: 150 },
        { title: "Phone Number", dataIndex: "ph_number", key: "ph_number", width: 150 },
        { title: "Address", dataIndex: "address", key: "address", width: 150 },
        { title: "City", dataIndex: "city", key: "city", width: 150 },
        { title: "State", dataIndex: "state", key: "state", width: 150 },
        { title: "Country", dataIndex: "country", key: "country", width: 150 },
        { title: "Pincode", dataIndex: "pincode", key: "pincode", width: 150 },
        { title: "Last Login", dataIndex: "last_Login", key: "last_Login", width: 150 },
        { title: "Active", dataIndex: "isActive", key: "isActive", width: 150 },
        { title: "Permission", dataIndex: "permission", key: "permission", width: 150 },
        { title: "Courses", dataIndex: "courses", width: 150, key: "courses", render: (courses) => courses.map(c => `${c.course_name} (${c.progress}%)`).join(", ") },
        { title: "Wishlist", dataIndex: "wishlist", width: 150, key: "wishlist", render: (wishlist) => wishlist.join(", ") },
        { title: "Goals", dataIndex: "mygoals", key: "mygoals", width: 150 },
        { title: "Reviews", dataIndex: "review", key: "review", render: (reviews) => reviews.length ? reviews.map(r => `${r.course_id}: ${r.rating}⭐`).join(", ") : "No Reviews" },
        ,
        { title: "Total Watch Time", dataIndex: "total_watch_time", key: "total_watch_time", width: 150 },
        { title: "Certificates Earned", dataIndex: "certificates_earned", key: "certificates_earned", width: 150 },
        { title: "Enrolled Date", dataIndex: "enrolled_date", key: "enrolled_date", width: 150 },
        { title: "Subscription Type", dataIndex: "subscription_type", key: "subscription_type", width: 150 },
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
                    <Button type="danger" className="delete-btn">
                        Delete
                    </Button>
                </div>
            ),
            fixed: "right"

        },
    ];


    return (
        <div className="fancy-table-container">
            <div style={{ marginBottom: 16, display: "flex", gap: "8px" }}>
                <Input
                    placeholder="Search in all fields"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onPressEnter={handleSearch}
                />
                <Button type="primary" onClick={handleSearch}>
                    Search
                </Button>
                <Button type="default" onClick={exportToPDF}>
                    Download PDF
                </Button>
                <Button type="default" onClick={exportToExcel}>
                    Download Excel
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                onChange={handleChange}
                className="fancy-table"
                scroll={{ x: 'max-content', y: 500 }}
            />
        </div>
    );
};

export default UserReport;
