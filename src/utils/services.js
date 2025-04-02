import { BADGE_ADD, BADGE_DELETE, BADGE_LIST, BADGE_UPDATE, CHAPTER, CHAPTER_CREATE, CHAPTER_DELETE, CHAPTER_UPDATE, STAFF_CREATE, STAFF_IS_ACTIVE, STAFF_LIST, STAFF_PERMISSION_LIST, STAFF_PERMISSION_UPDATE, STAFF_UPDATE, STAFF_VIEW,USER_DOWNLOAD_EXCEL,USER_DOWNLOAD_PDF, USER_REPORT_LIST} from "./apiroutes"
import axios from 'axios'
export const BASE_URL = 'https://instalearn-admin-backend-254015706580.asia-south2.run.app/api' 

axios.defaults.baseURL = BASE_URL
const token = localStorage.getItem('access_token')

export const getListOfBadge = async (data) => {
    try {
      const response = await axios.get(BADGE_LIST, {
        headers: {
          Authorization: 'Bearer ' + token,
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
          Authorization: 'Bearer ' + token,
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

  export const editBadge = async (data,id) => {
    try {
      const response = await axios.post(`${BADGE_UPDATE}/${id}`,data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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
           Authorization: 'Bearer ' + token,
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
          Authorization: 'Bearer ' + token,
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


  export const handleActiveStaffApi = async (data,id) => {
    try {
      const response = await axios.post(`${STAFF_IS_ACTIVE}/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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
          Authorization: 'Bearer ' + token,
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


  export const handleUpdateStaffApi = async (id,data) => {
    try {
      const response = await axios.post(`${STAFF_UPDATE}/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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
      const response = await axios.post(`${STAFF_UPDATE}/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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
      const response = await axios.get(`${STAFF_VIEW}/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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
      const response = await axios.get(`${STAFF_PERMISSION_LIST}/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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

  export const updateStaffPermissionsApi = async (id,data) => {
    try {
      const response = await axios.post(`${STAFF_PERMISSION_UPDATE}/${id}`,data,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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
      const response = await axios.get(USER_DOWNLOAD_PDF,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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
      const response = await axios.get(USER_DOWNLOAD_EXCEL,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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
      const response = await axios.get(CHAPTER,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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
      const response = await axios.post(CHAPTER_CREATE,data,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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

  export const handleUpdateChapterApi = async (id,data) => {
    try {
      const response = await axios.post(`${CHAPTER_UPDATE}/${id}`,data,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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
           Authorization: 'Bearer ' + token,
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

  
  