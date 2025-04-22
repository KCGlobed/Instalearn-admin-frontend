import React, { useContext, useEffect, useState } from "react";
import {
    Table,
    Button,
    Input,
    Descriptions,
    Drawer,
    Checkbox,
    Spin,
} from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";
import {
    handleDownloadExcelUserApi,
    handleDownloadPdfUserApi,
    handleUserListApi,
} from "../../../utils/services";
import {
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
} from "@ant-design/icons";
import moment from "moment/moment";

const UserReport = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [loading, setLoading] = useState(false); // <-- loader state

    const [columnsConfig, setColumnsConfig] = useState({
        first_name: true,
        last_name: true,
        email: true,
        phone1: true,
        is_active: true,
        date_joined: true,
        email_verified: true,
        address: true,
        city: true,
        state: true,
        country: true,
        pincode: true,
        social_id: false,
        social_type: false,
        actions: true,
    });

    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;

    const handleView = (selectedUser) => {
        const modalContent = <ViewUserReportModal selectedUser={selectedUser} />;
        handleModalData(modalContent, "lg");
    };

    const handleDeleteUser = (item) => {
        const modalContent = <DeleteUserReportModal />;
        handleModalData(modalContent, "md");
    };

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const handleSearch = () => {
        const filtered = filteredData.filter((item) =>
            Object.values(item).some((value) =>
                value?.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const exportToPDF = async () => {
        let result = await handleDownloadPdfUserApi();
        const pdfUrl = result.res.data;
        window.open(pdfUrl, "_blank");
    };

    const exportToExcel = async () => {
        let result = await handleDownloadExcelUserApi();
        const csvUrl = result.res.data;
        const link = document.createElement("a");
        link.href = csvUrl;
        link.download = "user_report.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const allColumns = [
        {
            title: "First Name",
            dataIndex: "first_name",
            key: "first_name",
            sorter: (a, b) => a.first_name.localeCompare(b.first_name),
            width: 150,
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
            key: "last_name",
            sorter: (a, b) => a.last_name.localeCompare(b.last_name),
            width: 150,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
            width: 150,
        },
        { title: "Phone", dataIndex: "phone1", key: "phone1", width: 150 },
        {
            title: "Active",
            dataIndex: "is_active",
            key: "is_active",
            render: (isActive) => (isActive ? "Yes" : "No"),
            width: 150,
        },
        {
            title: "Date Joined",
            dataIndex: "date_joined",
            key: "date_joined",
            render: (utcTime) =>
                `${moment.utc(utcTime).local().format("YYYY-MM-DD")}`,
        },
        {
            title: "Email Verified",
            dataIndex: "email_verified",
            key: "email_verified",
            render: (emailVerified) => (emailVerified ? "Yes" : "No"),
            width: 150,
        },
        { title: "Address", dataIndex: "address", key: "address", width: 150 },
        { title: "City", dataIndex: "city", key: "city", width: 150 },
        { title: "State", dataIndex: "state", key: "state", width: 150 },
        { title: "Country", dataIndex: "country", key: "country", width: 150 },
        { title: "Pincode", dataIndex: "pincode", key: "pincode", width: 150 },
        { title: "Social ID", dataIndex: "social_id", key: "social_id", width: 150 },
        { title: "Social Type", dataIndex: "social_type", key: "social_type", width: 150 },
        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
                    <Button
                        type="text"
                        className="icon_btn aprove_icon"
                        icon={<EyeOutlined />}
                        onClick={() => handleView(item)}
                    />
                    <Button
                        type="text"
                        className="icon_btn delete_icon"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteUser(item)}
                    />
                </div>
            ),
        },
    ];

    const columns = allColumns.filter((col) => columnsConfig[col.key]);

    const handleUserList = async () => {
        setLoading(true); // Start loading
        try {
            let response = await handleUserListApi();
            setFilteredData(response?.res?.results || []);
        } catch (error) {
            console.error("Error fetching user list", error);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        handleUserList();
    }, []);

    return (
        <div
            className="fancy-table-container"
            style={{ animation: "fadeIn 1s ease-in-out" }}
        >
            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    gap: "8px",
                    justifyContent: "space-between",
                }}
            >
                <div className="table_search">
                    <Input
                        placeholder="Search in all fields"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onPressEnter={handleSearch}
                    />
                    <Button type="primary" onClick={handleSearch}>
                        Search
                    </Button>
                    <Button
                        type="primary"
                        className="ms-2"
                        onClick={() => setDrawerVisible(true)}
                    >
                        Select Columns
                    </Button>
                </div>
                <div>
                    <Button
                        type="text"
                        icon={<FilePdfOutlined style={{ color: "red" }} />}
                        className="pdf_btn"
                        onClick={exportToPDF}
                        style={{ marginRight: "5px" }}
                    >
                        EXPORT PDF
                    </Button>
                    <Button
                        type="text"
                        icon={<FileExcelOutlined style={{ color: "green" }} />}
                        className="excel_btn"
                        onClick={exportToExcel}
                    >
                        EXPORT EXCEL
                    </Button>
                </div>
            </div>

            <Spin spinning={loading} tip="Loading...">
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    onChange={handleChange}
                    className="fancy-table"
                    scroll={{ x: "max-content", y: 500 }}
                />
            </Spin>

            <Drawer
                title="Select Table Columns"
                placement="right"
                width={300}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
            >
                <h3>Manage Columns</h3>
                <div className="manage_column">
                    {allColumns.map((col) => (
                        <div key={col.key} style={{ marginBottom: 10 }}>
                            <Checkbox
                                checked={columnsConfig[col.key]}
                                onChange={(e) => {
                                    setColumnsConfig({
                                        ...columnsConfig,
                                        [col.key]: e.target.checked,
                                    });
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

export default UserReport;
