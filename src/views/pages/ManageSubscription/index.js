import React, { useContext, useState } from "react";
import { Table, Button, Input, Descriptions, Switch } from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { initialData } from "../../../_dummyData/userReport";
import CreateBadge from "../../modals/CreateBadge";
import EditBadge from "../../modals/editBadge";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";
import OfflineSubscriptionModal from "../../modals/OfflineSubscriptionModal";
import EditOfflineSubscriptionModal from "../../modals/EditOflineSubscriptionModal";

const data =[
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "ph_number": "+1234567890",
      "billing_address": "123 Main St, Apt 4B",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "total_amount": 150.00,
      "gst_amount": 10.50,
      "discount": 15.00,
      "coupon_code": "DISCOUNT15",
      "payment_id": "PAY123456789",
      "purchase_date": "2025-03-25",
      "status": "Completed"
    },
    {
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "ph_number": "+9876543210",
      "billing_address": "456 Elm St, Suite 22",
      "city": "Los Angeles",
      "state": "CA",
      "country": "USA",
      "total_amount": 200.00,
      "gst_amount": 14.00,
      "discount": 20.00,
      "coupon_code": "SPRING20",
      "payment_id": "PAY987654321",
      "purchase_date": "2025-03-24",
      "status": "Pending"
    }
  ]
  



const ManageSubscription = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(data);
     const [isOffileSubcriptionModalVisible, setIsOffileSubcriptionModalVisible] = useState(false);
     const [isEditOffileSubcriptionModalVisible, setIsEditOffileSubcriptionModalVisible] = useState(false);
    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;

    const handleView = (selectedUser) => {
        console.log(selectedUser)
        const addCollateral = <ViewUserReportModal selectedUser={selectedUser} />
        handleModalData(addCollateral, "lg")

    }

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const handleSearch = () => {
        const filtered = data.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered.length > 0 ? filtered : []);
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
        { title: "Phone Number", dataIndex: "ph_number", key: "ph_number", width: 150 },
        { title: "Billing Address", dataIndex: "billing_address", key: "billing_address", width: 200 },
        { title: "City", dataIndex: "city", key: "city", width: 150 },
        { title: "State", dataIndex: "state", key: "state", width: 150 },
        { title: "Country", dataIndex: "country", key: "country", width: 150 },
        { title: "Total Amount", dataIndex: "total_amount", key: "total_amount", width: 150 },
        { title: "GST Amount", dataIndex: "gst_amount", key: "gst_amount", width: 150 },
        { title: "Discount", dataIndex: "discount", key: "discount", width: 150 },
        { title: "Coupon Code", dataIndex: "coupon_code", key: "coupon_code", width: 150 },
        { title: "Payment ID", dataIndex: "payment_id", key: "payment_id", width: 200 },
        { title: "Purchase Date", dataIndex: "purchase_date", key: "purchase_date", width: 150 },
        { title: "Status", dataIndex: "status", key: "status", width: 150 },
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
                    <Button type="danger" className="delete-btn" onClick={()=>handleDeteleUser()}>
                        Delete
                    </Button>
                </div>
            ),
            fixed: "right"
        },
    ];
    
    const handleDeteleUser =(item)=>{
        const userReportDelete = <DeleteUserReportModal  />
        handleModalData(userReportDelete, "sm")
    }
    const handleAdd = () => {
        setIsOffileSubcriptionModalVisible(true);
    };
    const handleEdit = () => {
        setIsEditOffileSubcriptionModalVisible(true);
    };

    return (
        <div className="fancy-table-container">
            <div style={{ marginBottom: 16, display: "flex", gap: "8px",justifyContent:"space-between"}}>
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
                 <Button type="default" onClick={exportToPDF} style={{marginRight:"5px"}}>
                    Download PDF
                 </Button>
                 <Button type="default" onClick={exportToExcel} style={{marginRight:"5px"}}>
                    Download Excel
                 </Button>
                 <Button type="default"  className="create_badgebtn" onClick={()=>handleAdd()}>
                    Create Offline Subscription
                 </Button>
               </div>
              
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                onChange={handleChange}
                className="fancy-table"
                scroll={{ x: 'max-content', y: 500 }}
                locale={{ emptyText: "No data found" }}
                tableLayout="fixed" 
            />
             <OfflineSubscriptionModal visible={isOffileSubcriptionModalVisible} onClose={() => setIsOffileSubcriptionModalVisible(false)} />
             <EditOfflineSubscriptionModal visible={isEditOffileSubcriptionModalVisible} onClose={() => setIsEditOffileSubcriptionModalVisible(false)} />
        </div>
    );
};

export default ManageSubscription;
