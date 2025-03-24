import React, { useContext, useState } from "react";
import { Table, Button, Input, Descriptions, Switch } from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";

import { initialData } from "../../../_dummyData/userReport";
 import AddCourseModal from "../../modals/AddCourseModal";
 import EditCourseModal from "../../modals/EditCourseModal";



const Category = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(initialData);
    const modalContext = useContext(ModalContext);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const { handleModalData } = modalContext;
    const [isActive, setIsActive] = useState(true);
    const [data, setData] = useState(initialData);

    const handleToggle = (key) => {
        const updatedData = data.map((item) =>
            item.key === key ? { ...item, isActive: !item.isActive } : item
        );
        setData(updatedData);
    };


    const handleDelete = (data) => {
        const addCollateral = "Hello"
        handleModalData(addCollateral, "md")

    }
  
    const handleEdit = (course) => {
        setSelectedCourse(course);
        setIsEditModalVisible(true);
    };

    const handleAdd = () => {
        setIsAddModalVisible(true);
    };
    
    


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
        { title: "ID", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name), width: 150 },
        { title: "Course Name", dataIndex: "age", key: "age", width: 100, sorter: (a, b) => a.age - b.age },
        { title: "Instructor", dataIndex: "email", key: "email", width: 150 },
        { title: "Category", dataIndex: "ph_number", key: "ph_number", width: 150 },
        { title: "Sub Category", dataIndex: "address", key: "address", width: 150 },
        { title: "Create Date", dataIndex: "city", key: "city", width: 150 },
        { title: "Update Date", dataIndex: "state", key: "state", width: 150 },
        { title: "Badge", dataIndex: "country", key: "country", width: 150 },
        { title: "Price", dataIndex: "pincode", key: "pincode", width: 150 },
        { title: "Plan", dataIndex: "last_Login", key: "last_Login", width: 150 },
        { title: "Status", dataIndex: "isActive", key: "isActive", width: 150 },
        { 
            title: "Activate/Deactivate", 
            dataIndex: "isActive", 
            key: "isActive", 
            width: 150,
            render: (_, record) => (
                <Switch 
                    checked={record.isActive} 
                    onChange={() => handleToggle(record.key)} 
                />
            )
        },
       

        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
                
                    <Button type="dashed" className="edit-btn" onClick={() => handleEdit(item)}>
                        Edit
                    </Button>
                    <Button type="dashed" className="edit-btn">
                        Delete
                    </Button>
                    <Button type="danger" className="delete-btn">
                        Approve
                    </Button>
                    <Button type="danger" className="delete-btn">
                        Reject
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
                <Button type="default" onClick={handleAdd}>
                    Create Course
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                onChange={handleChange}
                className="fancy-table"
                scroll={{ x: 'max-content', y: 500 }}
            />
            <AddCourseModal visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} />
            <EditCourseModal visible={isEditModalVisible} selectedCourse={selectedCourse} onCancel={() => setIsEditModalVisible(false)} />
        </div>
    );
};

export default Category;







