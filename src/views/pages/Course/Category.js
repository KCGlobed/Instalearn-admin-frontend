import React, { useEffect, useState, useContext } from 'react'
import { Table, Button, Input, Switch } from 'antd'
import { jsPDF } from 'jspdf'
import * as XLSX from 'xlsx'
import { ModalContext } from '../../../Context'
import AddCategoryModal from '../../modals/AddCategoryModal'
import EditCategoryModal from '../../modals/EditCategoryModal'
import Swal from 'sweetalert2'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_BASE_URL

const Category = () => {
  const [searchText, setSearchText] = useState('')
  const [categories, setCategories] = useState([])
  const modalContext = useContext(ModalContext)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { handleModalData } = modalContext

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const token = localStorage.getItem('access_token')
    try {
      const response = await axios.get(`${API_BASE_URL}/content/category-listing/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCategories(response.data.results.reverse()) 
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }
  const handleToggleStatus = async (id, checked) => {
    const token = localStorage.getItem('access_token')
    const status = checked ? '1' : '0'

    try {
      const response = await axios.post(
        `${API_BASE_URL}/content/update-category-status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.data.status === 'success') {
        Swal.fire('Success!', 'Category Status Updated Successfully', 'success')
        fetchCategories()
      }
    } catch (error) {
      console.error('Error updating category status:', error)
      Swal.fire('Error!', 'Failed to update category status.', 'error')
    }
  }

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
        Swal.fire('Deleted!', 'The category has been deleted.', 'success')
        fetchCategories()
      } catch (error) {
        console.error('Error deleting category:', error)
        Swal.fire('Error!', 'Failed to delete the category.', 'error')
      }
    }
  }
  const handleSearch = () => {
    const filtered = categories.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase()),
    )
    setCategories(filtered)
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    let y = 10
    doc.text('Fancy Table Data', 10, y)
    y += 10
    categories.forEach((item) => {
      doc.text(`${item.name}, ${item.description}`, 10, y)
      y += 10
    })
    doc.save('table_data.pdf')
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(categories)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, 'table_data.xlsx')
  }

  const columns = [
    { title: 'Category Name', dataIndex: 'name', key: 'name', width: 200 },
    { title: 'Description', dataIndex: 'description', key: 'description', width: 400 },
    {
      title: 'Status',
      key: 'active',
      width: 150,
      render: (item) => (
        <div className="switch_item">
          <Switch
            checked={item.visible === 1}
            onChange={(checked) => handleToggleStatus(item.id, checked)}
          />
        </div>
      ),
    },

    {
      title: 'Actions',
      key: 'actions',
      render: (item) => (
        <div className="action-buttons">
          <Button type="dashed" className="edit-btn" onClick={() => handleEdit(item)}>
            Edit
          </Button>
          <Button type="dashed" className="edit-btn" onClick={() => handleDelete(item.id)}>
            Delete
          </Button>
        </div>
      ),
      fixed: 'right',
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
          placeholder="Search in all fields"
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
          Create Category
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={categories}
        className="fancy-table"
        scroll={{ x: 'max-content', y: 500 }}
      />
      <AddCategoryModal
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        refreshCategories={fetchCategories}
      />
      <EditCategoryModal
        visible={isEditModalVisible}
        selectedCourse={selectedCourse}
        onCancel={() => setIsEditModalVisible(false)}
        refreshCategories={fetchCategories}
      />
    </div>
  )
}

export default Category
