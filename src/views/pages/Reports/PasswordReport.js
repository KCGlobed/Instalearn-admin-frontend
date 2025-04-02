import React, { useContext, useState } from "react";
import { Table, Button, Input } from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { PasswordData } from "../../../_dummyData/passwordReport";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleFilled, EyeOutlined, FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";


const PasswordReport = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(PasswordData);
    const { handleModalData } = useContext(ModalContext);

    const handleDelete = (userId) => {
        setFilteredData(filteredData.filter((user) => user.id !== userId));
    };

    const handleView = (selectedUser) => {
        handleModalData(<ViewUserReportModal selectedUser={selectedUser} />, "lg");
    };

    const handleSearch = () => {
        const filtered = PasswordData.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        let y = 10;
        doc.text("Password Report Data", 10, y);
        y += 10;
        filteredData.forEach((item) => {
            doc.text(`ID: ${item.id}, Username: ${item.username}, Email: ${item.email}`, 10, y);
            y += 10;
        });
        doc.save("password_report.pdf");
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Password Report");
        XLSX.writeFile(workbook, "password_report.xlsx");
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", width: 120 ,sorter: (a, b) => a.id - b.id },
        { title: "Username", dataIndex: "username", key: "username", width: 150 ,sorter: (a, b) => a.id - b.id },
        { title: "Email", dataIndex: "email", key: "email", width: 200 ,sorter: (a, b) => a.id - b.id },
        { title: "Password Created", dataIndex: "password_create_date", key: "password_create_date", width: 150,sorter: (a, b) => a.id - b.id  },
        { title: "Password Updated", dataIndex: "password_update_date", key: "password_update_date", width: 150 ,sorter: (a, b) => a.id - b.id },
        { title: "Password Expiry", dataIndex: "password_expiry_date", key: "password_expiry_date", width: 150 ,sorter: (a, b) => a.id - b.id },
        { title: "Password Strength", dataIndex: "password_strength", key: "password_strength", width: 150 },
        { title: "Last Password Change", dataIndex: "last_password_change", key: "last_password_change", width: 250 },
        { title: "IP Address", dataIndex: "ip_Address", key: "ip_Address", width: 150 },
        { title: "Device Info", dataIndex: "device_info", key: "device_info", width: 200 },
        { title: "Serial Number", dataIndex: "serial_Number", key: "serial_Number", width: 150 },
        { title: "Change Date", dataIndex: "change_date", key: "change_date", width: 150 },
        { title: "MFA Enabled", dataIndex: "mfa_enabled", key: "mfa_enabled", width: 120 },
        { title: "Login Attempts", dataIndex: "login_attempts", key: "login_attempts", width: 150 },
        { title: "Last Login", dataIndex: "last_login", key: "last_login", width: 150 },
        { title: "Failed Login Attempts", dataIndex: "failed_login_attempts", key: "failed_login_attempts", width: 200 },
        { title: "Password Policy", dataIndex: "password_policy", key: "password_policy", width: 200 },
        { title: "Recovery Options", dataIndex: "recovery_options", key: "recovery_options", width: 200 },
        { title: "Password Reset Required", dataIndex: "password_reset_required", key: "password_reset_required", width: 200 },
        { title: "Password Reuse Policy", dataIndex: "password_reuse_policy", key: "password_reuse_policy", width: 250 },
        { title: "Access Role", dataIndex: "access_role", key: "access_role", width: 150 },
        { title: "Account Status", dataIndex: "account_status", key: "account_status", width: 150 },
        {
            title: "Audit Log",
            dataIndex: "audit_log",
            key: "audit_log",
            width: 300,
            render: (logs) => logs?.map(log => `${log.action} by ${log.performedBy} at ${log.timestamp}`).join(", ") || "No Logs"
        },
        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
                  <Button
                        type="text"
                        icon={<EyeOutlined style={{ color: "white" }} />}
                        className="icon_btn aprove_icon"
                        onClick={() => handleView(item)}
                    />
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeteleUser(item)}
                        className="icon_btn delete_icon"
                    />
                </div>
            ),
            fixed: "right"

        },
    ];
    
    const handleDeteleUser =(item)=>{
        const userReportDelete = <DeleteUserReportModal  />
        handleModalData(userReportDelete, "md")
    }

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

export default PasswordReport;
