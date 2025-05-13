import { ACTIVE_INSTRUCTOR, ADD_RELATED_COURSE, ASSIGN_CHAPTER_TOPIC, BADGE_ADD, BADGE_DELETE, BADGE_LIST, BADGE_UPDATE, CHANGE_PASSWORD, CHAPTER, CHAPTER_CREATE, CHAPTER_DELETE, CHAPTER_ISACTIVE, CHAPTER_UPDATE, COURSE_ADD_PREV_VIDEO, COURSE_ASSIGN_CHAPTER_LIST, COURSE_ASSIGN_CHAPTER_TOPIC, COURSE_ASSIGN_CHAPTER_TOPIC_DELETE, COURSE_ASSIGN_CHAPTER_TOPIC_LIST, COURSE_CHAPTER_ASSIGN, COURSE_CHAPTER_LIST, COURSE_CHAPTER_TOPIC_LIST, COURSE_CREATE, COURSE_DELETE, COURSE_DELETE_ASSIGN_CHAPTER, COURSE_DELETE_PREV_VIDEO, COURSE_DETAILS, COURSE_LIST, COURSE_PREV_VIDEO_LIST, COURSE_REVEIW, COURSE_REVEIW_IS_ACTIVE, COURSE_SUB_CATEGORY, COURSE_SUGGEST, COURSE_TOPIC_LIST, COURSE_UPDATE, DELETE_RELATED_COURSES, EDIT_PROFILE, INSTRUCTOR_CREATE, INSTRUCTOR_DETAILS, INSTRUCTOR_LIST, INSTRUCTOR_UPDATE, PROFILE_CHANGE, PROFILE_DETAIL, RELATED_COURSES, STAFF_CREATE, STAFF_IS_ACTIVE, STAFF_LIST, STAFF_PERMISSION_LIST, STAFF_PERMISSION_UPDATE, STAFF_UPDATE, STAFF_VIEW, STUDENT_LIST, UPDATE_INSTRUCTOR_PUBLIC_PROFILE, USER_DOWNLOAD_EXCEL, USER_DOWNLOAD_PDF, USER_PERMISSION, USER_REPORT_LIST ,GET_ROLES_LISTING, GET_ROLES_PERMISSION, UPDATE_ROLES_PERMISSION, UPDATE_COURSE_CHAPTER_TOPIC, GET_COURSE_INSTRUCTOR, GET_INSTRUCTOR_LIST, ADD_COURSE_INSTRUCTOR, DELETE_COURSE_INSTRUCTOR, GET_COURSES_FAQS, ADD_COURSE_FAQ, DELETE_COURSE_FAQ, UPDATE_COURSE_FAQ, UPDATE_FAQ_STATUS, GET_TOPIC_LISTING, CREATE_TOPIC, DELETE_TOPIC, ACTIVE_TOPIC, UPDATE_TOPIC, GET_STUDENT_SUBSCRIPTION_PLAN, CREATE_STUDENT_SUBSCRIPTION_PLAN, DELETE_STUDENT_SUBSCRIPTION_PLAN, UPDATE_STATUS_STUDENT_SUBSCRIPTION_PLAN, GET_STUDENT_DETAILS_SUBSCRIPTION_PLAN, UPDATE_STUDENT_SUBSCRIPTION_PLAN, GET_CORPORATE_SUBSCRIPTION_PLAN, VIEW_CORPORATE_SUBSCRIPTION_PLAN, DELETE_CORPORATE_SUBSCRIPTION_PLAN, ADD_CORPORATE_SUBSCRIPTION_PLAN, UPDATE_CORPORATE_SUBSCRIPTION_PLAN, UPDATE_STATUS_CORPORATE_SUBSCRIPTION_PLAN, GET_UNIVERSITY_SUBSCRIPTION_PLAN, UPDATE_STATUS_UNIVERSITY_SUBSCRIPTION_PLAN, CREATE_UNIVERSITY_SUBSCRIPTION_PLAN, UPDATE_UNIVERSITY_SUBSCRIPTION_PLAN, VIEW_UNIVERSITY_SUBSCRIPTION_PLAN, DELETE_UNIVERSITY_SUBSCRIPTION_PLAN, GET_BOOK_LISTING, ADD_E_BOOK, UPDATE_STATUS_E_BOOK, DELETE_E_BOOK, GET_BLOG_CATEGORY, ADD_BLOG_CATEGORY, DELETE_BLOG_CATEGORY, UPDATE_STATUS_BLOG_CATEGORY, EDIT_BLOG_CATEGORY} from "./apiroutes"
import axios from 'axios'
export const BASE_URL = 'https://instalearn-admin-backend-254015706580.asia-south2.run.app/api'

