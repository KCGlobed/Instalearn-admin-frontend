import React, { useEffect, useState, useCallback } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
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
import { FiTrash2, FiMove, FiDownload, FiCornerUpLeft, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import { handleAssignchapterlistApi, handleAssignchapterTopiclistApi, handleCourseBuilderListApi, handleUpdateCourseChapterTopic } from "../../../utils/services";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// ------------------ Draggable Item ------------------
const DraggableItem = ({ item, type, idPrefix }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: `${idPrefix}-${item.id}` });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 200ms ease",
        padding: "12px 16px",
        background: type === "chapter" ? "#f0f7ff" : "#e6f7ff",
        border: "1px solid #d1e3f8",
        borderRadius: "8px",
        cursor: "grab",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {type === "chapter" ? (
                    <FaBookOpen color="#1976d2" />
                ) : (
                    <FaChalkboardTeacher color="#00acc1" />
                )}
                <span>{item.name}</span>
            </div>
            <FiMove color="#666" style={{ marginLeft: "5px" }} />
        </div>
    );
};

// ------------------ Search Bar ------------------
const SearchBar = ({ placeholder, value, onChange }) => (
    <div
        style={{
            position: "relative",
            marginBottom: "16px",
        }}
    >
        <FiSearch
            style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9e9e9e",
            }}
        />
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
                width: "242px",
                padding: "10px 16px 10px 40px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border 0.2s ease",
                ":focus": {
                    borderColor: "#1976d2",
                },
            }}
        />
    </div>
);

// ------------------ Droppable Area ------------------
const DroppableArea = ({ id, label, children, isOver }) => (
    <div
        style={{
            padding: "16px",
            border: `2px dashed ${isOver ? "#A882F8" : "#e0e0e0"}`,
            borderRadius: "12px",
            background: isOver ? "#f5f5ff" : "#fafafa",
            minHeight: "120px",
            transition: "all 0.2s ease",
        }}
    >
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                color: "#424242",
            }}
        >
            {label}
        </div>
        {children}
    </div>
);

let initialData= [
    {
        "id": 9,
        "saved_id":10,
        "name": "Accounting and Business",
        "topics": [
            {
                "id": 2,
                "saved_id":11,
                "name": "2 Horizontal Analysis"
            },
            {
                "id": 6,
                "saved_id":11,
                "name": "355 Vertical Analysis Common-Size Statements"
            }
        ]
    },
    {
        "id": 10,
        "saved_id":12,
        "name": "Accounting Principles And Assumptions",
        "topics": [
            {
                "id": 3,
                "saved_id":13,
                "name": "305 Horizontal Analysis"
            },
            {
                "id": 7,
                "saved_id":14,
                "name": "355 Vertical Analysis"
            }
        ]
    }
];

