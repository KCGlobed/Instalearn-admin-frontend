import React, { useContext, useState } from "react";
import { Table, Button, Input, Descriptions, Drawer, Checkbox } from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";
import AddNewsModal from "../../modals/AddNewsModal";
import EditNewsForm from "../../modals/EditNewsModal";
import ViewNewsModal from "../../modals/ViewNewsModal";

const initialData = [
    {
        "title": "New Tech Breakthrough",
        "source": "TechCrunch",
        "description": "A new AI model has surpassed human performance in image recognition tasks.",
        "url": "https://techcrunch.com/new-tech-breakthrough",
        "imageUrl": "https://example.com/news1.jpg",
        "date": "2025-03-28 10:30 AM"
    },
    {
        "title": "Stock Market Update",
        "source": "Bloomberg",
        "description": "The stock market saw a significant rise today amid economic optimism.",
        "url": "https://bloomberg.com/stock-market-update",
        "imageUrl": "https://example.com/news2.jpg",
        "date": "2025-03-28 11:00 AM"
    },
    {
        "title": "Climate Change Report",
        "source": "BBC News",
        "description": "A new report highlights the urgent need for action to combat climate change.",
        "url": "https://bbc.com/climate-change-report",
        "imageUrl": "https://example.com/news3.jpg",
        "date": "2025-03-28 12:15 PM"
    }
]

const ManageNews = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(initialData);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        title: true,
        source: true,
        description: true,
        url: true,
        imageUrl: true,
        date: true,
        actions: true,
    });

    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;


    const handleView = (selectedUser) => {
    
        const addCollateral = <ViewNewsModal item={selectedUser} />
        handleModalData(addCollateral, "lg")
    }

    const handleDeteleUser = (item) => {
        const userReportDelete = <DeleteUserReportModal />
        handleModalData(userReportDelete, "sm")
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

    const handleAddNews = () => {
      
        const addCollateral = <AddNewsModal />
        handleModalData(addCollateral, "md")
    }
    const handleEditNews = () => {
      
        const addCollateral = <EditNewsForm />
        handleModalData(addCollateral, "md")
    }
   


    const allColumns = [
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Source", dataIndex: "source", key: "source" },
        { title: "Description", dataIndex: "description", key: "description" },
        { title: "URL", dataIndex: "url", key: "url" },
        { title: "Image URL", dataIndex: "imageUrl", key: "imageUrl" },
        { title: "Date", dataIndex: "date", key: "date" },
        {
            title: "Actions", key: "actions", render: (item) => (
                <div className="action-buttons">
                    <Button type="primary" className="view-btn" onClick={() => handleView(item)}>
                        View
                    </Button>
                    <Button type="dashed" className="edit-btn" onClick={()=>handleEditNews()}>
                        Edit
                    </Button>
                    <Button type="dashed" className="edit-btn">
                        Aprove
                    </Button>
                    <Button type="dashed" className="edit-btn">
                        Rejected
                    </Button>
                    <Button type="danger" className="delete-btn" onClick={() => handleDeteleUser()}>
                        Delete
                    </Button>
                </div>
            )
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
                    <Button type="default" onClick={handleAddNews}>
                       Create News
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

export default ManageNews;
