import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/contract-detail`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cms_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getContractById = (id) => api.get(`/${id}`).then((res) => res.data);

export const getContractStaffByContractId = (id, page = 1, limit = 10) => {
  return api
    .get(`/${id}/staffs`, {
      params: {
        page,
        limit,
      },
    })
    .then((res) => res.data);
};

export const addContractStaff = (data) =>
  api.post(`/${data.contract_id}/staffs`, data).then((res) => res.data);

export const deleteContractStaff = (id) => api.delete(`/staffs/${id}`).then((res) => res.data);

export const getAllContractRoles = () => api.get('/roles/all').then((res) => res.data);

export const getUsers = () => api.get('/users').then((res) => res.data);

export const getUserLatestRole = (userId) =>
  api.get(`/latest-role/${userId}`).then((res) => res.data);

export const searchUsers = (keyword) =>
  api.get(`/search-users?keyword=${encodeURIComponent(keyword)}`).then((res) => res.data);
