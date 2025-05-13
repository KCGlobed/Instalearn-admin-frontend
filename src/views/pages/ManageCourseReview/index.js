import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table, Button, Input, Drawer, Checkbox, Switch, Image } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { handleActiveCourseReviewApi, handleCourseReviewList } from "../../../utils/services";




const ManageCourseReview = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [columnsConfig, setColumnsConfig] = useState({
        name: true,
        review: true,
        rating: true,
        course_name: true,
        course_image: true,
        active: true,
        actions: true,
    });
    const [drawerVisible, setDrawerVisible] = useState(false);

  const handleToggleActive = useCallback(async (id, checked) => {
        try {
            await handleActiveCourseReviewApi({ status: checked ? "1" : "0" }, id);
            fetchData();
            toast.success("Successfully updated!");
        } catch (error) {
            console.error("Error updating active status:", error);
        }
    }, []);

    const allColumns = useMemo(() => [
        {
            title: "Reviewer Name",
            dataIndex: "name",
            key: "name",
            width: 180,
        },
        {
            title: "Review",
            dataIndex: "review",
            key: "review",
            width: 300,
            ellipsis: true,
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
            width: 100,
        },
        {
            title: "Course",
            key: "course_name",
            render: (_, record) => record.course_info?.name,
            width: 200,
        },
        {
            title: "Course Image",
            key: "course_image",
            render: (_, record) => (
                <Image
                    src={record.course_info?.image}
                    width={80}
                    height={50}
                    alt="course-img"
                    preview={false}
                />
            ),
            width: 120,
        },
       {
                   title: "Active",
                   key: "active",
                   render: (record) => (
                       <Switch checked={record.status} onChange={(checked) => handleToggleActive(record.id, checked)} />
                   ),
               },
        // {
        //     title: "Actions",
        //     key: "actions",
        //     render: (record) => (
        //         <div className="action-buttons">
        //             <Button icon={<EyeOutlined />} type="text" />
        //             <Button icon={<EditOutlined />} type="text" />
        //             <Button icon={<DeleteOutlined />} type="text" danger />
        //         </div>
        //     ),
        // },
    ], [handleToggleActive]);

    const columns = allColumns.filter(col => columnsConfig[col.key]);

    const handleSearch = () => {
        const filtered = filteredData.filter((item) =>
            Object.values(item).some((value) =>
                typeof value === "string" && value.toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const fetchData = async () => {
        const result = await handleCourseReviewList();
        setFilteredData(result.res.results);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="fancy-table-container">
        <div style={{ marginBottom: 16, display: "flex", gap: "8px", justifyContent: "space-between" }}>
            <div className="table_search" >
                <Input
                    placeholder="Search in all fields"
                />
                <Button type="primary" >
                    Search
                </Button>
            </div>
            <div>
              
            </div>

        </div>
        <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            onChange={(pagination, filters, sorter) => setSortedInfo(sorter)}
            className="fancy-table"
            scroll={{ x: "max-content", y: 500 }}
        />

        <Drawer
            title="Select Table Columns"
            placement="right"
            width={300}
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
        >
            <div>
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

export default ManageCourseReview;
