import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_HOST;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type Data = {
  [key: string]: unknown
} | FormData;

export const useApiCall = () => {
  const [loading, setLoading] = useState(false);

  const apiCall = (method: Method, url: string, data?: Data) => {
    setLoading(true);
    return axios({
      method,
      url,
      data,
      withCredentials: true,
    }).then((res) => {
      return res.data;
    }).catch((e) => {
      toast('Something went Wrong', {
        type: 'error'
      });
      return Promise.reject(e);
    }).finally(() => {
      setLoading(false);
    });
  };


  return {
    loading,
    apiCall: {
      get: (url: string) => apiCall('GET', url),
      post: (url: string, data: Data) => apiCall('POST', url, data),
      put: (url: string, data: Data) => apiCall('PUT', url, data),
      delete: (url: string) => apiCall('DELETE', url),
    }
  };
};
