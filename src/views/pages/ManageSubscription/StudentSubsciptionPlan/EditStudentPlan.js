import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Divider, Card, Row, Col, Tag } from 'antd';
import { CheckOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { handleGetStudentDetailSubscriptionPlan, handleUpdateStudentSubscriptionPlan } from '../../../../utils/services';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const { Option } = Select;

const EditStudentPlan = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const planTypeOptions = [
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly' },
        { value: 'half_yearly', label: 'Half Yearly' },
    ];

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await handleUpdateStudentSubscriptionPlan(values, id);
            toast.success('Plan updated successfully!');
            navigate('/managesubscription');
        } catch (error) {
            toast.error('Failed to update plan. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const calculateDerivedValues = (values) => {
        const originalPrice = parseFloat(values.original_price) || 0;
        const discountPercentage = parseFloat(values.discount_percentage) || 0;
        const gstPercentage = parseFloat(values.gst_percentage) || 0;

        const discountAmount = (originalPrice * discountPercentage) / 100;
        const amountWithoutGst = originalPrice - discountAmount;
        const gstAmount = (amountWithoutGst * gstPercentage) / 100;
        const finalAmount = amountWithoutGst + gstAmount;

        const updates = {
            amount_without_gst: amountWithoutGst.toFixed(2),
            gst_amount: gstAmount.toFixed(2),
            amount: finalAmount.toFixed(2)
        };

        form.setFieldsValue(updates);
        setFormValues(prev => ({ ...prev, ...updates }));
    };

    const onValuesChange = (changedValues, allValues) => {
        setFormValues(allValues);
        if (Object.keys(changedValues).some(key => 
            ['original_price', 'discount_percentage', 'gst_percentage'].includes(key)
        )) {
            calculateDerivedValues(allValues);
        }
    };

    const getPlanTypeLabel = (value) => {
        const option = planTypeOptions.find(opt => opt.value === value);
        return option ? option.label : '';
    };

    const parsePercentage = (value) => {
        if (typeof value === 'string') {
            return Number(value.replace('%', ''));
        }
        return value;
    };

    const fetchPlanDetails = async (id) => {
        try {
            const response = await handleGetStudentDetailSubscriptionPlan(id);
            const data = response?.res?.data;
            if (data) {
                // Calculate GST percentage if not provided but we have gst_amount and amount_without_gst
                let gstPercentage = data.gst_percentage;
                if (!gstPercentage && data.gst_amount && data.amount_without_gst) {
                    gstPercentage = (parseFloat(data.gst_amount) / parseFloat(data.amount_without_gst)) * 100;
                }
    
                const initialValues = {
                    ...data,
                    discount_percentage: data.discount_percentage || 0,
                    gst_percentage: gstPercentage || 0, // Use calculated value or default to 0
                    feature: data.feature || [],
                    original_price: data.original_price || 0
                };
    
                form.setFieldsValue(initialValues);
                setFormValues(initialValues);
                calculateDerivedValues(initialValues);
            }
        } catch (error) {
            toast.error('Failed to fetch plan details');
            console.error('Error fetching plan details:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchPlanDetails(id);
        }
    }, [id]);

    return (
        <div style={{ padding: '24px' }}>
            <Row gutter={24}>
                <Col xs={24} md={14}>
                    <Card title="Edit Plan" className='plan_form_card' style={{ marginBottom: 24 }}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onValuesChange={onValuesChange}
                            autoComplete="off"
                            initialValues={{
                                feature: [],
                                discount_percentage: 0,
                                gst_percentage: 0,
                                original_price: 0
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
                                        <Row gutter={[16, 16]}>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Col key={key} span={12}>
                                                    <div style={{ display: 'flex', gap: 8, height: 30 }}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name]}
                                                            style={{ flex: 1 }}
                                                            rules={[{ required: true, message: 'Missing feature' }]}
                                                        >
                                                            <Input placeholder="Enter feature" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined
                                                            onClick={() => remove(name)}
                                                            style={{ color: '#ff4d4f', fontSize: 18, marginTop: 6 }}
                                                        />
                                                    </div>
                                                </Col>
                                            ))}
                                            <Col span={24}>
                                                <Button type="dashed" className='w-100' onClick={() => add()} icon={<PlusOutlined />}>
                                                    Add Feature
                                                </Button>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </Form.List>

                            <Form.Item style={{ marginTop: 24 }}>
                                <Button type="primary" htmlType="submit" loading={loading} size="large" block>
                                    Update Plan
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                <Col xs={24} md={10}>
                    <Card className='prev-card' title="Plan Preview" style={{ position: 'sticky', top: 68 }}>
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

export default EditStudentPlan;