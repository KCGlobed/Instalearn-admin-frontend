// import React, { useContext, useState } from "react";
// import { Table, Button, Input, Descriptions, Switch } from "antd";
// import { jsPDF } from "jspdf";
// import * as XLSX from "xlsx";
// import { ModalContext } from "../../../Context";

// import { initialData } from "../../../_dummyData/userReport";
//  import AddTopicModal from "../../modals/AddTopicModal";
//  import EditTopicModal from "../../modals/EditTopicModal";



// const Topic = () => {
//     const [sortedInfo, setSortedInfo] = useState({});
//     const [searchText, setSearchText] = useState("");
//     const [filteredData, setFilteredData] = useState(initialData);
//     const modalContext = useContext(ModalContext);
//     const [isAddModalVisible, setIsAddModalVisible] = useState(false);
//     const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//     const [selectedCourse, setSelectedCourse] = useState(null);
//     const { handleModalData } = modalContext;
//     const [isActive, setIsActive] = useState(true);
//     const [data, setData] = useState(initialData);

//     const handleToggle = (key) => {
//         const updatedData = data.map((item) =>
//             item.key === key ? { ...item, isActive: !item.isActive } : item
//         );
//         setData(updatedData);
//     };


//     const handleDelete = (data) => {
//         const addCollateral = "Hello"
//         handleModalData(addCollateral, "md")

//     }
  
//     const handleEdit = (course) => {
//         setSelectedCourse(course);
//         setIsEditModalVisible(true);
//     };

//     const handleAdd = () => {
//         setIsAddModalVisible(true);
//     };
    
    


//     const handleChange = (pagination, filters, sorter) => {
//         setSortedInfo(sorter);
//     };

//     const handleSearch = () => {
//         const filtered = initialData.filter((item) =>
//             Object.values(item).some((value) =>
//                 value.toString().toLowerCase().includes(searchText.toLowerCase())
//             )
//         );
//         setFilteredData(filtered);
//     };

//     const exportToPDF = () => {
//         const doc = new jsPDF();
//         let y = 10;
//         doc.text("Fancy Table Data", 10, y);
//         y += 10;
//         filteredData.forEach((item) => {
//             doc.text(`${item.name}, ${item.age}, ${item.address}`, 10, y);
//             y += 10;
//         });
//         doc.save("table_data.pdf");
//     };

//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(filteredData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//         XLSX.writeFile(workbook, "table_data.xlsx");
//     };

//     const columns = [
//         { title: "ID", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name), width: 150 },
//         { title: "Topic Name", dataIndex: "age", key: "age", width: 100, sorter: (a, b) => a.age - b.age },
//         { title: "Course Name", dataIndex: "email", key: "email", width: 150 },
//         { title: "Sub Category", dataIndex: "email", key: "email", width: 150 },
//         { title: "Category", dataIndex: "email", key: "email", width: 150 },
//         { title: "Status", dataIndex: "ph_number", key: "ph_number", width: 150 },
       
//         { title: "Create Date", dataIndex: "city", key: "city", width: 150 },
//         { title: "Update Date", dataIndex: "state", key: "state", width: 150 },
       
       
       

//         {
//             title: "Actions",
//             key: "actions",
//             render: (item) => (
//                 <div className="action-buttons">
                
//                     <Button type="dashed" className="edit-btn" onClick={() => handleEdit(item)}>
//                         Edit
//                     </Button>
//                     <Button type="dashed" className="edit-btn">
//                         Delete
//                     </Button>
                  
                
//                 </div>
//             ),
//             fixed: "right"

//         },
//     ];


