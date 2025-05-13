import React, { useCallback, useContext, useEffect, useState } from "react";
import { Table, Button, Input, Drawer, Checkbox, Switch } from "antd";
import { ModalContext } from "../../../../Context";
import { getBlogCategoryApi, handleUpdateStatusBlogCategory } from "../../../../utils/services";
import AddBlogCategory from "../../../modals/AddBlogCategory";
import DeleteBlogCategory from "../../../modals/DeleteBlogCategory";
import toast from "react-hot-toast";
import EditBlogCategory from "../../../modals/EditBlogCategory";

const ManageBlogCategory = () => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [initialData, setInitialData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        title: true,
        visible: true,
        actions: true,
        active: true,
    });

    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const handleSearch = () => {
        const filtered = initialData.filter((item) =>
            Object.values(item).some((value) =>
                value?.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const handleBlogCategoryList = async () => {
        const response = await getBlogCategoryApi();
        if (response?.res?.results) {
            setInitialData(response.res.results);
            setFilteredData(response.res.results);
        }
    };

    useEffect(() => {
        handleBlogCategoryList();
    }, []);

    const handleView = (item) => {
        console.log("View clicked", item);
    };

    const handleEdit = (item) => {
        console.log("Edit clicked", item);
    };


    const allColumns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            sorter: (a, b) => a.
            title.localeCompare(b.title),
            width: 200,
            align: "center",
        },
        {
            title: "Visible",
            dataIndex: "visible",
            key: "visible",
            sorter: (a, b) => a.visible - b.visible,
            width: 100,
            render: (value) => (value ? "Yes" : "No"),
            align: "center",
        },
        {
            title: "Active",
            key: "active",
            render: (record) => (
                <Switch checked={record.visible} onChange={(checked) => handleToggleActive(record.id, checked)} />
            ),
            align: "center",
        },
        {
            title: "Actions",
            key: "actions",
            render: (item) => (
                <div className="action-buttons">
                    <Button type="dashed" className="edit-btn" onClick={() => handleEditBlogCategory(item)}>Edit</Button>
                    <Button type="danger" className="delete-btn" onClick={() => handleDeleteBlogCategory(item)}>Delete</Button>
                </div>
            ),
            fixed: "center"
        }
    ];

    const columns = allColumns.filter(col => columnsConfig[col.key]);

    const handleToggleActive = useCallback(async (id, checked) => {
        try {
            await handleUpdateStatusBlogCategory({ status: checked ? "1" : "0" }, id);
            handleBlogCategoryList();
            toast.success("Successfully updated!");
        } catch (error) {
            console.error("Error updating active status:", error);
        }
    }, []);

    const handleDeleteBlogCategory = (item) => {
        handleModalData(<DeleteBlogCategory handleGetApi={handleBlogCategoryList} item={item} />, "sm");  
    
    }
    const handleEditBlogCategory = (item) => {
        handleModalData(<EditBlogCategory handleBlogCategoryList={handleBlogCategoryList} item={item} />, "md")
    
    }

    const handleAddBlogCategory = () => {
        handleModalData(<AddBlogCategory handleBlogCategoryList={handleBlogCategoryList} />,"md");
    }

    return (
        <div className="fancy-table-container" style={{ animation: "fadeIn 1s ease-in-out" }}>
            <div style={{ marginBottom: 16, display: "flex", gap: "8px", justifyContent: "space-between" }}>
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
                    <Button type="primary" className="ms-2" onClick={() => setDrawerVisible(true)}>
                        Select Columns
                    </Button>
                </div>
                <div>
                    <Button type="default" className="create_btn" style={{ marginRight: "5px" }} onClick={()=>handleAddBlogCategory()}>
                        Create Blog Category
                    </Button>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={filteredData}
                onChange={handleChange}
                className="fancy-table"
                scroll={{ x: 'max-content', y: 500 }}
                rowKey="id"
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

export default ManageBlogCategory;
