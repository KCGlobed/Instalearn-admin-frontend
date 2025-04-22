import React, { useState, useCallback, use } from 'react';
import { 
  Card, 
  Button, 
  List, 
  Typography, 
  Divider, 
  Space, 
  Descriptions, 
  Tag, 
  Image 
} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { handleAddCourseApi, handleChapterTopicApi } from '../../../utils/services';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const ReviewCourse = ({ courses, data }) => {
  const [showChapter, setShowChapter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const navigate =useNavigate();

  const handleSubmit = useCallback(async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      // Basic course info
      formData.append("name", values.name);
      formData.append("short_description", values.short_description);
      formData.append("description", values.description);
      formData.append("requirement", values.requirement);
      formData.append("price", values.price);
      formData.append("discounted_price", values.discounted_price);
      
      // JSON data
      formData.append("feature_json", JSON.stringify(values.feature_json));
      formData.append("objectives_summary", JSON.stringify(values.objectives_summary));
      formData.append("tags", JSON.stringify(values.tags));
      formData.append("category", values.category.join(","));
      
      // Images
      if (values.image?.file) formData.append("image", values.image.file);
      if (values.banner_image?.file) formData.append("banner_image", values.banner_image.file);
      
      const res = await handleAddCourseApi(formData);
      setCourseId(res.data.course_id);
      toast.success("Course created successfully!");
      setShowChapter(true);
    } catch (error) {
      console.error("Failed to submit course:", error);
      toast.error("Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBackToDetails = useCallback(() => {
    setShowChapter(false);
  }, []);

  const handleFinalSubmit = useCallback(async () => {
    try {
      await handleChapterTopicApi({
        course_id: courseId,
        chapter_topic_list: courses
      });
      toast.success(`Course ${courseId} submitted successfully!`);
      navigate("/course"); // Redirect to course list after submission
    } catch (error) {
      console.error("Failed to submit chapters:", error);
      toast.error("Failed to submit course chapters.");
    }
  }, [courseId, courses]);

  const renderCourseDetails = () => (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ marginBottom: '24px' }}>Review Your Course Details</Title>
      
      <Descriptions
        title="Course Information"
        bordered
        column={1}
        labelStyle={{ fontWeight: 'bold' }}
      >
        <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
        <Descriptions.Item label="Price">₹{data.price}</Descriptions.Item>
        <Descriptions.Item label="Discounted Price">₹{data.discounted_price}</Descriptions.Item>
        <Descriptions.Item label="Category IDs">{data.category.join(', ')}</Descriptions.Item>
        <Descriptions.Item label="Tags">
          {data.tags.map(tag => (
            <Tag color="blue" key={tag}>{tag}</Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Short Description">
          <div dangerouslySetInnerHTML={{ __html: data.short_description }} />
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </Descriptions.Item>
        <Descriptions.Item label="Requirements">
          <div dangerouslySetInnerHTML={{ __html: data.requirement }} />
        </Descriptions.Item>
        <Descriptions.Item label="Banner Image">
          {data.banner_image?.file && (
            <Image
              width={200}
              src={URL.createObjectURL(data.banner_image.file)}
              alt="Banner"
              preview={false}
            />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Main Image">
          {data.image?.file && (
            <Image
              width={200}
              src={URL.createObjectURL(data.image.file)}
              alt="Main"
              preview={false}
            />
          )}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Objectives Summary</Divider>
      <List
        bordered
        dataSource={data.objectives_summary}
        renderItem={item => <List.Item>{item}</List.Item>}
      />

      <Divider orientation="left">Features</Divider>
      <List
        bordered
        dataSource={data.feature_json}
        renderItem={item => <List.Item>{item}</List.Item>}
      />

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
          Please review all course details before proceeding to chapters
        </Text>
        <Button 
          type="primary" 
          size="large"
          onClick={() => handleSubmit(data)}
          loading={loading}
        >
          {loading ? 'Submitting...' : 'Proceed to Review Chapters'}
        </Button>
      </div>
    </div>
  );

  const renderChapterReview = () => (
    <div style={{ padding: '24px' }}>
      <Button 
        type="default" 
        onClick={handleBackToDetails}
        style={{ marginBottom: '16px' }}
      >
        Back to Course Details
      </Button>
      
      <Title level={2} style={{ marginBottom: '24px' }}>Review Your Chapters and Topics</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {courses?.map(course => (
          <Card
            key={course.id}
            title={<Title level={4} style={{ margin: 0 }}>{course.name}</Title>}
            bordered
            style={{ width: '100%' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={course.topics}
              renderItem={topic => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: '20px' }} />}
                    title={<Text strong>{topic.name}</Text>}
                  />
                </List.Item>
              )}
            />
          </Card>
        ))}
      </Space>
      
      <Divider />
      
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
          Please review all chapters before final submission
        </Text>
        <Button 
          type="primary" 
          size="large"
          onClick={handleFinalSubmit}
          loading={loading}
        >
          Submit Course
        </Button>
      </div>
    </div>
  );

  return showChapter ? renderChapterReview() : renderCourseDetails();
};

export default React.memo(ReviewCourse);