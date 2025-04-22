import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { handleAssignchapterlistApi } from "../../../utils/services";

// 🧱 Sortable Chapter Item
const SortableItem = ({ item, isHighlighted }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms ease",
    padding: "10px",
    marginBottom: "8px",
    background: isHighlighted
      ? "linear-gradient(135deg, #d1f7c4, #a8e6cf)"
      : "#fff",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: isDragging ? "grabbing" : "grab",
    boxShadow: isDragging ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {item.name}
    </div>
  );
};

// 🧱 Droppable Course Section
const DroppableContainer = ({ id, items, highlightedId }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        padding: 16,
        border: "2px dashed #ccc",
        borderRadius: 8,
        minHeight: 300,
        background: isOver ? "#e6f7ff" : "#fefefe",
      }}
    >
      <h4 style={{ textAlign: "center" }}>{id}</h4>
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item) => (
          <SortableItem
            key={item.id}
            item={item}
            isHighlighted={item.id === highlightedId}
          />
        ))}
      </SortableContext>
    </div>
  );
};

// 🧱 Main Component
const ChapterTransfer = () => {
  const [courses, setCourses] = useState({
    "Course A": [],
    "Course B": [],
  });

  const [chapterMap, setChapterMap] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // 🔃 Simulate fetching API on mount

  useEffect(() => {
    const fetchChapters = async () => {
      const response = await handleAssignchapterlistApi();
      const apiResponse = {
        data: [
          { id: 9, name: "Accounting and Business" },
          { id: 10, name: "Accounting Principles And Assumptions" },
          { id: 12, name: "Himanshu" },
          { id: 16, name: "Himanshu" },
          { id: 14, name: "Himanshu" },
          { id: 15, name: "swn" },
          { id: 13, name: "swn" },
        ],
      };

      const allChapters = response.res.data;
      const half = Math.ceil(allChapters.length / 2);

      const courseAChapters = allChapters.slice(0, half);
      const courseBChapters = allChapters.slice(half);

      setCourses({
        "Course A": courseAChapters,
        "Course B": courseBChapters,
      });

      const map = {};
      allChapters.forEach((item) => (map[item.id] = item));
      setChapterMap(map);
    };

    fetchChapters();
  }, []);

  const findContainer = (id) => {
    return Object.keys(courses).find((key) =>
      courses[key].some((item) => item.id === id)
    );
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id) || over.id;

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      return;
    }

    if (activeContainer === overContainer) {
      const oldIndex = courses[activeContainer].findIndex(
        (item) => item.id === active.id
      );
      const newIndex = courses[overContainer].findIndex(
        (item) => item.id === over.id
      );

      const updated = {
        ...courses,
        [activeContainer]: arrayMove(
          courses[activeContainer],
          oldIndex,
          newIndex
        ),
      };

      setCourses(updated);
    } else {
      const itemToMove = chapterMap[active.id];
      const sourceList = courses[activeContainer].filter(
        (item) => item.id !== active.id
      );
      const destinationList = [...courses[overContainer], itemToMove];

      const updated = {
        ...courses,
        [activeContainer]: sourceList,
        [overContainer]: destinationList,
      };

      setCourses(updated);

      // 🎨 Highlight the newly moved item
      setHighlightedId(active.id);
      setTimeout(() => setHighlightedId(null), 3000); // remove highlight after 3s
    }

    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", gap: "20px", padding: 20 }}>
        {Object.entries(courses).map(([courseId, items]) => (
          <DroppableContainer
            key={courseId}
            id={courseId}
            items={items}
            highlightedId={highlightedId}
          />
        ))}
      </div>

      <DragOverlay>
        {activeId ? (
          <div
            style={{
              padding: 10,
              marginBottom: 8,
              background: "#fff",
              border: "1px solid #999",
              borderRadius: 6,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
              cursor: "grabbing",
              fontWeight: 500,
              opacity: 0.95,
            }}
          >
            {chapterMap[activeId]?.name}
          </div>
        ) : null}
      </DragOverlay>

      <div style={{ padding: 20 }}>
        <h4>📦 Current Course Data:</h4>
        <pre>{JSON.stringify(courses, null, 2)}</pre>
      </div>
    </DndContext>
  );
};

export default ChapterTransfer;
