import axios from 'axios';
import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const ProjectContext = createContext();

const headerAPI = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('cms_token') || ''}`,
  },
};

export const ProjectProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [projectDatas, setProjectDatas] = useState([]);
  const [showAddForm, toggleAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectProjectId, setSelectProjectId] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const [accountDatas, setAccountDatas] = useState([]);
  const [newAccountDatas, setNewAccountDatas] = useState([]);
  const [showIsActiveItems, setShowIsActiveItems] = useState(1);
  const [inactiveCount, setInactiveCount] = useState(0);

  const [accountSearchKeyword, setAccountSearchKeyword] = useState('');

  const [projectCreating, setProjectCreating] = useState({
    name: '',
    account_id: '',
    description: '',
  });

  const fetchDataById = async (id) => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/projects/get-by-id/${id}`, headerAPI)
      .then((res) => {
        setProjectCreating(res.data.data);
        setLoading(false);
        setAccountSearchKeyword(res.data.data.account.contact_person);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.status + ': Project api error!', {
          position: 'bottom-right',
        });
      });
  };
  const handleDelete = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/projects/remove/${selectProjectId}`,
        {},
        headerAPI
      )
      .then(() => {
        fetchData();
        toast.info('Project deleted!', { position: 'bottom-right' });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.status + ': Project api error!');
      });
  };
  const handleRestore = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/projects/restore/${selectProjectId}`,
        {},
        headerAPI
      )
      .then(() => {
        fetchData();
        toast.success('Project restored!', { position: 'bottom-right' });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.status + ': Project api error!');
      });
  };
  const restoreProject = (id) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/projects/restore/${id}`, {}, headerAPI)
      .then(() => {
        fetchData();
        toast.success('Project restored!', { position: 'bottom-right' });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.status + ': Project api error!');
      });
  };
  const searchData = async () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/projects/search?keyword=${keyword}`,
        {
          limit: limit,
          page: page,
        },
        headerAPI
      )
      .then((res) => {
        setProjectDatas(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.status + ': Project api error!', {
          position: 'bottom-right',
        });
      });
  };
  const searchAccountData = async () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/accounts/search-query?keyword=${accountSearchKeyword}`,
        {
          limit: 15,
          page: 1,
        },
        headerAPI
      )
      .then((res) => {
        setAccountDatas(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.status + ': Account api error!', {
          position: 'bottom-right',
        });
      });
  };

  const fetchData = async () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/projects/get?page=${page}&limit=${limit}&is_active=${showIsActiveItems}`,
        headerAPI
      )
      .then((res) => {
        setProjectDatas(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.status + ': Project api error!', {
          position: 'bottom-right',
        });
      });
  };
  const fetchNewAccountData = async () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/accounts?page=${1}&limit=${8}`, headerAPI)
      .then((res) => {
        setNewAccountDatas(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.status + ': Project api error!', {
          position: 'bottom-right',
        });
      });
  };
  const projectCreateSubmit = (event) => {
    event.preventDefault();
    if (isEdit) {
      delete projectCreating.created_at;
      delete projectCreating.id;
      axios
        .patch(
          `${process.env.REACT_APP_BACKEND_URL}/projects/update/${selectProjectId}`,
          projectCreating,
          headerAPI
        )
        .then(() => {
          toast.success('Project update successfully!', { position: 'bottom-right' });
          fetchData();
          return toggleAddForm(false);
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || 'Project create error!', {
            position: 'bottom-right',
          });
        });
    } else {
      delete projectCreating.created_at;
      delete projectCreating.id;
      delete projectCreating.updated_at;
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/projects/create`, projectCreating, headerAPI)
        .then(() => {
          toast.success('Project create successfully!', { position: 'bottom-right' });
          fetchData();
          return toggleAddForm(false);
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || 'Project create error!', {
            position: 'bottom-right',
          });
        });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        page,
        setPage,
        limit,
        setLimit,
        keyword,
        setKeyword,
        projectDatas,
        setProjectDatas,
        showAddForm,
        toggleAddForm,
        loading,
        setLoading,
        showDialog,
        setShowDialog,
        selectProjectId,
        setSelectProjectId,
        isEdit,
        setEdit,
        handleDelete,
        searchData,
        projectCreateSubmit,
        fetchData,
        fetchDataById,
        projectCreating,
        setProjectCreating,
        accountDatas,
        setAccountDatas,
        searchAccountData,
        accountSearchKeyword,
        setAccountSearchKeyword,
        newAccountDatas,
        setNewAccountDatas,
        fetchNewAccountData,
        showIsActiveItems,
        setShowIsActiveItems,
        inactiveCount,
        setInactiveCount,
        handleRestore,
        restoreProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
