import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Divider, Space, message, Card, Row, Col, Tag } from 'antd';
import { CheckOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { handleCreateCorpSubscriptionApi, handleCreateStudentSubscriptionApi } from '../../../../utils/services';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateCorporateSubscription = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  const planTypeOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'half_yearly', label: 'Half Yearly' },
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await handleCreateCorpSubscriptionApi(values);
      toast.success('Plan created successfully!');
      form.resetFields();
      setFormValues({});
      navigate('/managesubscription');
    } catch (error) {
      toast.error('Failed to create plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onValuesChange = (changedValues, allValues) => {
    setFormValues(allValues);
    calculateDerivedValues(allValues);
  };

  const calculateDerivedValues = (values) => {
    const originalPrice = values.original_price;
    const discountPercentage = values.discount_percentage || 0;
    const gstPercentage = values.gst_percentage || 0;

    if (originalPrice !== undefined && gstPercentage !== undefined) {
      const discountAmount = (originalPrice * discountPercentage) / 100;
      const amountWithoutGst = originalPrice - discountAmount;
      const gstAmount = (amountWithoutGst * gstPercentage) / 100;
      const finalAmount = amountWithoutGst + gstAmount;

      form.setFieldsValue({
        amount_without_gst: amountWithoutGst.toFixed(2),
        gst_amount: gstAmount.toFixed(2),
        amount: finalAmount.toFixed(2)
      });

      setFormValues(prev => ({
        ...prev,
        amount_without_gst: amountWithoutGst.toFixed(2),
        gst_amount: gstAmount.toFixed(2),
        amount: finalAmount.toFixed(2)
      }));
    }
  };

  const getPlanTypeLabel = (value) => {
    const option = planTypeOptions.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  // Custom parser for percentage fields
  const parsePercentage = (value) => {
    if (typeof value === 'string') {
      return Number(value.replace('%', ''));
    }
    return value;
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={24}>
        <Col xs={24} md={14}>
          <Card title="Create New Plan" className='plan_form_card' style={{ marginBottom: 24 }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onValuesChange={onValuesChange}
              autoComplete="off"
              initialValues={{
                feature: [] // Initialize features as empty array
              }}
            >
              <Form.Item
                label="Plan Name"
                name="plan_name"
                rules={[{ required: true, message: 'Please enter plan name' }]}
              >
                <Input placeholder="Enter plan name" />
              </Form.Item>

              <Divider orientation="left">Plan Details</Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Description "
                    name="text_1"
                    rules={[{ required: true, message: 'Please enter text 1' }]}
                  >
                    <Input placeholder="Enter text 1" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Description 2"
                    name="text_2"
                    rules={[{ required: true, message: 'Please enter text 2' }]}
                  >
                    <Input placeholder="Enter text 2" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Sub heading"
                    name="text_3"
                    rules={[{ required: true, message: 'Please enter text 3' }]}
                  >
                    <Input placeholder="Enter text 3" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Sub description"
                    name="text_4"
                    rules={[{ required: true, message: 'Please enter text 4' }]}
                  >
                    <Input placeholder="Enter text 4" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">Pricing</Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Original Price"
                    name="original_price"
                    rules={[{ required: true, message: 'Please enter original price' }]}
                  >
                    <InputNumber 
                      min={0} 
                      style={{ width: '100%' }} 
                      formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/₹\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Discount Percentage"
                    name="discount_percentage"
                    rules={[{ required: true, message: 'Please enter discount percentage' }]}
                  >
                    <InputNumber 
                      min={0} 
                      max={100} 
                      style={{ width: '100%' }} 
                      formatter={value => `${value}%`}
                      parser={parsePercentage}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="GST Percentage"
                    name="gst_percentage"
                    rules={[{ required: true, message: 'Please enter GST percentage' }]}
                  >
                    <InputNumber 
                      min={0} 
                      max={100} 
                      style={{ width: '100%' }} 
                      formatter={value => `${value}%`}
                      parser={parsePercentage}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Amount Without GST"
                    name="amount_without_gst"
                  >
                    <InputNumber 
                      disabled 
                      style={{ width: '100%' }} 
                      formatter={value => `₹ ${value}`}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="GST Amount"
                    name="gst_amount"
                  >
                    <InputNumber 
                      disabled 
                      style={{ width: '100%' }} 
                      formatter={value => `₹ ${value}`}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Final Amount"
                    name="amount"
                  >
                    <InputNumber 
                      disabled 
                      style={{ width: '100%' }} 
                      formatter={value => `₹ ${value}`}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Plan Type"
                    name="plan_type"
                    rules={[{ required: true, message: 'Please select plan type' }]}
                  >
                    <Select placeholder="Select plan type">
                      {planTypeOptions.map(option => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">Features</Divider>
              <Form.List name="feature">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name]}
                          rules={[{ required: true, message: 'Missing feature' }]}
                        >
                          <Input placeholder="Enter feature" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} style={{ color: '#ff4d4f' }} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Feature
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item style={{ marginTop: 24 }}>
                <Button type="primary" htmlType="submit" loading={loading} size="large" block>
                  Create Plan
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={10}>
          <Card className='prev-card ' title="Plan Preview" style={{ position: 'sticky', top: 68 }}>
            {formValues.plan_name ? (
              <div className='prev-card-content'>
                <div className='prev-card-header'>
                  <h3 style={{ marginBottom: 8 }}>{formValues.plan_name}</h3>
                  {formValues.plan_type && (
                    <Tag color="blue" style={{ marginBottom: 16 }}>
                      {getPlanTypeLabel(formValues.plan_type)}
                    </Tag>
                  )}

                  <div style={{ marginBottom: 16 }}>
                    {formValues.text_1 && <p>{formValues.text_1}</p>}
                    {formValues.text_2 && <p>{formValues.text_2}</p>}
                  </div>
                </div>
                <div className='prev-card-body'>
                  {formValues.text_3 && <h4>{formValues.text_3}</h4>}
                  {formValues.text_4 && <p>{formValues.text_4}</p>}
                  {formValues.text_3 && formValues.text_4 && 
                    <Button type="default" className="create_btn w-100 mt-2">Buy Plan</Button>
                  }
                  
                  {formValues.amount && (
                    <div style={{ marginBottom: 16 }} className='mt-3'>
                      <h4>Pricing</h4>
                      <h4 style={{ color: '#1890ff' }}>₹{formValues.amount}</h4>
                      {formValues.original_price && (
                        <p>
                          <span style={{ textDecoration: 'line-through', marginRight: 8 }}>
                            ₹{formValues.original_price}
                          </span>
                          {formValues.discount_percentage > 0 && (
                            <Tag color="green">{formValues.discount_percentage}% OFF</Tag>
                          )}
                        </p>
                      )}
                      <small style={{ color: '#888' }}>
                        (Includes ₹{formValues.gst_amount || 0} GST @ {formValues.gst_percentage || 0}%)
                      </small>
                    </div>
                  )}
                  
                  {formValues.feature?.length > 0 && (
                    <div className='mt-4'>
                      <h3>Features</h3>
                      <div style={{ paddingLeft: 20 }}>
                        {formValues.feature.map((feature, index) => (
                          <p key={index}> <CheckOutlined style={{ color: 'green', marginRight: 8 }} />  {feature}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
                <p>Fill out the form to see a preview</p>
                <p>of your student plan here</p>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateCorporateSubscription;