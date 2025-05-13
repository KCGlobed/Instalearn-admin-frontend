import { Button } from 'antd'
import React, { useContext, useState } from 'react'
import { ModalContext } from '../../Context';
import { handleDeleteTopic } from '../../utils/services';
import toast from 'react-hot-toast';


const DeleteTopic = ({item,fetchData}) => {
    const [loading, setLoading] = useState(false)
    const modalContext = useContext(ModalContext);
    const { closeModal } = modalContext;


    const handleDelete = async () => {
        try {
            setLoading(true);
            const result = await handleDeleteTopic(item.id);
            toast.success("Deleted successfully!");
            fetchData();
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
            <p>Are you want delete this?</p>
            <div className='user_report_action_btn'>
                <Button type="default" style={{ marginRight: "5px" }} className='cancel_btn' onClick={() => closeModal()}>
                    Cancel
                </Button>
                <Button type="default" className='delete_btn' onClick={() => handleDelete()} >
                    {
                        loading ?
                            <>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </>
                            : "Delete"
                    }

                </Button>
            </div>
        </div>
    )
}

export default DeleteTopic