//     return (
//         <div className="fancy-table-container">
//             <div style={{ marginBottom: 16, display: "flex", gap: "8px" }}>
//                 <Input
//                     placeholder="Search in all fields"
//                     value={searchText}
//                     onChange={(e) => setSearchText(e.target.value)}
//                     onPressEnter={handleSearch}
//                 />
//                 <Button type="primary" onClick={handleSearch}>
//                     Search
//                 </Button>
//                 <Button type="default" onClick={exportToPDF}>
//                     Download PDF
//                 </Button>
//                 <Button type="default" onClick={exportToExcel}>
//                     Download Excel
//                 </Button>
//                 <Button type="default" onClick={handleAdd}>
//                     Create Topic
//                 </Button>
//             </div>
//             <Table
//                 columns={columns}
//                 dataSource={filteredData}
//                 onChange={handleChange}
//                 className="fancy-table"
//                 scroll={{ x: 'max-content', y: 500 }}
//             />
//             <AddTopicModal visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} />
//             <EditTopicModal visible={isEditModalVisible} selectedCourse={selectedCourse} onCancel={() => setIsEditModalVisible(false)} />
//         </div>
//     );
// };

// export default Topic;







// import React, { useState, useContext } from "react";
// import { Table, Button, Input, Card, Tag } from "antd";
// import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
// import { CSS } from '@dnd-kit/utilities';
// import { ModalContext } from "../../../Context";
// import { initialData } from "../../../_dummyData/userReport";
// import AddTopicModal from "../../modals/AddTopicModal";
// import EditTopicModal from "../../modals/EditTopicModal";

// const Topic = () => {
//   const [sortedInfo, setSortedInfo] = useState({});
//   const [searchText, setSearchText] = useState("");
//   const [filteredData, setFilteredData] = useState(initialData);
//   const modalContext = useContext(ModalContext);
//   const [isAddModalVisible, setIsAddModalVisible] = useState(false);
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const { handleModalData } = modalContext;
//   const [data, setData] = useState(initialData);
//   const [activeColumn, setActiveColumn] = useState(null);

//   // All possible columns (excluding actions)
//   const allColumns = [
//     { key: 'name', title: "ID", dataIndex: "name", width: 150, sorter: (a, b) => a.name.localeCompare(b.name) },
//     { key: 'age', title: "Topic Name", dataIndex: "age", width: 100, sorter: (a, b) => a.age - b.age },
//     { key: 'email', title: "Course Name", dataIndex: "email", width: 150 },
//     { key: 'subCategory', title: "Sub Category", dataIndex: "subCategory", width: 150 },
//     { key: 'category', title: "Category", dataIndex: "category", width: 150 },
//     { key: 'status', title: "Status", dataIndex: "status", width: 150 },
//     { key: 'createDate', title: "Create Date", dataIndex: "createDate", width: 150 },
//     { key: 'updateDate', title: "Update Date", dataIndex: "updateDate", width: 150 },
//   ];

//   const actionColumn = {
//     key: 'actions',
//     title: "Actions",
//     fixed: "right",
//     render: (item) => (
//       <div className="action-buttons">
//         <Button type="dashed" onClick={() => handleEdit(item)}>
//           Edit
//         </Button>
//         <Button type="dashed" danger onClick={() => handleDelete(item)}>
//           Delete
//         </Button>
//       </div>
//     ),
//   };

//   const [tableColumns, setTableColumns] = useState([...allColumns]);
//   const [availableColumns, setAvailableColumns] = useState([]);

//   const handleDelete = (data) => {
//     const addCollateral = "Hello";
//     handleModalData(addCollateral, "md");
//   };

//   const handleEdit = (course) => {
//     setSelectedCourse(course);
//     setIsEditModalVisible(true);
//   };

//   const handleAdd = () => {
//     setIsAddModalVisible(true);
//   };

//   const handleChange = (pagination, filters, sorter) => {
//     setSortedInfo(sorter);
//   };

//   const handleSearch = () => {
//     const filtered = initialData.filter((item) =>
//       Object.values(item).some((value) =>
//         value.toString().toLowerCase().includes(searchText.toLowerCase())
//       )
//     );
//     setFilteredData(filtered);
//   };

//   const handleDragStart = (event) => {
//     setActiveColumn(event.active.id);
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
    
//     if (!over) {
//       setActiveColumn(null);
//       return;
//     }

