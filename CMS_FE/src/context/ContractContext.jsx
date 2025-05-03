import axios from 'axios';
import React, { createContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const ContractContext = createContext();

const headerAPI = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('cms_token') || ''}`,
  },
};

export const ContractProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [contractDatas, setContractDatas] = useState({ data: [], totalPages: 1 });
  const [showAddForm, toggleAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectContractId, setSelectContractId] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const titleInputRef = useRef();
  const signedDateInputRef = useRef();
  const projectIdInputRef = useRef();
  const totalAmountInputRef = useRef();
  const workingDaysInputRef = useRef();
  const startDateInputRef = useRef();
  const endDateInputRef = useRef();

  const [contractCreating, setContractCreating] = useState({
    title: '',
    project_id: '',
    signed_date: '',
    total_amount: '',
    working_days: '',
    start_date: '',
    end_date: '',
    status: 'Draft',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contracts?page=${page}&limit=${limit}`,
        headerAPI
      );
      setContractDatas({
        data: res.data.data || [],
        totalPages: res.data.totalPages || 1,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error fetching contracts', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const searchData = async () => {
    if (!keyword.trim()) {
      fetchData();
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/contracts/search-query?keyword=${keyword}`,
        { limit, page },
        headerAPI
      );
      setContractDatas({
        data: res.data.data || [],
        totalPages: res.data.totalPages || 1,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error searching contract', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDataById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contracts/${id}`,
        headerAPI
      );
      setContractCreating({ status: 'Draft', ...res.data.data });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error fetching contract by ID', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/contracts/${selectContractId}`,
        headerAPI
      );
      toast.info('Contract deleted!', { position: 'bottom-right' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error deleting contract', {
        position: 'bottom-right',
      });
    } finally {
      setShowDialog(false);
    }
  };

  const contractCreateSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = [
      titleInputRef,
      projectIdInputRef,
      signedDateInputRef,
      totalAmountInputRef,
      workingDaysInputRef,
      startDateInputRef,
      endDateInputRef,
    ];
    requiredFields.forEach((input) => {
      const inputEl = input.current?.querySelector('input');
      if (!inputEl || inputEl.value.trim() === '') {
        input.current.style.borderColor = 'red';
        input.current.style.boxShadow = '0px 0px 10px rgba(255, 0, 0, 0.24)';
      } else {
        input.current.style.borderColor = '';
        input.current.style.boxShadow = 'none';
      }
    });

    try {
      const contractData = { ...contractCreating };
      delete contractData.created_at;
      delete contractData.updated_at;
      delete contractData.id;

      if (!contractData.status) {
        contractData.status = 'Draft';
      }

      if (isEdit) {
        await axios.patch(
          `${process.env.REACT_APP_BACKEND_URL}/contracts/${selectContractId}`,
          contractData,
          headerAPI
        );
        toast.success('Contract updated successfully!', { position: 'bottom-right' });
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/contracts`, contractData, headerAPI);
        toast.success('Contract created successfully!', { position: 'bottom-right' });
      }

      fetchData();
      toggleAddForm(false);
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors) && errors.length > 0) {
        errors.forEach((msg) => {
          toast.error(msg, { position: 'bottom-right' });
        });
      } else {
        toast.error(err.response?.data?.message || 'Error saving contract', {
          position: 'bottom-right',
        });
      }
    }
  };

  return (
    <ContractContext.Provider
      value={{
        page,
        setPage,
        limit,
        setLimit,
        keyword,
        setKeyword,
        contractDatas,
        setContractDatas,
        showAddForm,
        toggleAddForm,
        loading,
        setLoading,
        showDialog,
        setShowDialog,
        selectContractId,
        setSelectContractId,
        isEdit,
        setEdit,
        handleDelete,
        searchData,
        fetchData,
        fetchDataById,
        contractCreating,
        setContractCreating,
        contractCreateSubmit,
        titleInputRef,
        projectIdInputRef,
        signedDateInputRef,
        totalAmountInputRef,
        workingDaysInputRef,
        startDateInputRef,
        endDateInputRef,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
