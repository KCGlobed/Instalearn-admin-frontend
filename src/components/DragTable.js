import React, { useState, cloneElement, useEffect } from "react";

import { HolderOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Table } from "antd";
import { handleChapterListApi } from "../utils/services";

const columns = [
  {
    key: "sort"
  },
  {
    key: "rank",
    title: "Rank",
    render: (item, record, index) => item.id
  },
  {
    title: "Optimisation Strategy",
    dataIndex: "optimisationStrategy"
  },
  {
    title: "Title",
    dataIndex: "name",
    key: "name",
    width: 150
},
{
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 200
},
{
    title: "Created At",
    dataIndex: "create_at",
    key: "create_at"
},
{
    title: "Update Date",
    dataIndex: "ph_number",
    key: "ph_number"
},
];

const Row = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: props["data-row-key"]
  });

  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1
      }
    )?.replace(/translate3d\(([^,]+),/, "translate3d(0,"),
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999
        }
      : {})
  };

  return (
    
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        
      {children && children?.map((child) => {
        if (child.key === "sort") {
          return cloneElement(child, {
            children: (
              <HolderOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: "none",
                  cursor: "pointer"
                }}
                {...listeners}
              />
            )
          });
        }
        return child;
      })}
    </tr>
  );
};

const DragTable = ({}) => {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      optimisationStrategy: "Split"
    },
    {
      key: "2",
      optimisationStrategy: "Priority"
    },
    {
      key: "3",
      optimisationStrategy: "Speed"
    }
  ]);

  const handleChapter = async () => {
    let result = await handleChapterListApi();
    setDataSource(result?.res?.results)
    console.log(result?.res?.results)
}


useEffect(() => {
    handleChapter()
}, [])

//   console.log(dataSource, "dataSource");

  const onDragEnd = ({ active, over }) => {
     console.log(active,over,"check")
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.id === active.id);
        const overIndex = previous.findIndex((i) => i.id === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext
        // rowKey array
        items={dataSource.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          components={{
            body: {
              row: Row
            }
          }}
          rowKey="id"
          columns={columns}
          dataSource={dataSource}
          pagination={true}
        />
      </SortableContext>
    </DndContext>
  );
};
export default DragTable;