axios.defaults.baseURL = BASE_URL


export const getListOfBadge = async (data) => {
  try {
    const response = await axios.get(BADGE_LIST, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data.results }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const addBadge = async (data) => {
  try {
    const response = await axios.post(BADGE_ADD, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const editBadge = async (data, id) => {
  try {
    const response = await axios.post(`${BADGE_UPDATE}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const deleteBadge = async (id) => {
  try {
    const response = await axios.delete(`${BADGE_DELETE}/${id}`, {
      headers: {
        'Content-Type': 'application/json',

      },
    });

    if (response.status === 200) {
      console.log(response.data);
      return { res: response.data };
    }
    return response.data;

  } catch (err) {
    if (err.response) throw err.response.data;
    throw err.message;
  }
};


export const getListOfStaff = async (data) => {
  try {
    const response = await axios.get(STAFF_LIST, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data.results }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleActiveStaffApi = async (data, id) => {
  try {
    const response = await axios.post(`${STAFF_IS_ACTIVE}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleCreateStaffApi = async (data) => {
  try {
    const response = await axios.post(STAFF_CREATE, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleUpdateStaffApi = async (id, data) => {
  try {
    const response = await axios.post(`${STAFF_UPDATE}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleDeleteStaffApi = async (id) => {
  try {
    const response = await axios.post(`${STAFF_UPDATE}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleViewStaffApi = async (id) => {
  try {
    const response = await axios.get(`${STAFF_VIEW}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handlePermissionStaffApi = async (id) => {
  try {
    const response = await axios.get(`${STAFF_PERMISSION_LIST}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const updateStaffPermissionsApi = async (id, data) => {
  try {
    const response = await axios.post(`${STAFF_PERMISSION_UPDATE}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleDownloadPdfUserApi = async (id) => {
  try {
    const response = await axios.get(USER_DOWNLOAD_PDF, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleDownloadExcelUserApi = async (id) => {
  try {
    const response = await axios.get(USER_DOWNLOAD_EXCEL, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleChapterListApi = async (id) => {
  try {
    const response = await axios.get(CHAPTER, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleCreateChapterApi = async (data) => {
  try {
    const response = await axios.post(CHAPTER_CREATE, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleUpdateChapterApi = async (id, data) => {
  try {
    const response = await axios.post(`${CHAPTER_UPDATE}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}



export const deleteChapterApi = async (id) => {
  try {
    const response = await axios.delete(`${CHAPTER_DELETE}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      return { res: response.data };
    }
    return response.data;

  } catch (err) {
    if (err.response) throw err.response.data;
    throw err.message;
  }
};


export const handleActiveChapterApi = async (data, id) => {
  try {
    const response = await axios.post(`${CHAPTER_ISACTIVE}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleProfileDetails = async (id) => {
  try {
    const response = await axios.get(PROFILE_DETAIL, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleChangeAvatarApi = async (data) => {
  try {
    const response = await axios.post(PROFILE_CHANGE, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleChangePasswordApi = async (data) => {
  try {
    const response = await axios.post(CHANGE_PASSWORD, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleEditPafileApi = async (data) => {
  try {
    const response = await axios.post(EDIT_PROFILE, data, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleUserListApi = async (id) => {
  try {
    const response = await axios.get(STUDENT_LIST, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleUserPermissionApi = async (id) => {
  try {
    const response = await axios.get(USER_PERMISSION, {
      headers: {
        'Content-Type': 'application/json',

      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}



export const handleAddCourseApi = async (data) => {
  try {
    const response = await axios.post(COURSE_CREATE, data, {
      headers: {
        "Content-Type": "multipart/form-data",

      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleSubCatagoryApi = async (id) => {
  try {
    const response = await axios.get(`${COURSE_SUB_CATEGORY}`, {
      headers: {
        'Content-Type': 'application/json',

      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleCourseListApi = async (id) => {
  try {
    const response = await axios.get(COURSE_LIST, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleAssigedChapterListApi = async (id) => {
  try {
    const response = await axios.get(`${COURSE_ASSIGN_CHAPTER_LIST}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleAssignChapterApi = async (data) => {
  try {
    const response = await axios.post(COURSE_CHAPTER_ASSIGN, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleAssignchapterlistApi = async (id) => {
  try {
    const response = await axios.get(COURSE_CHAPTER_LIST, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}
export const handleAssignTopiclistApi = async (id) => {
  try {
    const response = await axios.get(`${COURSE_TOPIC_LIST}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleAssignVideolistApi = async (id) => {
  try {
    const response = await axios.get(`${COURSE_PREV_VIDEO_LIST}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleAddPrevVideoApi = async (data) => {
  try {
    const response = await axios.post(COURSE_ADD_PREV_VIDEO, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const deleteAssignVideoApi = async (id) => {
  try {
    const response = await axios.delete(`${COURSE_DELETE_PREV_VIDEO}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      return { res: response.data };
    }
    return response.data;

  } catch (err) {
    if (err.response) throw err.response.data;
    throw err.message;
  }
};

export const deleteCourseApi = async (id) => {
  try {
    const response = await axios.delete(`${COURSE_DELETE}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      return { res: response.data };
    }
    return response.data;

  } catch (err) {
    if (err.response) throw err.response.data;
    throw err.message;
  }
};

export const deleteCourseAssignChapterApi = async (id) => {
  try {
    const response = await axios.delete(`${COURSE_DELETE_ASSIGN_CHAPTER}/${id}`, {
      headers: {
        'Content-Type': 'application/json',

      },
    });

    if (response.status === 200) {
      console.log(response.data);
      return { res: response.data };
    }
    return response.data;

  } catch (err) {
    if (err.response) throw err.response.data;
    throw err.message;
  }
};


export const handleAssignchapterTopiclistApi = async (id) => {
  try {
    const response = await axios.get(COURSE_ASSIGN_CHAPTER_TOPIC_LIST, {
      headers: {
        'Content-Type': 'application/json',

      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleAssignChapterTopicApi = async (data) => {
  try {
    const response = await axios.post(COURSE_ASSIGN_CHAPTER_TOPIC, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const deleteCourseAssignChapterTopicApi = async (id) => {
  try {
    const response = await axios.delete(`${COURSE_ASSIGN_CHAPTER_TOPIC_DELETE}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      return { res: response.data };
    }
    return response.data;

  } catch (err) {
    if (err.response) throw err.response.data;
    throw err.message;
  }
};


export const handleViewCourseApi = async (id) => {
  try {
    const response = await axios.get(`${COURSE_DETAILS}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleUpdateCourseApi = async (data, id) => {
  try {
    const response = await axios.post(`${COURSE_UPDATE}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}




export const handleCourseRelatedApi = async (id) => {
  try {
    const response = await axios.get(`${RELATED_COURSES}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}



export const deleteCourseAssignRelatedCourseApi = async (id) => {
  try {
    const response = await axios.delete(`${DELETE_RELATED_COURSES}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      return { res: response.data };
    }
    return response.data;

  } catch (err) {
    if (err.response) throw err.response.data;
    throw err.message;
  }
};

export const handleCourseSuggestlistApi = async (id) => {
  try {
    const response = await axios.get(COURSE_SUGGEST, {
      headers: {
        'Content-Type': 'application/json',

      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleAddRelatedCourseApi = async (data) => {
  try {
    const response = await axios.post(ADD_RELATED_COURSE, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleInstructorList = async (id) => {
  try {
    const response = await axios.get(INSTRUCTOR_LIST, {
      headers: {
        'Content-Type': 'application/json',

      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleInstructorDetails = async (id) => {
  try {
    const response = await axios.get(`${INSTRUCTOR_DETAILS}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleAddInstructorApi = async (data) => {
  try {
    const response = await axios.post(INSTRUCTOR_CREATE, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleUpdateInstructor = async (data, id) => {
  try {
    const response = await axios.post(`${INSTRUCTOR_UPDATE}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleChapterTopicApi = async (data) => {
  try {
    const response = await axios.post(ASSIGN_CHAPTER_TOPIC, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleActiveInstructorApi = async (data, id) => {
  try {
    const response = await axios.post(`${ACTIVE_INSTRUCTOR}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleUpdatePublicProfileApi = async (data, id) => {
  try {
    const response = await axios.post(`${UPDATE_INSTRUCTOR_PUBLIC_PROFILE}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleCourseReviewList = async (id) => {
  try {
    const response = await axios.get(COURSE_REVEIW, {
      headers: {
        'Content-Type': 'application/json',

      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleActiveCourseReviewApi = async (data, id) => {
  try {
    const response = await axios.post(`${COURSE_REVEIW_IS_ACTIVE}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleCourseBuilderListApi = async (id) => {
  try {
    const response = await axios.get(`${COURSE_CHAPTER_TOPIC_LIST}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleRoleListing = async (id) => {
  try {
    const response = await axios.get(GET_ROLES_LISTING, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleRoleDetails = async (id) => {
  try {
    const response = await axios.get(`${GET_ROLES_PERMISSION}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleUpdateRolePermisionApi = async (data) => {
  try {
    const response = await axios.post(UPDATE_ROLES_PERMISSION, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleUpdateCourseChapterTopic = async (data) => {
  try {
    const response = await axios.post(UPDATE_COURSE_CHAPTER_TOPIC, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleGetInstructorApi = async (id) => {
  try {
    const response = await axios.get(`${GET_COURSE_INSTRUCTOR}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleInstructorListing = async (id) => {
  try {
    const response = await axios.get(GET_INSTRUCTOR_LIST, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleAddCourseInstructorApi = async (data) => {
  try {
    const response = await axios.post(ADD_COURSE_INSTRUCTOR, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const deleteCourseInstructor = async (id) => {
  try {
    const response = await axios.delete(`${DELETE_COURSE_INSTRUCTOR}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      return { res: response.data };
    }
    return response.data;

  } catch (err) {
    if (err.response) throw err.response.data;
    throw err.message;
  }
};


export const handleGetCoursesFaqs = async (id) => {
  try {
    const response = await axios.get(`${GET_COURSES_FAQS}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleAddCourseFaq = async (data) => {
  try {
    const response = await axios.post(ADD_COURSE_FAQ, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleDeleteCoursesFaqs = async (id) => {
  try {
    const response = await axios.delete(`${DELETE_COURSE_FAQ}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleUpdateCourseFaqApi = async (data, id) => {
  try {
    const response = await axios.post(`${UPDATE_COURSE_FAQ}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleUpdateFaqStatus = async (data, id) => {
  try {
    const response = await axios.post(`${UPDATE_FAQ_STATUS}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}



export const handleTopicApi= async (id) => {
  try {
    const response = await axios.get(GET_TOPIC_LISTING, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleAddTopic = async (data) => {
  try {
    const response = await axios.post(CREATE_TOPIC, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleDeleteTopic = async (id) => {
  try {
    const response = await axios.delete(`${DELETE_TOPIC}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleActiveTopicApi = async (data, id) => {
  try {
    const response = await axios.post(`${ACTIVE_TOPIC}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleUpdateTopicApi = async (data, id) => {
  try {
    const response = await axios.post(`${UPDATE_TOPIC}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const getStudentSubscriptionPlanApi= async (id) => {
  try {
    const response = await axios.get(GET_STUDENT_SUBSCRIPTION_PLAN, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}



export const handleCreateStudentSubscriptionApi = async (data) => {
  try {
    const response = await axios.post(CREATE_STUDENT_SUBSCRIPTION_PLAN, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}



export const handleDeleteStudentSubsciptionplan = async (id) => {
  try {
    const response = await axios.delete(`${DELETE_STUDENT_SUBSCRIPTION_PLAN}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleStatusStudentSubscriptionPlan = async (data, id) => {
  try {
    const response = await axios.post(`${UPDATE_STATUS_STUDENT_SUBSCRIPTION_PLAN}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleGetStudentDetailSubscriptionPlan = async (id) => {
  try {
    const response = await axios.get(`${GET_STUDENT_DETAILS_SUBSCRIPTION_PLAN}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleUpdateStudentSubscriptionPlan = async (data, id) => {
  try {
    const response = await axios.post(`${UPDATE_STUDENT_SUBSCRIPTION_PLAN}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const getCorporateSubscriptionPlanApi= async (id) => {
  try {
    const response = await axios.get(GET_CORPORATE_SUBSCRIPTION_PLAN, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleGetCorporateDetailSubscriptionPlan = async (id) => {
  try {
    const response = await axios.get(`${VIEW_CORPORATE_SUBSCRIPTION_PLAN}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleDeleteCorpSubsciptionplan = async (id) => {
  try {
    const response = await axios.delete(`${DELETE_CORPORATE_SUBSCRIPTION_PLAN}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}



export const handleCreateCorpSubscriptionApi = async (data) => {
  try {
    const response = await axios.post(ADD_CORPORATE_SUBSCRIPTION_PLAN, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleUpdateCorporateSubscriptionPlan = async (data, id) => {
  try {
    const response = await axios.post(`${UPDATE_CORPORATE_SUBSCRIPTION_PLAN}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleUpdateStatusCorporateSubscriptionPlan = async (data, id) => {
  try {
    const response = await axios.post(`${UPDATE_STATUS_CORPORATE_SUBSCRIPTION_PLAN}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const getUnversitySubscriptionPlanApi= async (id) => {
  try {
    const response = await axios.get(GET_UNIVERSITY_SUBSCRIPTION_PLAN, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleUpdateStatusUniversitySubscriptionPlan = async (data, id) => {
  try {
    const response = await axios.post(`${UPDATE_STATUS_UNIVERSITY_SUBSCRIPTION_PLAN}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleCreateUniversirtySubscriptionApi = async (data) => {
  try {
    const response = await axios.post(CREATE_UNIVERSITY_SUBSCRIPTION_PLAN, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleUpdateUniversitySubscriptionPlan = async (data, id) => {
  try {
    const response = await axios.post(`${UPDATE_UNIVERSITY_SUBSCRIPTION_PLAN}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleGetUniversityDetailSubscriptionPlan = async (id) => {
  try {
    const response = await axios.get(`${VIEW_UNIVERSITY_SUBSCRIPTION_PLAN}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleDeleteUnivercitySubsciptionplan = async (id) => {
  try {
    const response = await axios.delete(`${DELETE_UNIVERSITY_SUBSCRIPTION_PLAN}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const getEbookListApi= async (id) => {
  try {
    const response = await axios.get(GET_BOOK_LISTING, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleAddEBookApi = async (data) => {
  try {
    const response = await axios.post(ADD_E_BOOK, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handlestatusEbook = async (data, id) => {
  try {
    const response = await axios.post(`${UPDATE_STATUS_E_BOOK}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleDeleteEbook = async (id) => {
  try {
    const response = await axios.delete(`${DELETE_E_BOOK}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const getBlogCategoryApi= async (id) => {
  try {
    const response = await axios.get(GET_BLOG_CATEGORY, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {

      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleAddBlogCategory = async (data) => {
  try {
    const response = await axios.post(ADD_BLOG_CATEGORY, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleDeleteBlogCategory = async (id) => {
  try {
    const response = await axios.delete(`${DELETE_BLOG_CATEGORY}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}


export const handleUpdateStatusBlogCategory = async (data, id) => {
  try {
    const response = await axios.post(`${UPDATE_STATUS_BLOG_CATEGORY}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}

export const handleUpdateBlogCategory = async (data, id) => {
  try {
    const response = await axios.post(`${EDIT_BLOG_CATEGORY}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log(response.data)
      return { res: response.data }
    } else return response.data
  } catch (err) {
    if (err.response) throw err.response.data
    else throw err.message
  }
}






















