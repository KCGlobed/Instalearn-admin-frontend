import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Table, Button, Input, Drawer, Checkbox, Switch } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { handleGetCoursesFaqs, handleUpdateFaqStatus } from "../../../../utils/services";
import { ModalContext } from "../../../../Context";
import AssignFaqForm from "../../../modals/AssignFaqModal";
import DeleteFaq from "../../../modals/DeleteFaq";
import EditFaqForm from "../../../modals/EditFaqModal";

const Faq = () => {
    const [searchText, setSearchText] = useState("");
    const [faqs, setFaqs] = useState([]); // Original fetched FAQs
    const [filteredFaqs, setFilteredFaqs] = useState([]); // FAQs after search
    const [loading, setLoading] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [columnsConfig, setColumnsConfig] = useState({
        id: true,
        title: true,
        description: true,
        visible: true,
        actions: true,
    });

    const { id } = useParams();
    const { handleModalData } = useContext(ModalContext);

    // Fetch FAQs
    const fetchFaqs = async (courseId) => {
        try {
            setLoading(true);
            const response = await handleGetCoursesFaqs(courseId);
            if (response && response.res.results) {
                setFaqs(response.res.results);
                setFilteredFaqs(response.res.results);
            } else {
                toast.error("No FAQs found for this course.");
            }
        } catch (error) {
            console.error("Error fetching FAQs:", error);
            toast.error("Failed to fetch FAQs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchFaqs(id);
    }, [id]);

    const handleSearch = () => {
        const filtered = faqs.filter((faq) =>
            Object.values(faq).some((value) =>
                value?.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredFaqs(filtered);
    };

    const handleToggleActive = useCallback(async (faqId, checked) => {
        try {
            await handleUpdateFaqStatus({ status: checked ? "1" : "0" }, faqId);
            await fetchFaqs(id);
            toast.success("Successfully updated!");
        } catch (error) {
            console.error("Error updating active status:", error);
        }
    }, [id]);

    const allColumns = useMemo(
        () => [
            {
                title: "ID",
                dataIndex: "id",
                key: "id",
                width: 80,
            },
            {
                title: "Title",
                dataIndex: "title",
                key: "title",
                width: 250,
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description",
                width: 350,
            },
            {
                title: "Visible",
                dataIndex: "visible",
                key: "visible",
                render: (text, record) => (
                    <Switch
                        checked={record.visible}
                        onChange={(checked) => handleToggleActive(record.id, checked)}
                    />
                ),
                width: 100,
            },
            {
                title: "Actions",
                key: "actions",
                render: (faq) => (
                    <>
                        <Button
                            type="text"
                            icon={<EditOutlined style={{ color: "white" }} />}
                            className="icon_btn edit_icon"
                            onClick={() => handleEdit(faq)}
                        />
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(faq)}
                        />
                    </>
                ),
                fixed: "right",
            },
        ],
        [handleToggleActive]
    );

    const columns = allColumns.filter((col) => columnsConfig[col.key]);

    const handleAssignFaq = () => {
        handleModalData(<AssignFaqForm id={id} fetchFaqs={fetchFaqs} />, "md");
    };

    const handleDelete = (faq) => {
        handleModalData(<DeleteFaq data={faq} fetchFaqs={fetchFaqs} id={id} />, "md");
    };

    const handleEdit = (faq) => {
        handleModalData(<EditFaqForm faq={faq} id={id} fetchFaqs={fetchFaqs} />, "md");
    };

    return (
        <div className="fancy-table-container">
            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                }}
            >
                <div style={{ display: "flex", gap: 8 }}>
                    <Input
                        placeholder="Search FAQs"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onPressEnter={handleSearch}
                    />
                    <Button type="primary" onClick={handleSearch}>
                        Search
                    </Button>
                    <Button type="primary" onClick={() => setDrawerVisible(true)}>
                        Select Columns
                    </Button>
                </div>
                <Button type="default" className="create_btn" onClick={() => handleAssignFaq()}>
                    Assign FAQ
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={filteredFaqs}
                loading={loading}
                className="fancy-table"
                scroll={{ x: "max-content", y: 500 }}
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
                {allColumns.map((col) => (
                    <div key={col.key} style={{ marginBottom: 10 }}>
                        <Checkbox
                            checked={columnsConfig[col.key]}
                            onChange={(e) =>
                                setColumnsConfig((prev) => ({
                                    ...prev,
                                    [col.key]: e.target.checked,
                                }))
                            }
                        >
                            {col.title}
                        </Checkbox>
                    </div>
                ))}
                <Button type="primary" block onClick={() => setDrawerVisible(false)}>
                    Apply
                </Button>
            </Drawer>
        </div>
    );
};

export default Faq;
