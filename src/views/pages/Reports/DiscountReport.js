import React, { useContext, useState } from "react";
import { Table, Button, Input, Descriptions } from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { initialData } from "../../../_dummyData/userReport";
import { DiscountReportData } from "../../../_dummyData/discountReportData";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleFilled, EyeOutlined, FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";



const DiscountReport = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(DiscountReportData);
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
        { title: "ID", dataIndex: "id", key: "id", width: 150,sorter: (a, b) => a.id - b.id },
        { title: "Generated By", dataIndex: "DiscountGeneratedBy", key: "DiscountGeneratedBy", width: 200,sorter: (a, b) => a.DiscountGeneratedBy.localeCompare(b.DiscountGeneratedBy) },
        { title: "Course", dataIndex: "course", key: "course", width: 200 ,sorter: (a, b) => a.course.localeCompare(b.course)},
        { title: "Platform", dataIndex: "platform", key: "platform", width: 200,sorter: (a, b) => a.platform.localeCompare(b.platform) },
        { title: "Discount Amount", dataIndex: "DiscountAmount", key: "DiscountAmount", width: 150,sorter: (a, b) => a.DiscountAmount - b.DiscountAmount },
        { title: "Discount Type", dataIndex: "DiscountType", key: "DiscountType", width: 150,sorter: (a, b) => a.DiscountType.localeCompare(b.DiscountType) },
        { title: "Coupon ID", dataIndex: "DiscountCouponID", key: "DiscountCouponID", width: 200 ,sorter: (a, b) => a.DiscountCouponID - b.DiscountCouponID},
        { title: "Expiration Date", dataIndex: "DiscountCouponExpDate", key: "DiscountCouponExpDate", width: 150 },
        { title: "Discount Percentage", dataIndex: "DiscountPercentage", key: "DiscountPercentage", width: 250 ,sorter: (a, b) => a.DiscountPercentage - b.DiscountPercentage},
        { title: "Generated Date", dataIndex: "GeneratedDate", key: "GeneratedDate", width: 150 ,},
        { title: "Actual Price", dataIndex: "ActualPrice", key: "ActualPrice", width: 150 ,sorter: (a, b) => a.ActualPrice - b.ActualPrice},
        { title: "After Discount Price", dataIndex: "AfterDiscountPrice", key: "AfterDiscountPrice", width: 150 },
        { title: "Discount Code", dataIndex: "discountCode", key: "discountCode", width: 150,sorter: (a, b) => a.discountCode.localeCompare(b.discountCode)  },
        { title: "Number of Uses", dataIndex: "numberOfUses", key: "numberOfUses", width: 150 },
        { title: "Minimum Purchase", dataIndex: "minimumPurchase", key: "minimumPurchase", width: 150 },
        { title: "Eligibility", dataIndex: "eligibilityCriteria", key: "eligibilityCriteria", width: 200 },
        { title: "Usage Restrictions", dataIndex: "usageRestrictions", key: "usageRestrictions", width: 200 },
        { title: "Max Discount Limit", dataIndex: "maxDiscountLimit", key: "maxDiscountLimit", width: 150 },
        { title: "Description", dataIndex: "description", key: "description", width: 250 },
        { title: "Institution", dataIndex: "institutionName", key: "institutionName", width: 200 },
        { title: "Subscription Plan", dataIndex: "subscriptionPlan", key: "subscriptionPlan", width: 200 },
        { title: "User Type", dataIndex: "userType", key: "userType", width: 150 },
        { title: "Region", dataIndex: "region", key: "region", width: 150 },
        { title: "Payment Restrictions", dataIndex: "paymentRestrictions", key: "paymentRestrictions", width: 200 },
        { title: "Discount Validity", dataIndex: "discountValidity", key: "discountValidity", width: 250 },
        { title: "Redemption Limit", dataIndex: "redemptionLimit", key: "redemptionLimit", width: 200 },
        { title: "Course Category", dataIndex: "courseCategory", key: "courseCategory", width: 200 },
        { title: "Bundle Eligibility", dataIndex: "bundleDiscountEligibility", key: "bundleDiscountEligibility", width: 200 },
        {
            title: "Actions",
            key: "actions",
            fixed: "right",
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

export default DiscountReport;
