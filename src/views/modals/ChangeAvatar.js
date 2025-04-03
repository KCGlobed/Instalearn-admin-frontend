import { useContext, useState, useEffect } from "react";
import { Upload, Button, Form, Avatar, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { handleChangeAvatarApi } from "../../utils/services";
import toast from "react-hot-toast";
import { ModalContext } from "../../Context";

const ChangeAvatar = ({ currentAvatar, handleGetProfile }) => {
  const [preview, setPreview] = useState(currentAvatar);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { closeModal } = useContext(ModalContext);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    const isSmallEnough = file.size / 1024 / 1024 < 2; // 2MB max

    if (!isImage) message.error("You can only upload image files!");
    if (!isSmallEnough) message.error("Image must be smaller than 2MB!");

    return isImage && isSmallEnough;
  };

  const handleChange = (info) => {
    const file = info.file.originFileObj || info.file;
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      await handleChangeAvatarApi(formData);
      handleGetProfile();
      toast.success("Avatar updated successfully!");
      closeModal();
    } catch (error) {
      toast.error("Failed to update avatar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} className="avtar_img">
      <h2 className="text-xl font-semibold mb-4">Change Avatar</h2>

      <div className="">
        <Avatar src={preview} size={128} className="mb-4" />

        <Form.Item>
          <Upload beforeUpload={beforeUpload} showUploadList={false} onChange={handleChange}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading}>
            {loading ? <Spin size="small" /> : "Upload"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ChangeAvatar;
