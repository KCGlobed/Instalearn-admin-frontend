import React, { useContext, useState } from "react";
import { Table, Button, Input, Descriptions, Tag } from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";

import { EyeOutlined, CheckCircleOutlined, ShareAltOutlined } from "@ant-design/icons";
import { badgeReport } from "../../../_dummyData/badgeData";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";


const BadgeReport = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(badgeReport);
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
        { title: "Badge ID", dataIndex: "id", key: "id", width: 100, sorter: (a, b) => a.id.localeCompare(b.id) },
        { title: "User Name", dataIndex: "user_name", key: "user_name", width: 150 ,sorter: (a, b) => a.user_name.localeCompare(b.user_name)},
        { title: "Email", dataIndex: "email", key: "email", width: 200,sorter: (a, b) => a.email.localeCompare(b.email) },
        { title: "Video Title", dataIndex: "video_title", key: "video_title", width: 200,sorter: (a, b) => a.video_title.localeCompare(b.video_title) },
        { title: "Course Name", dataIndex: "course_name", key: "course_name", width: 200 ,sorter: (a, b) => a.video_title.localeCompare(b.video_title)},
        { title: "Badge Name", dataIndex: "badge_name", key: "badge_name", width: 200 },
        {
            title: "Badge Type",
            dataIndex: "badge_type",
            key: "badge_type",
            width: 120,
            render: (type) => {
                const colorMap = {
                    "New": "green",
                    "Popular": "blue",
                    "Trending": "gold",
                    "Future Ready": "purple"
                };
                return <Tag color={colorMap[type] || "default"}>{type}</Tag>;
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 120,
            render: (status) => (
                <Tag color={status === "Awarded" ? "green" : "volcano"}>{status}</Tag>
            )
        },
        { title: "Criteria Met", dataIndex: "criteria_met", key: "criteria_met", width: 250 },
        { title: "Issue Date", dataIndex: "issue_date", key: "issue_date", width: 120 },
        { title: "Expiry Date", dataIndex: "expiry_date", key: "expiry_date", width: 120 },
        { title: "Score", dataIndex: "score", key: "score", width: 100 },
        { title: "Completion Time", dataIndex: "completion_time", key: "completion_time", width: 150 },
        { title: "Instructor", dataIndex: "instructor", key: "instructor", width: 150 },
        { title: "Platform", dataIndex: "platform", key: "platform", width: 120 },
        {
            title: "Shareable On",
            dataIndex: "shareable_on",
            key: "shareable_on",
            width: 200,
            render: (platforms) => platforms.map((p, i) => <Tag key={i}>{p}</Tag>)
        },
        { title: "Attempts", dataIndex: "attempts", key: "attempts", width: 100 },
        { title: "Course Progress", dataIndex: "course_progress", key: "course_progress", width: 150 },
        { title: "Badge Description", dataIndex: "badge_description", key: "badge_description", width: 300 },
        { title: "Endorsement", dataIndex: "endorsement", key: "endorsement", width: 200 },

        {
            title: "Actions",
            key: "actions",
            width: 200,
            fixed: "right",
            render: (record) => (
                <div className="action-buttons">
                    <Button type="primary" className="view-btn" onClick={() => handleView(record)}>
                        View
                    </Button>
                    <Button type="dashed" className="edit-btn">
                        Excel
                    </Button>
                    <Button type="dashed" className="edit-btn">
                        Pdf
                    </Button>
                    <Button type="danger" className="delete-btn" onClick={() => handleDeteleUser()} >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const handleDeteleUser =(item)=>{
        const userReportDelete = <DeleteUserReportModal  />
        handleModalData(userReportDelete, "md")
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
        </div>
    );
};

export default BadgeReport;