//     if (over.id === 'available-columns-area') {
//       // Moving from table to available columns
//       const columnToRemove = tableColumns.find(col => col.key === active.id);
//       if (columnToRemove) {
//         setTableColumns(tableColumns.filter(col => col.key !== active.id));
//         setAvailableColumns([...availableColumns, columnToRemove]);
//       }
//     } else if (over.id === 'table-columns-area') {
//       // Moving from available columns to table
//       const columnToAdd = availableColumns.find(col => col.key === active.id);
//       if (columnToAdd) {
//         setAvailableColumns(availableColumns.filter(col => col.key !== active.id));
//         setTableColumns([...tableColumns, columnToAdd]);
//       }
//     } else if (active.id !== over.id) {
//       // Reordering within the table
//       const oldIndex = tableColumns.findIndex(col => col.key === active.id);
//       const newIndex = tableColumns.findIndex(col => col.key === over.id);
      
//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newColumns = [...tableColumns];
//         const [removed] = newColumns.splice(oldIndex, 1);
//         newColumns.splice(newIndex, 0, removed);
//         setTableColumns(newColumns);
//       }
//     }
    
//     setActiveColumn(null);
//   };

//   const DraggableHeader = ({ column }) => {
//     const { attributes, listeners, setNodeRef, transform } = useDraggable({
//       id: column.key,
//     });

//     const style = {
//       cursor: 'move',
//       transform: CSS.Translate.toString(transform),
//     };

//     return (
//       <th 
//         ref={setNodeRef}
//         style={style}
//         {...listeners}
//         {...attributes}
//         className="ant-table-cell"
//       >
//         {column.title}
//       </th>
//     );
//   };

//   const DraggableColumnTag = ({ column }) => {
//     const { attributes, listeners, setNodeRef } = useDraggable({
//       id: column.key,
//     });

//     return (
//       <div ref={setNodeRef} {...listeners} {...attributes}>
//         <Tag style={{ 
//           cursor: 'move', 
//           margin: '4px',
//           backgroundColor: '#f0f0f0'
//         }}>
//           {column.title}
//         </Tag>
//       </div>
//     );
//   };

//   const DroppableArea = ({ id, children }) => {
//     const { setNodeRef, isOver } = useDroppable({ id });
//     return (
//       <div 
//         ref={setNodeRef}
//         style={{
//           border: isOver ? '2px dashed #1890ff' : '1px dashed #d9d9d9',
//           padding: '10px',
//           borderRadius: '4px',
//           minHeight: '60px',
//           backgroundColor: isOver ? '#f0f9ff' : 'transparent'
//         }}
//       >
//         {children}
//       </div>
//     );
//   };

//   const renderHeader = (props) => {
    
//     if (!props.column) {
//       return <th {...props} className="ant-table-cell" />;
//     }

//     if (props.column.key === 'actions') {
//       return <th {...props} className="ant-table-cell" />;
//     }
  

//     const column = tableColumns.find(col => col.key === props.column.key);
    
 
//     if (!column) {
//       return <th {...props} className="ant-table-cell" />;
//     }
  
   
//     return <DraggableHeader column={column} />;
//   };

//   return (
//     <div className="fancy-table-container">
//     <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//         {/* Column Management Section */}
//         <Card title="Manage Columns" style={{ marginBottom: 20 }}>
//           <div style={{ display: 'flex', gap: '20px' }}>
//             {/* Available Columns Section */}
//             <div style={{ flex: 1 }}>
//               <h4>Available Columns</h4>
//               <DroppableArea id="available-columns-area">
//                 <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                   {availableColumns.map(column => (
//                     <DraggableColumnTag key={`available-${column.key}`} column={column} />
//                   ))}
//                   {availableColumns.length === 0 && (
//                     <div style={{ color: '#999', padding: '8px' }}>
//                       Drag columns here to remove from table
//                     </div>
//                   )}
//                 </div>
//               </DroppableArea>
//             </div>

//             {/* Table Columns Preview */}
//             <div style={{ flex: 1 }}>
//               <h4>Table Columns</h4>
//               <DroppableArea id="table-columns-area">
//                 <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                   {tableColumns.map(column => (
//                     <DraggableColumnTag key={`table-${column.key}`} column={column} />
//                   ))}
//                 </div>
//               </DroppableArea>
//             </div>
//           </div>
//         </Card>

