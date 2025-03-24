import { Button } from 'antd'
import React, { useContext } from 'react'
import { ModalContext } from '../../Context';

const DeleteUserReportModal = () => {
    const modalContext = useContext(ModalContext);
    const { closeModal } = modalContext;
    return (
        <div>
            <p>Are you want delete this ?</p>
            <div className='user_report_action_btn'>
                <Button type="default" style={{ marginRight: "5px" }} className='cancel_btn' onClick={()=>closeModal()}>
                    Cancel
                </Button>
                <Button type="default" className='delete_btn' >
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default DeleteUserReportModal