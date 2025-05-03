import { toast } from 'react-toastify';
import axios from 'axios';
export const fetchData = async (page, limit, onDataFetched, onLoadingChange) => {
  onLoadingChange(true);
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/contracts?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('cms_token') || ''}`,
        },
      }
    );
    onDataFetched({
      data: res.data.data || [],
      totalPages: res.data.totalPages || 1,
    });
  } catch (err) {
    toast.error(err.response?.data?.message || 'Error fetching contracts', {
      position: 'bottom-right',
    });
  } finally {
    onLoadingChange(false);
  }
};
