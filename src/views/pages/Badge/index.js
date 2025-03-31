import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Input, Descriptions, Switch } from "antd";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { ModalContext } from "../../../Context";
import ViewUserReportModal from "../../modals/ViewUserReportModal";
import { initialData } from "../../../_dummyData/userReport";
import CreateBadge from "../../modals/CreateBadge";
import EditBadge from "../../modals/editBadge";
import DeleteUserReportModal from "../../modals/DeleteUserReportModal";
import { getListOfBadge } from "../../../utils/services";
import DeleteBadgeModal from "../../modals/DeleteBadgeModal";



const Badge = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const handleSearch = () => {
        const filtered = filteredData.filter((item) =>
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
        { title: "ID", dataIndex: "id", key: "id", },
        { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
        {
            title: "Active",
            key: "active",

            render: () => (
                <>
                    <div className="switch_item">
                        <Switch defaultChecked />
                    </div>

                </>
            ),
        },

        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">

                    <Button type="dashed" className="edit-btn" onClick={() => EditBadgeModal(item)}>
                        Edit
                    </Button>
                    <Button type="danger" className="delete-btn" onClick={() => handleDeteleBadge(item)}>
                        Delete
                    </Button>
                </div>
            ),
            fixed: "right"

        },
    ];

    const CreateBadgeModal = (item) => {
        const create = <CreateBadge handleGetApi={handleGetApi} />
        handleModalData(create, "md")
    }
    const EditBadgeModal = (item) => {
        const EditBadgeModal = <EditBadge handleGetApi={handleGetApi} item={item}  />
        handleModalData(EditBadgeModal, "md")
    }
    const handleDeteleBadge = (item) => {
        const userReportDelete = <DeleteBadgeModal handleGetApi={handleGetApi}  item={item}  />
        handleModalData(userReportDelete, "sm")
    }
    const handleGetApi = async () => {
        try {
            let result = await getListOfBadge()
            setFilteredData(result.res)
        } catch (error) {
            console.log("error", error)
        }
    }
    useEffect(() => {
        
        handleGetApi()
     }, [])

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
                 
                    <Button type="default" className="create_badgebtn" onClick={() => CreateBadgeModal()}>
                        Create Badge
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
        </div>
    );
};

export default Badge;
