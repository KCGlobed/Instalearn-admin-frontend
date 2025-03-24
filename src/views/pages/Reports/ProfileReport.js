import React, { useContext, useState } from "react";
import { Table, Button, Input, Descriptions } from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { initialData } from "../../../_dummyData/userReport";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";

export const profileData = Array.from({ length: 20 }, (_, index) => ({
    user_id: `U-${1000 + index}`,
    user_name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 3 === 0 ? "Instructor" : "Student",
    enrolled_courses: [
        {
            course_id: `C-${2000 + index}`,
            course_name: [
                "Full-Stack Web Development",
                "Data Science with Python",
                "AI and Machine Learning",
                "Digital Marketing Strategies",
                "Cybersecurity for Beginners",
            ][index % 5],
            progress: `${Math.floor(Math.random() * 100)}%`,
            status: index % 2 === 0 ? "In Progress" : "Completed",
            last_access: `2024-03-${(index % 28) + 1}`,
            completion_date: index % 2 === 0 ? "N/A" : `2024-02-${(index % 28) + 1}`,
            certificate_earned: index % 2 === 0 ? "No" : "Yes",
            rating_given: index % 2 === 0 ? "N/A" : `${Math.floor(Math.random() * 5) + 1} ⭐`,
        }
    ],
    completed_courses: index % 2 === 0 ? [] : [
        {
            course_id: `C-${1500 + index}`,
            course_name: "Advanced React Development",
            completion_date: `2024-01-${(index % 28) + 1}`,
            certificate_url: `https://certificates.example.com/certificates/${1500 + index}`,
            instructor: "John Doe",
            review_given: index % 3 === 0 ? "Great Course!" : "Very informative!",
        }
    ],
    total_watch_time: `${Math.floor(Math.random() * 50) + 10} hours`,
    wishlist: [
        "Machine Learning for Beginners",
        "Blockchain Development",
        "Cybersecurity Essentials"
    ].slice(0, Math.floor(Math.random() * 3) + 1),
    last_login: `2024-03-${(index % 28) + 1} 10:${Math.floor(Math.random() * 60)} AM`,
    account_status: index % 4 === 0 ? "Inactive" : "Active",
    subscription: index % 3 === 0 ? "Premium" : "Free",
    badges_earned: [
        {
            badge_name: [
                "Python Expert",
                "React Pro",
                "AI Specialist",
                "Cybersecurity Analyst",
            ][index % 4],
            badge_type: ["New", "Trending", "Popular", "Future Ready"][index % 4],
            earned_date: `2024-02-${(index % 28) + 1}`,
            badge_url: `https://badges.example.com/${2000 + index}`
        }
    ].slice(0, index % 2 === 0 ? 0 : 1),
    purchased_courses: index % 3 === 0 ? [
        {
            course_id: `C-${3000 + index}`,
            course_name: "Mastering JavaScript",
            purchase_date: `2024-01-${(index % 28) + 1}`,
            price_paid: `$${(Math.random() * 100).toFixed(2)}`,
            currency: "USD",
        }
    ] : [],
    total_spent: index % 3 === 0 ? `$${(Math.random() * 300).toFixed(2)}` : "$0.00",
    learning_goals: [
        "Become a Data Scientist",
        "Build a Full-Stack Web App",
        "Get Certified in AI & ML"
    ].slice(0, Math.floor(Math.random() * 3) + 1),
    reviews_written: index % 2 === 0 ? [] : [
        {
            course_id: `C-${2500 + index}`,
            course_name: "Web Security Fundamentals",
            rating: `${Math.floor(Math.random() * 5) + 1} ⭐`,
            review_text: index % 3 === 0 ? "Loved the hands-on projects!" : "Good explanation, but could be better."
        }
    ]
}));






const ProfileReport = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(profileData);
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

    const profileColumns = [
        { title: "User ID", dataIndex: "user_id", key: "user_id", width: 120 },
        { title: "Name", dataIndex: "user_name", key: "user_name", width: 150, sorter: (a, b) => a.user_name.localeCompare(b.user_name) },
        { title: "Email", dataIndex: "email", key: "email", width: 200 },
        { title: "Role", dataIndex: "role", key: "role", width: 120, filters: [{ text: "Student", value: "Student" }, { text: "Instructor", value: "Instructor" }], onFilter: (value, record) => record.role === value },
        { title: "Enrolled Courses", dataIndex: "enrolled_courses", key: "enrolled_courses", width: 300, render: (courses) => courses.map(c => `${c.course_name} (${c.progress})`).join(", ") },
        { title: "Completed Courses", dataIndex: "completed_courses", key: "completed_courses", width: 250, render: (courses) => courses.length ? courses.map(c => `${c.course_name} (✅)`).join(", ") : "None" },
        { title: "Total Watch Time", dataIndex: "total_watch_time", key: "total_watch_time", width: 150 },
        { title: "Wishlist", dataIndex: "wishlist", key: "wishlist", width: 250, render: (wishlist) => wishlist.length ? wishlist.join(", ") : "No Wishlist" },
        { title: "Last Login", dataIndex: "last_login", key: "last_login", width: 180 },
        { title: "Account Status", dataIndex: "account_status", key: "account_status", width: 150, filters: [{ text: "Active", value: "Active" }, { text: "Inactive", value: "Inactive" }], onFilter: (value, record) => record.account_status === value },
        { title: "Subscription", dataIndex: "subscription", key: "subscription", width: 150, filters: [{ text: "Free", value: "Free" }, { text: "Premium", value: "Premium" }], onFilter: (value, record) => record.subscription === value },
        { title: "Total Spent", dataIndex: "total_spent", key: "total_spent", width: 120 },
        { title: "Badges Earned", dataIndex: "badges_earned", key: "badges_earned", width: 200, render: (badges) => badges.length ? badges.map(b => `${b.badge_name} (${b.badge_type})`).join(", ") : "No Badges" },
        { title: "Learning Goals", dataIndex: "learning_goals", key: "learning_goals", width: 250, render: (goals) => goals.length ? goals.join(", ") : "No Goals" },
        { title: "Reviews", dataIndex: "reviews_written", key: "reviews_written", width: 250, render: (reviews) => reviews.length ? reviews.map(r => `${r.course_name}: ${r.rating}`).join(", ") : "No Reviews" },
        {
            title: "Actions",
            key: "actions",
            fixed: "right",
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
                    <Button type="danger" className="delete-btn" onClick={() => handleDeteleUser()} >
                        Delete
                    </Button>
                </div>
            ),
            width: 180
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
                columns={profileColumns}
                dataSource={filteredData}
                onChange={handleChange}
                className="fancy-table"
                scroll={{ x: 'max-content', y: 500 }}
            />
        </div>
    );
};

export default ProfileReport;
