import React, { useEffect } from 'react';
import { FiCheck, FiUsers, FiDollarSign, FiPercent, FiFileText } from 'react-icons/fi';
import { handleGetStudentDetailSubscriptionPlan } from '../../../../utils/services';
import { useParams } from 'react-router-dom';

const ViewStudetPlan = () => {
const [planData, setPlanData] = React.useState({});
const  {id} = useParams(); // Assuming you're using react-router-dom to get the ID from the URL

  const handleViewPlan =async(id) => {
    const response = await handleGetStudentDetailSubscriptionPlan(id);
    console.log("Response:", response.res);
    setPlanData(response.res.data);
     
  }

useEffect(() => {
    handleViewPlan(id);
}, [id]);


  return (
    <div className="enterprise-container">
      <div className="plan-card">
        {/* Header Section */}
        <div className="plan-header">
          <div className="badge">POPULAR</div>
          <h1>{planData.plan_name}</h1>
          <p className="plan-description">{planData.text_1}</p>
          <div className="user-count">
            <FiUsers className="icon" />
            <span>{planData.text_2}</span>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="pricing-section">
          <div className="price-display">
            <h2>{planData.text_3}</h2>
            <p className="billing-info">{planData.text_4}</p>
          </div>

          <div className="price-breakdown">
            <div className="breakdown-card">
              <h3>Pricing Breakdown</h3>
              
              <div className="price-row">
                <div className="price-label">
                  <FiDollarSign className="icon" />
                  <span>Base Price</span>
                </div>
                <span className="price-value">₹{planData.original_price?.toLocaleString()}</span>
              </div>
              
              <div className="price-row discount">
                <div className="price-label">
                  <FiPercent className="icon" />
                  <span>Discount ({planData.discount_percentage}%)</span>
                </div>
                <span className="price-value">-₹{(planData.original_price - planData.amount_without_gst)?.toLocaleString()}</span>
              </div>
              
              <div className="price-row">
                <div className="price-label">
                  <FiFileText className="icon" />
                  <span>Subtotal</span>
                </div>
                <span className="price-value">₹{planData.amount_without_gst?.toLocaleString()}</span>
              </div>
              
              <div className="price-row">
                <div className="price-label">
                  <FiPercent className="icon" />
                  <span>GST (5%)</span>
                </div>
                <span className="price-value">₹{planData.gst_amount?.toLocaleString()}</span>
              </div>
              
              <div className="price-row total">
                <div className="price-label">
                  <FiDollarSign className="icon" />
                  <span>Total Amount</span>
                </div>
                <span className="price-value">₹{planData.amount?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h3>Everything included in {planData.plan_name}</h3>
          <ul className="features-grid">
            {planData?.feature?.map((feature, index) => (
              <li key={index}>
                <FiCheck className="check-icon" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewStudetPlan;