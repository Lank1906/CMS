import React, { useState, useEffect, useContext } from 'react';
import { ArrowUpRightFromSquare, Edit, Trash } from 'lucide-react';
import InputCopy from '../../components/ui/InputCopy';
import Button from '../../components/ui/Button';
import PageInput from '../../components/ui/PageInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import BreadCrumbs from '../../components/BreadCrumbs';
import { ContractContext } from '../../context/ContractContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [contractDatas, setContractDatas] = useState({ data: [], totalPages: 0 });
  const [currency, setCurrency] = useState('VND');
  const nav = useNavigate();

  const { setSelectContractId, setShowDialog, fetchDataById, toggleAddForm, setEdit } =
    useContext(ContractContext);
  const mockProjectData = {
    id: 1,
    name: 'Project ABC',
    track: 'Track XYZ',
    start_date: '2023-01-01',
    created_at: '2023-01-01',
    updated_at: '2023-06-01',
    description: 'This is a description for the project.',
    account: {
      company: 'Company XYZ',
      contact_person: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
      status: 'Active',
      url: 'https://example.com',
      address: '123 Street, City, Country',
    },
    contracts: [
      {
        id: 1,
        title: 'Contract 1',
        signed_date: '2023-02-01',
        total_amount: 1000000,
        status: 'Draft',
      },
      {
        id: 2,
        title: 'Contract 2',
        signed_date: '2023-03-01',
        total_amount: 2000000,
        status: 'Signed',
      },
    ],
  };

  
  useEffect(() => {
    const fetchProjectDetail = async () => {
      setLoading(true);
      try {
        
        setProject(mockProjectData);
        setContractDatas({
          data: mockProjectData.contracts,
          totalPages: 1, 
        });
      } catch {
        toast.error('Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">
        Project not found!
      </div>
    );
  }

  const formatDate = (dateStr) => {
    return dateStr ? dayjs(dateStr).format('DD-MMM-YYYY') : 'N/A';
  };

  return (
    <div className="w-auto h-screen pl-6 pt-2 bg-white">
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>

      <div className="w-full max-h-[85%] flex flex-col lg:flex-row gap-[20px] mt-4 mb-20">
        {}
        <div className="detail-info-container w-[35%] rounded-[16px] p-4">
          <h3 className="font-bold text-base">PROJECT INFORMATION</h3>
          <div className="grid gap-2">
            {}
            <div className="flex w-full gap-3">
              <div className="flex-1 grid gap-2 text-sm">
                {[
                  { label: 'Project name', value: project?.name },
                  { label: 'Track', value: project?.track },
                  { label: 'Start date', value: formatDate(project?.start_date) },
                  { label: 'Created Date', value: formatDate(project?.created_at) },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <label className="mb-1 text-gray-700 font-[550]">{item.label}</label>
                    <InputCopy value={item.value} showButton={false} />
                  </div>
                ))}
              </div>

              <div className="flex-1 grid gap-2 text-sm">
                {[
                  { label: 'Account Company', value: project?.account?.company },
                  { label: 'Account Contact Person', value: project?.account?.contact_person },
                  { label: 'End date', value: formatDate(project?.end_date) },
                  { label: 'Last update', value: formatDate(project?.updated_at) },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <label className="mb-1 text-gray-700 font-[550]">{item.label}</label>
                    <InputCopy value={item.value} showButton={false} />
                  </div>
                ))}
              </div>
            </div>

            {}
            <div key={9} className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700 font-[550]">Description</label>
              <div className="bg-gray-200 text-sm flex items-center justify-between border border-gray-300 rounded-md overflow-hidden p-2">
                {project.description}
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="w-[70%] rounded-[16px] border border-gray-200 shadow-md p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h3 className="font-bold text-base">CONTRACTS</h3>
            <Button value="ADD" backgroundColor="var(--color-primary)" />
          </div>

          <div className="data-container">
            <table>
              <thead>
                <tr className="table-header">
                  <th>Title</th>
                  <th>Signed Date</th>
                  <th>
                    Total Amount&nbsp;
                    <select
                      className="currency-selector"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="VND">VND</option>
                      <option value="USD">USD</option>
                    </select>
                  </th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contractDatas.data.length > 0 ? (
                  contractDatas.data.map((c) => (
                    <tr className="table-row" key={c.id}>
                      <td className="contract-detail-link">
                        <a onClick={() => nav(`/home/contracts/${c.id}`)}>
                          {c.title} <ArrowUpRightFromSquare size={15} />
                        </a>
                      </td>
                      <td>{new Date(c.signed_date).toLocaleDateString()}</td>
                      <td>
                        {currency === 'VND'
                          ? formatCurrency(c.total_amount, 'VND')
                          : formatCurrency(c.total_amount / 24000, 'USD')}
                      </td>
                      <td>{c.status}</td>
                      <td className="action-cell">
                        <button
                          onClick={() => {
                            setEdit(true);
                            fetchDataById(c.id);
                            setSelectContractId(c.id);
                            toggleAddForm(true);
                          }}
                        >
                          <Edit className="edit-btn" color="var(--color-primary)" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectContractId(c.id);
                            setShowDialog(true);
                          }}
                        >
                          <Trash className="delete-btn" color="#C73535" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" style={{ textAlign: 'center' }}>
                      No contracts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end items-center p-2.5 gap-3">
            <PageInput max={contractDatas.totalPages} onChange={(p) => setPage(p)} page={page} />
            <span className="text-sm font-semibold">Total Pages: {contractDatas.totalPages}</span>
            <select
              className="w-[70px] h-[24px] border border-gray-300 focus:outline-none rounded-md"
              onChange={(e) => {
                setPage(1);
                setLimit(Number(e.target.value));
              }}
              value={limit}
            >
              {[10, 30, 50, 70, 100, 200].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