// ------------------ Main Component ------------------
export default function EditNestedCourseBuilder({ prev, onSave }) {
    const [chapters, setChapters] = useState([]);
    const [topics, setTopics] = useState([]);
    const [courseBuilder, setCourseBuilder] = useState([]);
    const [activeItem, setActiveItem] = useState(null);
    const [history, setHistory] = useState([]);
    const [chapterSearch, setChapterSearch] = useState("");
    const [topicSearch, setTopicSearch] = useState("");
    const [validationError, setValidationError] = useState("");
    const [deletedExistingChapters, setDeletedExistingChapters] = useState([]);
    const [deletedExistingTopics, setDeletedExistingTopics] = useState([]);
    const [loading, setLoading] = useState(false);  
    const { id } = useParams();

    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        const handleAssignchapterlist = async () => {
            try {
                const response = await handleAssignchapterlistApi();
                if (response?.res?.data) {
                    const filteredChapters = response.res.data.filter(chapter => 
                        !courseBuilder.some(cbChapter => cbChapter.id === chapter.id)
                    );
                    setChapters(filteredChapters);
                }
            } catch (error) {
                console.error("Failed to fetch chapter list:", error);
            }
        }

        const handleTopiclist = async () => {
            try {
                const response = await handleAssignchapterTopiclistApi();
                if (response?.res?.data) {
                    const allCourseBuilderTopics = courseBuilder.flatMap(chapter => chapter.topics);
                    const filteredTopics = response.res.data.filter(topic => 
                        !allCourseBuilderTopics.some(cbTopic => cbTopic.id === topic.id)
                    );
                    setTopics(filteredTopics);
                }
            } catch (error) {
                console.error("Failed to fetch topic list:", error);
            }
        }
        
        handleAssignchapterlist();
        handleTopiclist();
    }, [courseBuilder]);


    useEffect(()=>{
     const handleAssigCoourseBuilder = async(id) => {  
        let response = await handleCourseBuilderListApi(id);
        setCourseBuilder(response.res.data);
     }
     handleAssigCoourseBuilder(id);
    },[id]);

    const filteredChapters = chapters.filter((chapter) =>
        chapter.name.toLowerCase().includes(chapterSearch.toLowerCase())
    );

    const filteredTopics = topics.filter((topic) =>
        topic.name.toLowerCase().includes(topicSearch.toLowerCase())
    );

    const saveHistory = useCallback(() => {
        setHistory((prev) => [
            ...prev,
            {
                chapters: [...chapters],
                topics: [...topics],
                courseBuilder: JSON.parse(JSON.stringify(courseBuilder)),
                deletedExistingChapters: [...deletedExistingChapters],
                deletedExistingTopics: [...deletedExistingTopics],
            },
        ]);
    }, [chapters, topics, courseBuilder, deletedExistingChapters, deletedExistingTopics]);

    const undo = () => {
        if (history.length === 0) return;
        const last = history[history.length - 1];
        setChapters(last.chapters);
        setTopics(last.topics);
        setCourseBuilder(last.courseBuilder);
        setDeletedExistingChapters(last.deletedExistingChapters);
        setDeletedExistingTopics(last.deletedExistingTopics);
        setHistory(history.slice(0, -1));
    };

    const handleDragStart = (event) => {
        setActiveItem(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) {
            setActiveItem(null);
            return;
        }

        const [type, itemIdStr] = active.id.split("-");
        const itemId = parseInt(itemIdStr);
        const overType = over.id.split("-")[0];

        saveHistory();

        if (type === "chapter") {
            if (over.id === "Course3") {
                const existing = courseBuilder.find((ch) => ch.id === itemId);
                if (!existing) {
                    const ch = chapters.find((c) => c.id === itemId);
                    if (ch) {
                        setCourseBuilder((prev) => [
                            ...prev,
                            { id: ch.id, name: ch.name, topics: [] },
                        ]);
                        setChapters((prev) => prev.filter((c) => c.id !== itemId));
                    }
                }
            } else if (over.id.startsWith("chapter-")) {
                const oldIndex = courseBuilder.findIndex(
                    (c) => `chapter-${c.id}` === active.id
                );
                const newIndex = courseBuilder.findIndex(
                    (c) => `chapter-${c.id}` === over.id
                );
                if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                    setCourseBuilder((prev) => arrayMove(prev, oldIndex, newIndex));
                }
            } else if (over.id === "CourseA") {
                const chapterToDelete = courseBuilder.find((ch) => ch.id === itemId);
                if (chapterToDelete) {
                    // Track deleted existing chapter
                    if (chapterToDelete.saved_id) {
                        setDeletedExistingChapters(prev => [
                            ...prev,
                            { id: chapterToDelete.id, saved_id: chapterToDelete.saved_id }
                        ]);
                    }
                    
                    const topicsToRestore = chapterToDelete.topics || [];
                    // Track deleted existing topics
                    const existingTopicsToDelete = topicsToRestore.filter(t => t.saved_id);
                    if (existingTopicsToDelete.length > 0) {
                        setDeletedExistingTopics(prev => [
                            ...prev,
                            ...existingTopicsToDelete.map(t => ({ id: t.id, saved_id: t.saved_id }))
                        ]);
                    }
                    
                    setTopics((prev) => [...prev, ...topicsToRestore]);
                    setChapters((prev) => [
                        ...prev,
                        { id: chapterToDelete.id, name: chapterToDelete.name },
                    ]);
                    setCourseBuilder((prev) => prev.filter((ch) => ch.id !== itemId));
                }
            }
        } else if (type === "topic") {
            if (over.id.startsWith("ChapterBox-")) {
                const chapterId = parseInt(over.id.replace("ChapterBox-", ""));
                const topic = topics.find((t) => t.id === itemId);
                if (!topic) return;

                setCourseBuilder((prev) =>
                    prev.map((ch) =>
                        ch.id === chapterId && !ch.topics.some((t) => t.id === topic.id)
                            ? { ...ch, topics: [...ch.topics, { ...topic }] }
                            : ch
                    )
                );
                setTopics((prev) => prev.filter((t) => t.id !== itemId));
            } else if (over.id === "CourseB") {
                const topicToDelete = courseBuilder
                    .flatMap((ch) => ch.topics)
                    .find((t) => t.id === itemId);
                if (topicToDelete) {
                    // Track deleted existing topic
                    if (topicToDelete.saved_id) {
                        setDeletedExistingTopics(prev => [
                            ...prev,
                            { id: topicToDelete.id, saved_id: topicToDelete.saved_id }
                        ]);
                    }
                    
                    setTopics((prev) => [
                        ...prev,
                        { id: topicToDelete.id, name: topicToDelete.name },
                    ]);
                    setCourseBuilder((prev) =>
                        prev.map((ch) => ({
                            ...ch,
                            topics: ch.topics.filter((t) => t.id !== itemId),
                        }))
                    );
                }
            } else if (overType === "topic" && active.id !== over.id) {
                const chapter = courseBuilder.find((ch) =>
                    ch.topics.some((t) => `topic-${t.id}` === active.id)
                );
                if (chapter) {
                    const oldIndex = chapter.topics.findIndex(
                        (t) => `topic-${t.id}` === active.id
                    );
                    const newIndex = chapter.topics.findIndex(
                        (t) => `topic-${t.id}` === over.id
                    );
                    if (oldIndex !== -1 && newIndex !== -1) {
                        setCourseBuilder((prev) =>
                            prev.map((ch) =>
                                ch.id === chapter.id
                                    ? {
                                        ...ch,
                                        topics: arrayMove(ch.topics, oldIndex, newIndex),
                                    }
                                    : ch
                            )
                        );
                    }
                }
            }
        }

        setActiveItem(null);
    };

    const handleDelete = (itemId, type) => {
        saveHistory();

        if (type === "chapter") {
            const chapterToDelete = courseBuilder.find((ch) => ch.id === itemId);
            if (chapterToDelete) {
                // Track deleted existing chapter
                if (chapterToDelete.saved_id) {
                    setDeletedExistingChapters(prev => [
                        ...prev,
                        { id: chapterToDelete.id, saved_id: chapterToDelete.saved_id }
                    ]);
                }
                
                const topicsToRestore = chapterToDelete.topics || [];
                // Track deleted existing topics
                const existingTopicsToDelete = topicsToRestore.filter(t => t.saved_id);
                if (existingTopicsToDelete.length > 0) {
                    setDeletedExistingTopics(prev => [
                        ...prev,
                        ...existingTopicsToDelete.map(t => ({ id: t.id, saved_id: t.saved_id }))
                    ]);
                }
                
                setTopics((prev) => [...prev, ...topicsToRestore]);
                setChapters((prev) => [
                    ...prev,
                    { id: chapterToDelete.id, name: chapterToDelete.name },
                ]);
                setCourseBuilder((prev) => prev.filter((ch) => ch.id !== itemId));
            }
        } else if (type === "topic") {
            const topicToDelete = courseBuilder
                .flatMap((ch) => ch.topics)
                .find((t) => t.id === itemId);
            if (topicToDelete) {
                // Track deleted existing topic
                if (topicToDelete.saved_id) {
                    setDeletedExistingTopics(prev => [
                        ...prev,
                        { id: topicToDelete.id, saved_id: topicToDelete.saved_id }
                    ]);
                }
                
                setTopics((prev) => [
                    ...prev,
                    { id: topicToDelete.id, name: topicToDelete.name },
                ]);
                setCourseBuilder((prev) =>
                    prev.map((ch) => ({
                        ...ch,
                        topics: ch.topics.filter((t) => t.id !== itemId),
                    }))
                );
            }
        }
    };

    const exportJSON = () => {
        const json = JSON.stringify({
            course_structure: courseBuilder,
            deleted_existing_chapters: deletedExistingChapters,
            deleted_existing_topics: deletedExistingTopics
        }, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "course-builder.json";
        a.click();
    };

    const validateCourseStructure = () => {
        if (courseBuilder.length === 0) {
            setValidationError("Please add at least one chapter to the course");
            return false;
        }

        const emptyChapters = courseBuilder.filter(chapter => chapter.topics.length === 0);
        if (emptyChapters.length > 0) {
            setValidationError(`Chapter "${emptyChapters[0].name}" has no topics. Please add at least one topic to each chapter.`);
            return false;
        }

        setValidationError("");
        return true;
    };

    const handleNext = async () => {
      
        if (validateCourseStructure()) {
            const dataToSend = {
                course_structure: courseBuilder,
                deleted_existing_chapters: deletedExistingChapters,
                deleted_existing_topics: deletedExistingTopics
            };
           
            try {
                setLoading(true);
                await handleUpdateCourseChapterTopic({ 
                    course_id: id, 
                    chapter_topic_list: { ...dataToSend } 
                });
                toast.success("Course Updated successfully!");
            } catch (error) {
                console.error("Error updating course chapter/topic:", error);
            }finally {
                setLoading(false);
              }
            
        }
    };
    

    return (
        <div style={{ maxWidth: "1400px", margin: "0 auto",}}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr 1fr",
                        gap: "24px",
                        height: "70vh",
                    }}
                >
                    {/* Chapters Section */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        <DroppableWrapper
                            id="CourseA"
                            label={
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <FaBookOpen color="#1976d2" />
                                    <span>Available Chapters</span>
                                </div>
                            }
                            items={filteredChapters}
                            type="chapter"
                            searchBar={
                                <SearchBar
                                    placeholder="Search chapters..."
                                    value={chapterSearch}
                                    onChange={(e) => setChapterSearch(e.target.value)}
                                />
                            }
                        />
                    </div>

                    {/* Course Builder Section */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        <DroppableCourseBuilder
                            id="Course3"
                            items={courseBuilder}
                            label={
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <FaBookOpen color="#1976d2" />
                                    <span>Course Structure</span>
                                </div>
                            }
                            onDelete={handleDelete}
                        />

                        {validationError && (
                            <div style={{
                                color: "#d32f2f",
                                padding: "10px 16px",
                                backgroundColor: "#ffebee",
                                borderRadius: "4px",
                                display: "flex",
                                alignItems: "center",
                                marginTop: "16px",
                            }}>
                                {validationError}
                            </div>
                        )}
                    </div>

                    {/* Topics Section */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        <DroppableWrapper
                            id="CourseB"
                            label={
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <FaChalkboardTeacher color="#00acc1" />
                                    <span>Available Topics</span>
                                </div>
                            }
                            items={filteredTopics}
                            type="topic"
                            searchBar={
                                <SearchBar
                                    placeholder="Search topics..."
                                    value={topicSearch}
                                    onChange={(e) => setTopicSearch(e.target.value)}
                                />
                            }
                        />
                    </div>
                </div>

                <DragOverlay>
                    {activeItem ? (
                        <div
                            style={{
                                padding: "16px",
                                background: "#fff",
                                border: "1px solid #d1e3f8",
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                width: "240px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                {activeItem.startsWith("chapter-") ? (
                                    <FaBookOpen color="#1976d2" />
                                ) : (
                                    <FaChalkboardTeacher color="#00acc1" />
                                )}
                                <span>
                                    {activeItem.startsWith("chapter-")
                                        ? chapters.find((c) => `chapter-${c.id}` === activeItem)
                                            ?.name ||
                                        courseBuilder.find((c) => `chapter-${c.id}` === activeItem)
                                            ?.name
                                        : topics.find((t) => `topic-${t.id}` === activeItem)?.name ||
                                        courseBuilder
                                            .flatMap((ch) => ch.topics)
                                            .find((t) => `topic-${t.id}` === activeItem)?.name}
                                </span>
                            </div>
                            <FiMove color="#666" />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>

            {/* Navigation Buttons */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "24px",
                padding: "16px",
            }}>
                {/* <button
                    onClick={prev}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 20px",
                        backgroundColor: "#f5f5f5",
                        color: "#424242",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        ":hover": {
                            backgroundColor: "#e0e0e0"
                        }
                    }}
                >
                    <FiChevronLeft />
                    Back
                </button> */}
                <div></div>

                <div style={{ display: "flex", gap: "16px" }}>
                    <button
                        onClick={undo}
                        disabled={history.length === 0}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 20px",
                            backgroundColor: history.length === 0 ? "#e0e0e0" : "#f5f5f5",
                            color: history.length === 0 ? "#9e9e9e" : "#424242",
                            border: "none",
                            borderRadius: "6px",
                            cursor: history.length === 0 ? "not-allowed" : "pointer",
                            transition: "all 0.2s ease",
                            ":hover": {
                                backgroundColor: history.length === 0 ? "#e0e0e0" : "#e0e0e0"
                            }
                        }}
                    >
                        <FiCornerUpLeft />
                        Undo
                    </button>

                    {/* <button
                        onClick={exportJSON}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 20px",
                            backgroundColor: "#e3f2fd",
                            color: "#1976d2",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            ":hover": {
                                backgroundColor: "#bbdefb"
                            }
                        }}
                    >
                        <FiDownload />
                        Export
                    </button> */}

                    <button
                        onClick={handleNext}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 20px",
                            backgroundColor: "#1976d2",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            ":hover": {
                                backgroundColor: "#1565c0"
                            }
                        }}
                    >
                        {
                            loading ? (
                                <> loading ... </>
                            ) : (
                                <>
                                    Update
                                </>
                            )
                        }
                       
                    </button>
                </div>
            </div>
        </div>
    );
}

