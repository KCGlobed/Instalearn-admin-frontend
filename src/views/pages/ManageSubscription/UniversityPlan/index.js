import React, { useState, useMemo, useEffect, useContext, useCallback } from "react";
import { Table, Button, Input, Switch, Spin } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { getStudentSubscriptionPlanApi, getUnversitySubscriptionPlanApi, handleStatusStudentSubscriptionPlan, handleUpdateStatusUniversitySubscriptionPlan } from "../../../../utils/services";
import { useNavigate } from "react-router-dom";
import DeleteStudentSubcriptionPlan from "../../../modals/DeleteStudentSubcriptionPlan";
import { ModalContext } from "../../../../Context";
import DeleteUniversityPlan from "../../../modals/DeleteUniversityPlan";

const UniversityPlan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { handleModalData } = useContext(ModalContext);
  const nevigate = useNavigate();

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await getUnversitySubscriptionPlanApi();
      const data = response?.res?.results || [];
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to load subscription plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const filteredPlans = useMemo(() => {
    return plans.filter(plan =>
      Object.values(plan).some(value =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [plans, searchText]);

  const handleToggleActive = useCallback(async (id, checked) => {
    try {
      await handleUpdateStatusUniversitySubscriptionPlan({ status: checked ? 1 : 0 }, id);
      fetchPlans();
      toast.success("Successfully updated!");
    } catch (error) {
      console.error("Error updating active status:", error);
    }
  }, []);

  const handleView = (id) => toast(`View clicked for ID: ${id}`);
  const handleEdit = (id) => toast(`Edit clicked for ID: ${id}`);


  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 80, align: "center" },
    { title: "Plan Name", dataIndex: "plan_name", key: "plan_name", width: 200, align: "center" },
    { title: "Original Price", dataIndex: "original_price", key: "original_price", width: 150 },
    { title: "GST Amount", dataIndex: "gst_amount", key: "gst_amount", width: 120 },
    { title: "Total Amount", dataIndex: "amount", key: "amount", width: 150 },
    { title: "Plan Type", dataIndex: "plan_type", key: "plan_type", width: 120, align: "center" },
    {
      title: "Active Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (status ? "Active" : "Inactive"),
      width: 120,
    },
    {
      title: "Active",
      key: "active",
      render: (record) => (
        <Switch checked={record.status} onChange={(checked) => handleToggleActive(record.id, checked)} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (plan) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button icon={<EyeOutlined />} onClick={() => nevigate(`/view-university-plan/${plan.id}`) } />
          <Button icon={<EditOutlined />} onClick={() =>nevigate(`/update-university-plan/${plan.id}`) } />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(plan.id)} />
        </div>
      ),
      width: 180,
    },
  ];

  const handleDelete = (planID) => {
    const modal = <DeleteUniversityPlan planID={planID} fetchPlans={fetchPlans} />;
    handleModalData(modal, "sm");
  };

  return (
    <div className="fancy-table-container">
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", gap: 8 }}>
        <div className="table-search">
          <Input
            placeholder="Search in all fields"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 220 }}
          />
          <Button type="primary" className="ms-2" onClick={() => toast("Search triggered (optional)")}>
            Search
          </Button>
        </div>
        <Button
          type="default"
          className="create_btn mt-2"
          onClick={() => nevigate("/add-university-plan")}
        >
          Create Subscription
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredPlans}
          rowKey="id"
          className="fancy-table"
          scroll={{ x: "max-content", y: 500 }}
        />
      )}
    </div>
  );
};

export default UniversityPlan;
