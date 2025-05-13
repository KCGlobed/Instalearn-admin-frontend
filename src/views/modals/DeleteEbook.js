import { Button } from 'antd';
import React, { useContext, useState } from 'react';
import { ModalContext } from '../../Context';
import {  handleDeleteEbook } from '../../utils/services';
import toast from 'react-hot-toast';

const DeleteEbook = ({ fetchEbookList, ebook }) => {
    const [loading, setLoading] = useState(false);
    const { closeModal } = useContext(ModalContext);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await handleDeleteEbook(ebook.id);
            toast.success("Deleted successfully!");
            fetchEbookList();
            closeModal();
        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <p>Are you sure you want to delete this?</p>
            <div className="user_report_action_btn">
                <Button
                    type="default"
                    className="cancel_btn"
                    style={{ marginRight: 5 }}
                    onClick={closeModal}
                >
                    Cancel
                </Button>
                <Button
                    type="default"
                    className="delete_btn"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            &nbsp;Loading...
                        </>
                    ) : (
                        "Delete"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default DeleteEbook;
