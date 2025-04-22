import { ADD_RELATED_COURSE, ASSIGN_CHAPTER_TOPIC, BADGE_ADD, BADGE_DELETE, BADGE_LIST, BADGE_UPDATE, CHANGE_PASSWORD, CHAPTER, CHAPTER_CREATE, CHAPTER_DELETE, CHAPTER_ISACTIVE, CHAPTER_UPDATE, COURSE_ADD_PREV_VIDEO, COURSE_ASSIGN_CHAPTER_LIST, COURSE_ASSIGN_CHAPTER_TOPIC, COURSE_ASSIGN_CHAPTER_TOPIC_DELETE, COURSE_ASSIGN_CHAPTER_TOPIC_LIST, COURSE_CHAPTER_ASSIGN, COURSE_CHAPTER_LIST, COURSE_CREATE, COURSE_DELETE, COURSE_DELETE_ASSIGN_CHAPTER, COURSE_DELETE_PREV_VIDEO, COURSE_DETAILS, COURSE_LIST, COURSE_PREV_VIDEO_LIST, COURSE_SUB_CATEGORY, COURSE_SUGGEST, COURSE_TOPIC_LIST, COURSE_UPDATE, DELETE_RELATED_COURSES, EDIT_PROFILE, INSTRUCTOR_CREATE, INSTRUCTOR_DETAILS, INSTRUCTOR_LIST, INSTRUCTOR_UPDATE, PROFILE_CHANGE, PROFILE_DETAIL, RELATED_COURSES, STAFF_CREATE, STAFF_IS_ACTIVE, STAFF_LIST, STAFF_PERMISSION_LIST, STAFF_PERMISSION_UPDATE, STAFF_UPDATE, STAFF_VIEW, STUDENT_LIST, USER_DOWNLOAD_EXCEL, USER_DOWNLOAD_PDF, USER_PERMISSION, USER_REPORT_LIST } from "./apiroutes"
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






