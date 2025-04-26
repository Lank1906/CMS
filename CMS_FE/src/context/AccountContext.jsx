import axios from 'axios';
import React, { createContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [accountDatas, setAccountDatas] = useState([]);
  const [showAddForm, toggleAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectAccountId, setSelectAccountId] = useState(0);
  const [isEdit, setEdit] = useState(false);

  const companyInputRef = useRef();
  const contactPersonInputRef = useRef();
  const emailInputRef = useRef();

  const [accountCreating, setAccountCreating] = useState({
    company: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    url: '',
  });

  const fetchDataById = async (id) => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/accounts/${id}`)
      .then((res) => {
        setAccountCreating(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.status + ': Account api error!', {
          position: 'bottom-right',
        });
      });
  };
  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/accounts/${selectAccountId}`)
      .then(() => {
        fetchData();
        toast.info('Account deleted!', { position: 'bottom-right' });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.status + ': Account api error!');
      });
  };
  const searchData = async () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/accounts/search-query?keyword=${keyword}`, {
        limit: limit,
        page: page,
      })
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
      .get(`${process.env.REACT_APP_BACKEND_URL}/accounts?page=${page}&limit=${limit}`)
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

  const accountCreateSubmit = (event) => {
    event.preventDefault();
    const inputs = [companyInputRef, contactPersonInputRef, emailInputRef];
    inputs.forEach((input) => {
      const value = input.current.querySelector('input').value;
      if (value.trim() === '') {
        input.current.style.borderColor = 'red';
        input.current.style.boxShadow = '0px 0px 10px rgba(255, 0, 0, 0.24)';
      } else {
        input.current.style.borderColor = '';
        input.current.style.boxShadow = 'none';
      }
    });
    if (isEdit) {
      delete accountCreating.created_at;
      delete accountCreating.id;
      axios
        .patch(`${process.env.REACT_APP_BACKEND_URL}/accounts/${selectAccountId}`, accountCreating)
        .then(() => {
          toast.success('Account update successfully!', { position: 'bottom-right' });
          fetchData();
          return toggleAddForm(false);
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || 'Account create error!', {
            position: 'bottom-right',
          });
        });
    } else {
      delete accountCreating.created_at;
      delete accountCreating.id;
      delete accountCreating.status;
      delete accountCreating.updated_at;
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/accounts`, accountCreating)
        .then(() => {
          toast.success('Account create successfully!', { position: 'bottom-right' });
          fetchData();
          return toggleAddForm(false);
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || 'Account create error!', {
            position: 'bottom-right',
          });
        });
    }
  };

  return (
    <AccountContext.Provider
      value={{
        page,
        setPage,
        limit,
        setLimit,
        keyword,
        setKeyword,
        accountDatas,
        setAccountDatas,
        showAddForm,
        toggleAddForm,
        loading,
        setLoading,
        showDialog,
        setShowDialog,
        selectAccountId,
        setSelectAccountId,
        isEdit,
        setEdit,
        handleDelete,
        searchData,
        accountCreateSubmit,
        fetchData,
        companyInputRef,
        contactPersonInputRef,
        emailInputRef,
        fetchDataById,
        accountCreating,
        setAccountCreating,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
