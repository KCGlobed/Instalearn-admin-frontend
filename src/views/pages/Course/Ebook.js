import React, { useCallback, useContext, useEffect, useState } from "react";
import { Table, Button, Input, Switch } from "antd";
import { ModalContext } from "../../../Context";

import AddBookModal from "../../modals/AddBookModal";
import EditBookModal from "../../modals/EditBookModal";
import { getEbookListApi, handlestatusEbook } from "../../../utils/services";
import toast from "react-hot-toast";
import DeleteEbook from "../../modals/DeleteEbook";

const Ebook = () => {
  const { handleModalData } = useContext(ModalContext);

  const [ebooks, setEbooks] = useState([]);
  const [filteredEbooks, setFilteredEbooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [modalVisible, setModalVisible] = useState({
    add: false,
    edit: false,
  });

  const fetchEbookList = async () => {
    try {
      const response = await getEbookListApi();
      const ebooks = response?.res?.results || [];

      const formatted = ebooks.map((item) => ({
        key: item.id,
        id: item.id,
        name: item.name,
        chapterName: item.chapter_info?.name || "-",
        chapterDescription: item.chapter_info?.description || "-",
        visible: item.visible,
      }));

      setEbooks(formatted);
      setFilteredEbooks(formatted);
    } catch (error) {
      console.error("Failed to fetch ebooks:", error);
    }
  };

  useEffect(() => {
    fetchEbookList();
  }, []);

  // Handle Toggle Active Status
  const handleToggleActive = useCallback(async (id, checked) => {
    try {
      await handlestatusEbook({ status: checked ? "1" : "0" }, id);
      fetchEbookList()
      toast.success("Successfully updated!");
    } catch (error) {
      console.error("Error updating active status:", error);
    }
  }, []);

  const handleSearch = () => {
    const query = searchText.toLowerCase();
    const filtered = ebooks.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(query)
      )
    );
    setFilteredEbooks(filtered);
  };

  const handleEdit = (ebook) => {
    setSelectedEbook(ebook);
    setModalVisible((prev) => ({ ...prev, edit: true }));
  };

  const handleDelete = (ebook) => {
    handleModalData(<DeleteEbook fetchEbookList={fetchEbookList} ebook={ebook} />, "sm"); // Placeholder
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 100 },
    { title: "E-Book Title", dataIndex: "name", key: "name", width: 200 },
    { title: "Chapter Name", dataIndex: "chapterName", key: "chapterName", width: 200 },
    { title: "Description", dataIndex: "chapterDescription", key: "chapterDescription", width: 300 },
    {
      title: "Active",
      key: "active",
      render: (staff) => (
        <Switch checked={staff.visible} onChange={(checked) => handleToggleActive(staff.id, checked)} />
      ),

    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 250,
      render: (item) => (
        <div className="action-buttons">
          <Button type="dashed" onClick={() => handleEdit(item)}>Edit</Button>
          <Button type="dashed" onClick={() => handleDelete(item)}>Delete</Button>

        </div>
      ),
    },
  ];

  return (
    <div className="fancy-table-container">
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", gap: 8 }}>
        <div className="table_search" style={{ display: "flex", gap: 8 }}>
          <Input
            placeholder="Search in all fields"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Button type="primary" onClick={handleSearch}>Search</Button>
        </div>
        <Button type="default" className="create_btn" onClick={() => setModalVisible({ ...modalVisible, add: true })}>
          Create E-Book
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredEbooks}
        className="fancy-table"
        scroll={{ x: "max-content", y: 500 }}
      />

      <AddBookModal fetchEbookList={fetchEbookList} visible={modalVisible.add} onCancel={() => setModalVisible({ ...modalVisible, add: false })} />
      <EditBookModal
        visible={modalVisible.edit}
        selectedCourse={selectedEbook}
        onCancel={() => setModalVisible({ ...modalVisible, edit: false })}
      />
    </div>
  );
};

export default Ebook;