// ------------------ Droppable List Wrapper ------------------
const DroppableWrapper = ({ id, label, items, type, searchBar }) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <DroppableArea id={id} label={label} isOver={isOver}>
                {searchBar}
                <div style={{ overflowY: "auto", maxHeight: "calc(70vh - 150px)" }}>
                    <SortableContext
                        items={items.map((i) => `${type}-${i.id}`)}
                        strategy={verticalListSortingStrategy}
                    >
                        {items.length > 0 ? (
                            items.map((item) => (
                                <DraggableItem
                                    key={item.id}
                                    item={item}
                                    type={type}
                                    idPrefix={type}
                                />
                            ))
                        ) : (
                            <div
                                style={{
                                    padding: "16px",
                                    textAlign: "center",
                                    color: "#9e9e9e",
                                    fontStyle: "italic",
                                }}
                            >
                                No {type}s found
                            </div>
                        )}
                    </SortableContext>
                </div>
            </DroppableArea>
        </div>
    );
};

// ------------------ Course Builder With Chapters & Topics ------------------
const DroppableCourseBuilder = ({ id, items, label, onDelete }) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <DroppableArea id={id} label={label} isOver={isOver}>
                <div style={{ overflowY: "auto", maxHeight: "calc(70vh - 100px)" }}>
                    <SortableContext
                        items={items.map((ch) => `chapter-${ch.id}`)}
                        strategy={verticalListSortingStrategy}
                    >
                        {items.length > 0 ? (
                            items.map((chapter) => (
                                <div key={chapter.id} style={{ marginBottom: "24px" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "12px",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        <DraggableItem
                                            item={{ id: chapter.id, name: chapter.name }}
                                            type="chapter"
                                            idPrefix="chapter"
                                        />
                                        <button
                                            onClick={() => onDelete(chapter.id, "chapter")}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "4px",
                                                padding: "8px 12px",
                                                backgroundColor: "#ffebee",
                                                color: "#c62828",
                                                border: "none",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                            }}
                                            title="Remove chapter"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                    <ChapterTopicBox chapter={chapter} onDelete={onDelete} />
                                </div>
                            ))
                        ) : (
                            <div
                                style={{
                                    padding: "16px",
                                    textAlign: "center",
                                    color: "#9e9e9e",
                                    fontStyle: "italic",
                                }}
                            >
                                Drag chapters here to build your course
                            </div>
                        )}
                    </SortableContext>
                </div>
            </DroppableArea>
        </div>
    );
};

