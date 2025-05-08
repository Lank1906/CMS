import axios from 'axios';
import React, { createContext, useState } from 'react';
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
  const [selectContractId, setSelectContractId] = useState();
  const [isEdit, setEdit] = useState(false);
  const [projectList, setProjectList] = useState([]);
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
  const [projectDetail, setProjectDetail] = useState({
    name: '',
    account_id: '',
    description: '',
    start_date: '',
    end_date: '',
  });
  const fetchProjectDataById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${id}`, headerAPI);
      setProjectDetail(res.data.data);
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error fetching project data', {
        position: 'bottom-right',
      });
    }
  };
  const fetchContractDataById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contracts/${id}`,
        headerAPI
      );
      setContractCreating(res.data.data);
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error fetching project data', {
        position: 'bottom-right',
      });
    }
  };
  const fetchContractsByProject = async (projectId) => {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contracts/project/${projectId}?page=${page}&limit=${limit}`,
        headerAPI
      );
      setContractDatas({
        data: res.data.data || [],
        totalPages: res.data.totalPages || 1,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error fetching contracts by project', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };
  const addContract = async (contractData) => {
    setLoading(true);
    try {
      delete contractData.id;
      delete contractData.is_active;
      delete contractData.created_at;
      delete contractData.updated_at;
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/contracts`, contractData, headerAPI);
      toast.success('Contract added successfully');
      fetchContractsByProject(contractData.project_id);
      toggleAddForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding contract', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContract = async (contractId, contractData) => {
    if (!contractId) {
      toast.error('Contract ID is required for update');
      return;
    }
    delete contractData.id;
    delete contractData.is_active;
    delete contractData.created_at;
    delete contractData.updated_at;
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/contracts/${contractId}`,
        contractData,
        headerAPI
      )
      .then(() => {
        contractData.id = contractId;
        toast.success('Contract updated successfully');
        fetchContractsByProject(contractData.project_id);
        return toggleAddForm(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || 'Error updating contract', {
          position: 'bottom-right',
        });
      });
  };
  const deleteContract = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/contracts/${selectContractId}`,
        headerAPI
      );

      toast.success('Contract deleted successfully');
      fetchContractsByProject(contractCreating.project_id);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error deleting contract', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
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
        fetchProjectDataById,
        fetchContractsByProject,
        addContract,
        updateContract,
        deleteContract,
        contractCreating,
        setContractCreating,
        projectList,
        setProjectList,
        fetchContractDataById,
        setProjectDetail,
        projectDetail,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
