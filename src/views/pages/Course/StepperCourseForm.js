import React, { useState } from "react";
import { Steps, Button } from "antd";
import CourseForm from "./CourseForm"; // Step 1
import NestedCourseBuilder from "./CourseBuilder"; // Step 2
import ReviewCourse from "./ReviewCourse";

const { Step } = Steps;

const StepperCourseForm = () => {
    const [current, setCurrent] = useState(0);
    const [courseData, setCourseData] = useState({});
    const [builderData, setBuilderData] = useState([]);

    const onSaveData = (data) => {
        setBuilderData(data);
        setCurrent(2);
    }
    const handlePrev = () => {
        setCurrent(prev => prev - 1);
    };
    const steps = [
        {
            title: "Course Info",
            content: <CourseForm initialData={courseData}
                onSave={(data) => {
                    setCourseData(data);
                    setCurrent(1);
                }} />,
        },
        {
            title: "Course Builder",
            content: <NestedCourseBuilder prev={handlePrev} onSave={onSaveData} />
        },
        {
            title: "Review and Submit",
            content: <ReviewCourse data={courseData} courses={builderData} />,
        },
    ];



    return (
        <div >
            <Steps current={current} style={{ marginBottom: 24, padding: "0 50px" }}>
                {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>

            <div>{steps[current].content}</div>
        </div>
    );
};

export default StepperCourseForm;