//         {/* Search and Action Buttons */}
//         <div style={{ marginBottom: 16, display: "flex", gap: "8px" }}>
//           <Input
//             placeholder="Search in all fields"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             onPressEnter={handleSearch}
//           />
//           <Button type="primary" onClick={handleSearch}>
//             Search
//           </Button>
//           <Button type="default" onClick={handleAdd}>
//             Create Topic
//           </Button>
//         </div>

//         {/* The Actual Table */}
//         <Table
//           columns={[...tableColumns, actionColumn]}
//           dataSource={filteredData}
//           onChange={handleChange}
//           className="fancy-table"
//           scroll={{ x: 'max-content', y: 500 }}
//           components={{
//             header: {
//               cell: renderHeader,
//             },
//           }}
//         />

//         <DragOverlay>
//           {activeColumn ? (
//             <Tag style={{ 
//               background: '#fff',
//               padding: '10px',
//               boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
//               border: '1px solid #d9d9d9',
//               borderRadius: '4px'
//             }}>
//               {[...tableColumns, ...availableColumns].find(col => col.key === activeColumn)?.title}
//             </Tag>
//           ) : null}
//         </DragOverlay>
//       </DndContext>

//       <AddTopicModal visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} />
//       <EditTopicModal visible={isEditModalVisible} selectedCourse={selectedCourse} onCancel={() => setIsEditModalVisible(false)} />
//     </div>
//   );
// };

// export default Topic;







import React, { useState, useContext } from "react";
import { Table, Button, Input, Card, Tag } from "antd";
import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ModalContext } from "../../../Context";
import { initialData } from "../../../_dummyData/userReport";
import AddTopicModal from "../../modals/AddTopicModal";
import EditTopicModal from "../../modals/EditTopicModal";

