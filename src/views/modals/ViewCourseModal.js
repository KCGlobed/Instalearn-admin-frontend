import React, { useEffect, useState } from 'react';
import { handleViewCourseApi } from '../../utils/services';

const ViewCourseModal = ({ course }) => {
 const [courseDetail,setCourseDetail] =useState({})
  const handleView = async (id) => {
    const response = await handleViewCourseApi(id);
    console.log(response.res.data);
    setCourseDetail(response.res.data)
  };

  useEffect(() => {
    if (course) {
      handleView(course.id);
    }
  }, [course]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="view-course-container">
      {/* Course Banner or Image */}
      {courseDetail.image && (
        <div className="course-image-wrapper">
          <img src={courseDetail.image} alt={course.name} className="course-image" />
        </div>
      )}

      {/* Course Title and Tags */}
      <div>
        <h1 className="course-title">{courseDetail.name}</h1>
        <p className="course-text"  dangerouslySetInnerHTML={{ __html: courseDetail.short_description }} />
        <div className="course-tags">
          {courseDetail.tags?.map((tag, idx) => (
            <span key={idx} className="course-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div className="course-price">
        ₹{courseDetail.price}
        {courseDetail.discount && (
          <span className="course-discount">₹{courseDetail.discount}</span>
        )}
      </div>


      {/* Requirements */}
      {courseDetail.requirements && (
        <div>
          <h2 className="course-section-title">Requirements</h2>
          <div
            className="course-text"
            dangerouslySetInnerHTML={{ __html: courseDetail.requirements }}
          />
        </div>
      )}

      {/* Full Description */}
      {courseDetail.description && (
        <div>
          <h2 className="course-section-title">Course Description</h2>
          <div
            className="course-description"
            dangerouslySetInnerHTML={{ __html: courseDetail.description }}
          />
        </div>
      )}
    </div>
  );
};

export default ViewCourseModal;
