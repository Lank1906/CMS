import axios from 'axios';
import React, { createContext, useRef, useState, useContext } from 'react';
import { toast } from 'react-toastify';

export const ContractContext = createContext();

const headerAPI = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('cms_token') || ''}`,
  },
};
export const useContractContext = () => {
  return useContext(ContractContext);
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
  const [setProjectDatas] = useState([]);
  const titleInputRef = useRef();
  const signedDateInputRef = useRef();
  const projectIdInputRef = useRef();
  const totalAmountInputRef = useRef();
  const workingDaysInputRef = useRef();
  const startDateInputRef = useRef();
  const endDateInputRef = useRef();
  const [accountSearchKeyword, setAccountSearchKeyword] = useState('');
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
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/projects?search=${accountSearchKeyword}`,
        headerAPI
      );
      setProjectList(res.data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error fetching project data');
    } finally {
      setLoading(false);
    }
  };
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
        `${process.env.REACT_APP_BACKEND_URL}/contracts?projectId=${projectId}&page=${page}&limit=${limit}`,
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
  const fetchAllProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/projects?page=${page}&limit=${limit}`,
        headerAPI
      );
      setProjectDatas({
        data: res.data.data || [],
        totalPages: res.data.totalPages || 1,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error fetching all projects');
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
      fetchData();
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
        toast.success('Contract updated successfully');
        fetchData();
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
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error deleting contract', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };
  const searchContracts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contracts/search?keyword=${keyword}&page=${page}&limit=${limit}`,
        headerAPI
      );
      setContractDatas({
        data: res.data.data || [],
        totalPages: res.data.totalPages || 1,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error searching contracts', {
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
        fetchData,
        fetchProjectDataById,
        fetchContractsByProject,
        addContract,
        updateContract,
        deleteContract,
        searchContracts,
        contractCreating,
        setContractCreating,
        titleInputRef,
        projectIdInputRef,
        signedDateInputRef,
        totalAmountInputRef,
        workingDaysInputRef,
        startDateInputRef,
        endDateInputRef,
        fetchAllProjects,
        accountSearchKeyword,
        setAccountSearchKeyword,
        projectList,
        setProjectList,
        fetchProjects,
        fetchContractDataById,
        setProjectDetail,
        projectDetail,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