// ------------------ Chapter Topic Drop Area ------------------
const ChapterTopicBox = ({ chapter, onDelete }) => {
    const id = `ChapterBox-${chapter.id}`;
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{
                padding: "16px",
                background: isOver ? "#f0e6ff" : "#f5f5f5",
                borderRadius: "8px",
                transition: "all 0.2s ease",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                    color: "#424242",
                }}
            >
                <FaChalkboardTeacher color="#00acc1" />
                <span>Topics</span>
            </div>
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                <SortableContext
                    items={chapter.topics.map((t) => `topic-${t.id}`)}
                    strategy={verticalListSortingStrategy}
                >
                    {chapter.topics.length > 0 ? (
                        chapter.topics.map((topic) => (
                            <div
                                key={topic.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px 14px",
                                    marginBottom: "8px",
                                    background: "#fff",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "6px",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <DraggableItem item={topic} type="topic" idPrefix="topic" />
                                <button
                                    onClick={() => onDelete(topic.id, "topic")}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "32px",
                                        height: "32px",
                                        backgroundColor: "#ffebee",
                                        color: "#c62828",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                    title="Remove topic"
                                >
                                    <FiTrash2 size={14} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div
                            style={{
                                padding: "16px",
                                textAlign: "center",
                                color: "#9e9e9e",
                                fontStyle: "italic",
                                background: "#fff",
                                border: "1px dashed #e0e0e0",
                                borderRadius: "6px",
                            }}
                        >
                            Drag topics here to add to this chapter
                        </div>
                    )}
                </SortableContext>
            </div>
        </div>
    );
};