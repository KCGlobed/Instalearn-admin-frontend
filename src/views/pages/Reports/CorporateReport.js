import React, { useContext, useState } from "react";
import { Table, Button, Input, Descriptions } from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { corporateUserData } from "../../../_dummyData/corpReport";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";





const CorporateReport = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(corporateUserData);
    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;


    const handleDeteleUser =(item)=>{
        const userReportDelete = <DeleteUserReportModal  />
        handleModalData(userReportDelete, "md")
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
        { title: "Email", dataIndex: "email", key: "email", width: 150 },
        { title: "Phone", dataIndex: "phone", key: "phone", width: 150 },
        { title: "Company", dataIndex: "company_name", key: "company_name", width: 150 },
        { title: "Department", dataIndex: "department", key: "department", width: 150 },
        { title: "Designation", dataIndex: "designation", key: "designation", width: 150 },
        { title: "Experience (Years)", dataIndex: "years_of_experience", key: "years_of_experience", width: 150 },
        { title: "Team", dataIndex: "team", key: "team", width: 150 },
        { title: "Employment Type", dataIndex: "employment_type", key: "employment_type", width: 150 },
        { title: "Learning Preference", dataIndex: "learning_preference", key: "learning_preference", width: 150 },
        { title: "Last Login", dataIndex: "last_login", key: "last_login", width: 150 },

        { title: "Subscription Type", dataIndex: ["subscription", "type"], key: "subscription.type", width: 150 },
        { title: "Subscription Status", dataIndex: ["subscription", "status"], key: "subscription.status", width: 150 },
        { title: "Start Date", dataIndex: ["subscription", "start_date"], key: "subscription.start_date", width: 150 },
        { title: "End Date", dataIndex: ["subscription", "end_date"], key: "subscription.end_date", width: 150 },
        {
            title: "Courses Enrolled",
            dataIndex: "courses_enrolled",
            key: "courses_enrolled",
            render: (courses) => courses.map(c => `${c.course_name} (${c.progress}%)`).join(", ")
            , width: 150
        },
        { title: "Total Watch Time", dataIndex: "total_watch_time", key: "total_watch_time", width: 150 },
        { title: "Learning Streak (Days)", dataIndex: "learning_streak_days", key: "learning_streak_days", width: 200 },

        {
            title: "Discussion Forum",
            key: "discussion_forum_activity",
            render: (record) => `Q: ${record.discussion_forum_activity.questions_asked}, A: ${record.discussion_forum_activity.answers_given}, Upvotes: ${record.discussion_forum_activity.upvotes_received}`
            , width: 150
        },

        {
            title: "Mentorship",
            key: "mentorship_engagement",
            render: (record) =>
                `Mentor: ${record.mentorship_engagement.mentor_assigned}, Sessions: ${record.mentorship_engagement.sessions_attended}, Score: ${record.mentorship_engagement.feedback_score}`
            , width: 150
        },

        {
            title: "Certifications",
            dataIndex: "certifications_earned",
            key: "certifications_earned",
            render: (certs) => certs.length ? certs.map(c => c.name).join(", ") : "None"
            , width: 150
        },

        { title: "Admin Feedback", dataIndex: "admin_feedback", key: "admin_feedback", width: 150 },

        {
            title: "Budget Utilization",
            key: "company_learning_budget_utilization",

            render: (record) =>
                `Allocated: ${record.company_learning_budget_utilization.allocated_budget}, Spent: ${record.company_learning_budget_utilization.spent}, Remaining: ${record.company_learning_budget_utilization.remaining}`

            , width: 150
        },

        {
            title: "Wishlist",
            dataIndex: "wishlist",
            key: "wishlist",
            render: (wishlist) => wishlist.join(", "), width: 150
        },

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
                    <Button type="danger" className="delete-btn" onClick={()=>handleDeteleUser(item)} >
                        Delete
                    </Button>
                </div>
            ),
            fixed: "right"

        },
    ];




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

export default CorporateReport;
