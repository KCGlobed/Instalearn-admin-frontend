import React, { useEffect, useState } from 'react'
import { handleUserPermissionApi } from '../../utils/services'
import { Checkbox, Spin } from 'antd'

const PermissionModal = () => {
    const [permissionData, setPermissionData] = useState({})
    const [loading, setLoading] = useState(false)

    const handlePermission = async () => {
        setLoading(true)
        try {
            const result = await handleUserPermissionApi()
            setPermissionData(result.res.data)
        } catch (error) {
            console.error("Error fetching permissions:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handlePermission()
    }, [])

    return (
        <div>
            {loading ? (
                <div style={{ textAlign: 'center', padding: '30px' }}>
                    <Spin tip="Loading permissions..." size="large" />
                </div>
            ) : (
                <div className='manage_staff_permission'>
                    {Object.keys(permissionData).map((key) => (
                        <div key={key}>
                            <Checkbox
                                checked={permissionData[key]}
                                style={{
                                    transition: '0.3s ease',
                                    padding: '10px',
                                    borderRadius: '8px',
                                }}
                                className="permission-checkbox"
                                disabled={true}
                            >
                                <span style={{ textTransform: 'capitalize' }}>
                                    {key.replace(/_/g, ' ')}
                                </span>
                            </Checkbox>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PermissionModal
