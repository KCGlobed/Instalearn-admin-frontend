import React, { useEffect, useState, useContext } from 'react'
import { Table, Button, Input, Switch, Spin, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { jsPDF } from 'jspdf'
import * as XLSX from 'xlsx'
import { ModalContext } from '../../../Context'
import AddSubCategoryModal from '../../modals/AddSubCategoryModal'
import EditSubCategoryModal from '../../modals/EditSubCategoryModal'
import Swal from 'sweetalert2'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_BASE_URL

const SubCategory = () => {
  const [searchText, setSearchText] = useState('')
  const [subCategories, setSubCategories] = useState([])
  const modalContext = useContext(ModalContext)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { handleModalData } = modalContext
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSubCategories()
  }, [])

  // Fetch Sub Categories
  const fetchSubCategories = async () => {
    setLoading(true)
    const token = localStorage.getItem('access_token')
    try {
      const response = await axios.get(`${API_BASE_URL}/content/sub-category-listing/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSubCategories(response.data.results.reverse())
    } catch (error) {
      console.error('Error fetching subcategories:', error)
    } finally {
      setLoading(false)
    }
  }

  // Toggle Sub Category Status
  const handleToggleStatus = async (id, checked) => {
    const token = localStorage.getItem('access_token')
    const status = checked ? '1' : '0'

    try {
      const response = await axios.post(
        `${API_BASE_URL}/content/update-category-status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      if (response.data.status === 'success') {
        Swal.fire('Success!', 'Sub Category Status Updated Successfully', 'success')
        fetchSubCategories()
      }
    } catch (error) {
      console.error('Error updating subcategory status:', error)
      Swal.fire('Error!', 'Failed to update subcategory status.', 'error')
    }
  }

  // Delete Sub Category
  const handleDelete = async (id) => {
    const token = localStorage.getItem('access_token')
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    })

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/content/delete-category/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        Swal.fire('Deleted!', 'The subcategory has been deleted.', 'success')
        fetchSubCategories()
      } catch (error) {
        console.error('Error deleting subcategory:', error)
        Swal.fire('Error!', 'Failed to delete the subcategory.', 'error')
      }
    }
  }

  // Search Functionality
  const handleSearch = () => {
    const filtered = subCategories.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase()) ||
        (item.parent_category?.name || '').toLowerCase().includes(searchText.toLowerCase()),
    )
    setSubCategories(filtered)
  }

  // Export Data to PDF
  const exportToPDF = () => {
    const doc = new jsPDF()
    let y = 10
    doc.text('Sub Category Data', 10, y)
    y += 10
    subCategories.forEach((item) => {
      doc.text(
        `${item.name}, ${item.description}, Parent: ${item.parent_category?.name || 'N/A'}`,
        10,
        y,
      )
      y += 10
    })
    doc.save('sub_category_data.pdf')
  }

  // Export Data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(subCategories)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, 'sub_category_data.xlsx')
  }

  // Table Columns
  const columns = [
    { title: 'Sub Category Name', dataIndex: 'name', key: 'name', width: 200 },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (text) => (
        <Tooltip title={text} overlayStyle={{ maxWidth: '400px', whiteSpace: 'pre-line' }}>
          <div
            style={{
              whiteSpace: 'pre-line',
              wordBreak: 'break-word',
              maxHeight: '3.6em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
            }}
          >
            {text.length > 100 ? text.substring(0, 100) + '...' : text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Parent Category',
      dataIndex: 'parent_category',
      key: 'parent_category',
      width: 150,
      render: (parent) => parent?.name || 'N/A',
    },
    {
      title: 'Status',
      key: 'active',
      width: 150,
      render: (item) => (
        <Switch
          checked={item.visible === 1}
          onChange={(checked) => handleToggleStatus(item.id, checked)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (item) => (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
          <Button
            type="text"
            icon={<EditOutlined style={{ color: 'black', fontSize: '16px' }} />}
            onClick={() => handleEdit(item)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: 'red', fontSize: '16px' }} />}
            onClick={() => handleDelete(item.id)}
          />
        </div>
      ),
    },
  ]

  const handleEdit = (course) => {
    setSelectedCourse(course)
    setIsEditModalVisible(true)
  }

  const handleAdd = () => {
    setIsAddModalVisible(true)
  }

  return (
    <div className="fancy-table-container">
      <div style={{ marginBottom: 16, display: 'flex', gap: '8px' }}>
        <Input
          placeholder="Search Sub Categories"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={handleSearch}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button type="default" onClick={exportToPDF}>
          Download PDF
        </Button>
        <Button type="default" onClick={exportToExcel}>
          Download Excel
        </Button>
        <Button type="default" onClick={handleAdd}>
          Create Sub Category
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={subCategories}
          rowKey="id"
          scroll={{ x: 'max-content', y: 500 }}
        />
      </Spin>

      <AddSubCategoryModal
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        refreshCategories={fetchSubCategories}
      />
      <EditSubCategoryModal
        visible={isEditModalVisible}
        selectedCourse={selectedCourse}
        onCancel={() => setIsEditModalVisible(false)}
        refreshCategories={fetchSubCategories}
      />
    </div>
  )
}

export default SubCategory
