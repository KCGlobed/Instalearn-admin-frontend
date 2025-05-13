import React, { useContext, useEffect, useMemo, useState } from "react";
import { Table, Button, Input, Drawer, Checkbox, Image } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { handleGetInstructorApi } from "../../../utils/services";
import AssignInstructorModal from "../../modals/AssignInstructorModal";
import DeleteCourseInstructorModal from "../../modals/DeleteCourseInstructorModal";
import { ModalContext } from "../../../Context";

const AssignInstructor = () => {
  const [searchText, setSearchText] = useState("");
  const [instructors, setInstructors] = useState([]); // more readable
  const [filteredInstructors, setFilteredInstructors] = useState([]); // search results
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleModalData } = useContext(ModalContext);
  const [columnsConfig, setColumnsConfig] = useState({
    id: true,
    name: true,
    title: true,
    image: true,
    experience: true,
    actions: true,
  });

  const { id } = useParams();

  const fetchInstructors = async (id) => {
    try {
      setLoading(true);
      const response = await handleGetInstructorApi(id);
      const rawData = response.res.data;
 
      // Map API response to flatten instructor_info inside each object
      const mappedData = rawData.map((item) => ({
        id: item.id,
        instructorId: item.instructor_info.id,
        name: item.instructor_info.text_1,
        title: item.instructor_info.text_2,
        description: item.instructor_info.text_3,
        image: item.instructor_info.image,
        experience: item.instructor_info.experience,
      }));

      setInstructors(mappedData);
      setFilteredInstructors(mappedData);
    } catch (error) {
      console.error("Error fetching instructors:", error);
      toast.error("Failed to fetch instructors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchInstructors(id);
  }, [id]);

  const handleSearch = () => {
    const filtered = instructors.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredInstructors(filtered);
  };

  const allColumns = useMemo(
    () => [
      {
        title: "Thumbnail",
        dataIndex: "image",
        key: "image",
        render: (src) => (
          <Image
            alt="Instructor"
            width={80}
            height={50}
            style={{ objectFit: "cover", borderRadius: 8 }}
            src={src}
          />
        ),
        width: 120,
      },
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 80,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        width: 200,
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: 250,
      },
      {
        title: "Experience",
        dataIndex: "experience",
        key: "experience",
        width: 100,
      },
      {
        title: "Actions",
        key: "actions",
        render: (item) => (
          <div className="action-buttons">
            <Button type="text" icon={<DeleteOutlined />} className="icon_btn" onClick={()=>handleDelete(item)} />
          </div>
        ),
        fixed: "right",
      },
    ],
    []
  );

  const columns = allColumns.filter((col) => columnsConfig[col.key]);

  const handleAsignInstructor = () => {
    setIsAddModalVisible(true);
  }
    const handleDelete = (course) => {
          const modal = <DeleteCourseInstructorModal InstructorListID={id} data={course} fetchInstructors={fetchInstructors} />;
          handleModalData(modal, "sm");
};

  return (
    <div className="fancy-table-container">
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <div className="table_search">
          <Input
            placeholder="Search instructors"
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
        <Button type="default" onClick={()=>handleAsignInstructor()}>Assign Instructor</Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredInstructors}
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
      <AssignInstructorModal fetchInstructors={fetchInstructors} courseId={id}  visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} />
    </div>
  );
};

export default AssignInstructor;
