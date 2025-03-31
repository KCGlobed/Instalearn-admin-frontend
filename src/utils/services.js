import { BADGE_ADD, BADGE_DELETE, BADGE_LIST, BADGE_UPDATE } from "./apiroutes"
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
  