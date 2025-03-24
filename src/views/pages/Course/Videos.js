import React, { useContext, useState } from "react";
import { Card, Button, Row, Col } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { ModalContext } from "../../../Context";
import { videoData } from "../../../_dummyData/videoDummyData";
import AddVideoModal from "../../modals/AddVideoModal";
import EditVideoModal from "../../modals/EditVideoModal";

const Videos = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(videoData);
    const modalContext = useContext(ModalContext);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const { handleModalData } = modalContext;

    const handleEdit = (course) => {
        setSelectedCourse(course);
        setIsEditModalVisible(true);
    };

    const handleAdd = () => {
        setIsAddModalVisible(true);
    };

    const handleSearch = () => {
        const filtered = videoData.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div className="video-gallery-container">
            <div style={{ marginBottom: 16, display: "flex", gap: "8px" }}>
               
                <Button type="primary" onClick={handleAdd}>
                    Add Video
                </Button>
            </div>
            <Row gutter={[16, 16]}>
                {filteredData.map((video) => (
                    <Col xs={24} sm={12} md={8} key={video.key}>
                        <Card
                            hoverable
                            cover={<img alt={video.name} src={video.thumbnail} style={{ height: 200, objectFit: "cover" }} />}
                            actions={[<PlayCircleOutlined key="play" style={{ fontSize: 24 }} />]}
                        >
                            <Card.Meta title={video.name} description={video.description} />
                            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <Button type="primary" onClick={() => handleEdit(video)}>Edit</Button>
        <Button type="primary" onClick={() => handleDelete(video)}>Delete</Button>
    </div>
                        </Card>
                    </Col>
                ))}
            </Row>
            <AddVideoModal visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} />
            <EditVideoModal visible={isEditModalVisible} selectedCourse={selectedCourse} onCancel={() => setIsEditModalVisible(false)} />
        </div>
    );
};

export default Videos;