const Topic = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);
  const modalContext = useContext(ModalContext);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { handleModalData } = modalContext;
  const [data, setData] = useState(initialData);
  const [activeColumn, setActiveColumn] = useState(null);

  // All possible columns
  const allColumns = [
    { key: 'name', title: "ID", dataIndex: "name", width: 150, sorter: (a, b) => a.name.localeCompare(b.name) },
    { key: 'age', title: "Topic Name", dataIndex: "age", width: 100, sorter: (a, b) => a.age - b.age },
    { key: 'email', title: "Course Name", dataIndex: "email", width: 150 },
    { key: 'subCategory', title: "Sub Category", dataIndex: "subCategory", width: 150 },
    { key: 'category', title: "Category", dataIndex: "category", width: 150 },
    { key: 'status', title: "Status", dataIndex: "status", width: 150 },
    { key: 'createDate', title: "Create Date", dataIndex: "createDate", width: 150 },
    { key: 'updateDate', title: "Update Date", dataIndex: "updateDate", width: 150 },
  ];

  const actionColumn = {
    key: 'actions',
    title: "Actions",
    fixed: "right",
    render: (item) => (
      <div className="action-buttons">
        <Button type="dashed" onClick={() => handleEdit(item)}>
          Edit
        </Button>
        <Button type="dashed" danger onClick={() => handleDelete(item)}>
          Delete
        </Button>
      </div>
    ),
  };

  const [columns, setColumns] = useState([...allColumns]);
  const [availableColumns, setAvailableColumns] = useState([]);

  const handleDelete = (data) => {
    const addCollateral = "Hello";
    handleModalData(addCollateral, "md");
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsEditModalVisible(true);
  };

  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const handleSearch = () => {
    const filtered = initialData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleDragStart = (event) => {
    setActiveColumn(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveColumn(null);
      return;
    }

    if (over.id === 'available-columns-area') {
      // Moving from table to available columns
      const columnToRemove = columns.find(col => col.key === active.id);
      if (columnToRemove) {
        setColumns(columns.filter(col => col.key !== active.id));
        setAvailableColumns([...availableColumns, columnToRemove]);
      }
    } else if (over.id === 'table-columns-area') {
      // Moving from available columns to table
      const columnToAdd = availableColumns.find(col => col.key === active.id);
      if (columnToAdd) {
        setAvailableColumns(availableColumns.filter(col => col.key !== active.id));
        setColumns([...columns, columnToAdd]);
      }
    } else if (active.id !== over.id) {
      // Reordering within the table
      const oldIndex = columns.findIndex(col => col.key === active.id);
      const newIndex = columns.findIndex(col => col.key === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newColumns = [...columns];
        const [removed] = newColumns.splice(oldIndex, 1);
        newColumns.splice(newIndex, 0, removed);
        setColumns(newColumns);
      }
    }
    
    setActiveColumn(null);
  };

  const DraggableHeader = ({ column }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: column.key,
    });

    const style = {
      cursor: 'move',
      transform: CSS.Translate.toString(transform),
    };

    return (
      <th 
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="ant-table-cell"
      >
        {column.title}
      </th>
    );
  };

  const DraggableColumnTag = ({ column }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: column.key,
    });

    return (
      <div ref={setNodeRef} {...listeners} {...attributes}>
        <Tag style={{ 
          cursor: 'move', 
          margin: '4px',
          backgroundColor: '#f0f0f0'
        }}>
          {column.title}
        </Tag>
      </div>
    );
  };

  const DroppableArea = ({ id, children }) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
      <div 
        ref={setNodeRef}
        style={{
          border: isOver ? '2px dashed #1890ff' : '1px dashed #d9d9d9',
          padding: '10px',
          borderRadius: '4px',
          minHeight: '60px',
          backgroundColor: isOver ? '#f0f9ff' : 'transparent'
        }}
      >
        {children}
      </div>
    );
  };

  const renderHeader = (props) => {
    if (!props.column) {
      return <th {...props} className="ant-table-cell" />;
    }

    if (props.column.key === 'actions') {
      return <th {...props} className="ant-table-cell" />;
    }

    const column = columns.find(col => col.key === props.column.key);
    
    if (!column) {
      return <th {...props} className="ant-table-cell" />;
    }
  
    return <DraggableHeader column={column} />;
  };

  return (
    <div className="fancy-table-container">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Column Management Section */}
        <Card title="Manage Columns" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Available Columns Section */}
            <div style={{ flex: 1 }}>
              <h4>Available Columns</h4>
              <DroppableArea id="available-columns-area">
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {availableColumns.map(column => (
                    <DraggableColumnTag key={`available-${column.key}`} column={column} />
                  ))}
                  {availableColumns.length === 0 && (
                    <div style={{ color: '#999', padding: '8px' }}>
                      Drag columns here to remove from table
                    </div>
                  )}
                </div>
              </DroppableArea>
            </div>

            {/* Table Columns Preview */}
            <div style={{ flex: 1 }}>
              <h4>Table Columns</h4>
              <DroppableArea id="table-columns-area">
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {columns.map(column => (
                    <DraggableColumnTag key={`table-${column.key}`} column={column} />
                  ))}
                </div>
              </DroppableArea>
            </div>
          </div>
        </Card>

        {/* Search and Action Buttons */}
        <div style={{ marginBottom: 16, display: "flex", gap: "8px" }}>
          <Input
            placeholder="Search in all fields"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button type="default" onClick={handleAdd}>
            Create Topic
          </Button>
        </div>

        {/* The Actual Table - Now with draggable headers */}
        <Table
          columns={[...columns, actionColumn]}
          dataSource={filteredData}
          onChange={handleChange}
          className="fancy-table"
          scroll={{ x: 'max-content', y: 500 }}
          components={{
            header: {
              cell: renderHeader,
            },
          }}
        />

        <DragOverlay>
          {activeColumn ? (
            <Tag style={{ 
              background: '#fff',
              padding: '10px',
              boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
              border: '1px solid #d9d9d9',
              borderRadius: '4px'
            }}>
              {[...columns, ...availableColumns].find(col => col.key === activeColumn)?.title}
            </Tag>
          ) : null}
        </DragOverlay>
      </DndContext>

      <AddTopicModal visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} />
      <EditTopicModal visible={isEditModalVisible} selectedCourse={selectedCourse} onCancel={() => setIsEditModalVisible(false)} />
    </div>
  );
};

export default Topic;