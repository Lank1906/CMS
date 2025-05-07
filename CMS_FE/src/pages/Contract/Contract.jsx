import React, { useState, useEffect, useContext } from 'react';
import { ArrowUpRightFromSquare, Trash, Edit, Search } from 'lucide-react';
import InputCopy from '../../components/ui/InputCopy';
import { useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import PageInput from '../../components/ui/PageInput';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import BreadCrumbs from '../../components/BreadCrumbs';
import { ContractContext } from '../../context/ContractContext';
import ContractForm from '../../components/ContractForm/ContractForm';
import { formatCurrency } from '../../utils/formatCurrency';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../components/Dialogs.jsx/ConfirmDialog';
const Contract = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    fetchProjectDataById,
    fetchContractsByProject,
    projectDetail,
    contractDatas,
    setLimit: setCtxLimit,
    toggleAddForm,
    contractCreating,
    setEdit,
    setContractCreating,
    deleteContract,
    setSelectContractId,
    selectContractId,
    fetchContractDataById
  } = useContext(ContractContext);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!id || id === 0) return;
    fetchProjectDataById(id);
    fetchContractsByProject(id, page, limit);
  }, [id, page, limit]);

  useEffect(() => {
    if (!selectContractId) return;
    fetchContractDataById(selectContractId);
  }, [selectContractId]);

  const formatDate = (dateStr) => {
    return dateStr ? dayjs(dateStr).format('M/D/YYYY') : 'N/A';
  };

  const handleAddClick = () => {
    setEdit(false);
    setContractCreating({
      title: null,
      project_id: Number(id),
      signed_date: '',
      total_amount: '',
      working_days: '',
      start_date: '',
      end_date: '',
      status: 'Draft',
    });
    toggleAddForm(true);
  };



  const handleEditClick = (contractId) => {
    setEdit(true);
    setSelectContractId(contractId);
    toggleAddForm(true);
  };
  return (
    <>
      <ConfirmDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={deleteContract}
        title="Delete confirm?"
        message="Are you sure you want to perform this action?"
      />
      <div className="w-auto h-screen pl-6 pt-2 bg-white">
        <div className="breadcrumbs-container">
          <BreadCrumbs />
        </div>
        <div className="w-full max-h-[85%] flex flex-col lg:flex-row gap-[20px] mt-4 mb-20">
          <div className="detail-info-container w-[35%] rounded-[16px] border border-gray-200 shadow-md p-4">
            <h3 className="font-bold text-base">PROJECT INFORMATION</h3>
            <div className="grid gap-2">
              <div className="flex w-full gap-3">
                <div className="flex-1 grid gap-2 text-sm">
                  {[
                    { label: 'Project name', value: projectDetail?.name },
                    { label: 'Track', value: projectDetail?.track },
                    { label: 'Start date', value: formatDate(projectDetail?.start_date) },
                    { label: 'Created Date', value: formatDate(projectDetail?.created_at) },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col border-b-300 pb-2">
                      <label className="mb-1 text-gray-700 font-[550]">{item.label}</label>
                      <InputCopy value={item.value} showButton={item.showButton ?? false} />
                    </div>
                  ))}
                </div>
                <div className="flex-1 grid gap-2 text-sm">
                  {[
                    { label: 'Account Company', value: projectDetail?.account?.company },
                    { label: 'Account Contact Person', value: projectDetail?.account?.contact_person },
                    { label: 'End date', value: formatDate(projectDetail?.end_date) },
                    { label: 'Last update', value: formatDate(projectDetail?.updated_at) },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col border-b-300 pb-2">
                      <label className="mb-1 text-gray-700 font-[550]">{item.label}</label>
                      <InputCopy value={item.value} showButton={item.showButton ?? false} />
                    </div>
                  ))}
                </div>
              </div>
              <div key={9} className="flex flex-col w-full">
                <label className="mb-1 text-sm text-gray-700 font-[550]">Description</label>
                <div className="bg-gray-200 text-sm border border-gray-300 rounded-md p-2
               whitespace-pre-wrap break-words w-full"
                >
                  {projectDetail?.description}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[70%] rounded-[16px] border border-gray-200 shadow-md p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 className="font-bold text-base">CONTRACTS</h3>
              <Button value="ADD" backgroundColor="var(--color-primary)" onClick={handleAddClick} />
            </div>
            <ContractForm contractData={contractCreating} />
            <div className="bg-white max-w-full h-[85%] mt-6">
              {contractDatas.data && contractDatas.data.length > 0 ? (
                <div className="w-full max-h-[100%] overflow-y-auto">
                  <table className="text-sm w-full border-collapse">
                    <thead className="sticky top-0 bg-[var(--color-primary)] text-white z-10">
                      <tr className="h-[20%]">
                        <th className="p-2  text-center border">Title</th>
                        <th className="p-2  text-center border">Signed Date</th>
                        <th className="p-2  text-center border">Total Amount</th>
                        <th className="p-2  text-center border">Working Days</th>
                        <th className="p-2  text-center border">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contractDatas.data.map((contract) => (
                        <tr key={contract.id} className="table-row even:bg-[#fcfcfc] odd:bg-white hover:bg-[#f1f1f1]">
                          <td className="p-2 border border-gray-300 text-center">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                nav(`/home/contracts/${contract.id}`); 
                              }}
                              className="text-blue-600 underline hover:opacity-80 inline-flex items-center gap-1"
                            >
                              {contract.title}
                              <ArrowUpRightFromSquare size={14} />
                            </a>
                          </td>
                          <td className="p-2 border border-gray-300 text-center">{formatDate(contract.signed_date)}</td>
                          <td className="p-2 border border-gray-300 text-center">{formatCurrency(contract.total_amount)}</td>
                          <td className="p-2 border border-gray-300 text-center">{contract.working_days}</td>
                          <td className="p-2 border border-gray-300 text-center">
                            <button onClick={() => handleEditClick(contract.id)}>
                              <Edit className="bg-transparent m-[2px] edit-btn" color="var(--color-primary)" size={18} />
                            </button>
                            <button onClick={() => { setSelectContractId(contract.id); setShowDialog(true); }}>
                              <Trash className="bg-transparent m-[2px] delete-btn" color="#C73535" size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  <div>No contracts found.</div>
                </>
              )}
              <div className="flex justify-end items-center p-2.5 gap-3">
                <PageInput max={contractDatas.totalPages} onChange={(p) => setPage(p)} page={page} />
                <span className="text-sm font-semibold">Total Pages: {contractDatas.totalPages}</span>
                <select
                  className="w-[70px] h-[24px] border border-gray-300 focus:outline-none rounded-md"
                  onChange={(e) => {
                    setPage(1);
                    setLimit(Number(e.target.value));
                    setCtxLimit(Number(e.target.value));
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
      </div>
    </>

  );
};

export default Contract;
