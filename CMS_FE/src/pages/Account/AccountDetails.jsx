import React, { useState, useEffect, useContext } from 'react';
import { Trash, Edit, ArrowUpRightFromSquare } from 'lucide-react';
import InputCopy from '../../components/ui/InputCopy';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import Button from '../../components/ui/Button';
import PageInput from '../../components/ui/PageInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BreadCrumbs from '../../components/BreadCrumbs';
import { dateFormater, getBackgroundColor } from '../../services/HelpersService';
import ConfirmDialog from '../../components/Dialogs.jsx/ConfirmDialog';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import { ProjectContext } from '../../context/ProjectContext';

const AccountDetails = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accountDatas, setAccountDatas] = useState({ data: [], totalPages: 0 });
  const nav = useNavigate();
  const {
    page,
    setPage,
    limit,
    setLimit,
    toggleAddForm,
    showDialog,
    setShowDialog,
    setSelectProjectId,
    setEdit,
    handleDelete,
    fetchDataById,
    projectDatas,
    setProjectCreating,
    setAccountSearchKeyword,
  } = useContext(ProjectContext);
  const fetchAccountDetail = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await api.get(`/accounts/details/${id}/?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('cms_token') || ''}`,
        },
      });
      const acc = response.data.account;
      if (!acc) {
        toast.error('Account not found!');
      }
      setAccount(acc);
      setAccountDatas({
        data: acc?.projects || [],
        totalPages: response.data.projectsPagination?.totalPages || 0,
      });
    } catch (error) {
      const errorMessage = error?.message || 'Failed to fetch account details!';
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAccountDetail();
  }, [id, page, limit, projectDatas]);

  useEffect(() => {
    if (!loading && !account) {
      toast.error('Account not found!');
    } else if (loading) {
      toast.info('Loading data...');
    }
  }, [loading, account]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading data...</div>;
  }

  if (!account) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">
        Account not found!
      </div>
    );
  }

  return (
    <div className="w-auto h-screen pl-2 pt-2 bg-white">
      <ProjectForm forDetail={true} show={() => toggleAddForm(true)} />
      <ConfirmDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleDelete}
        title="Delete confirm?"
        message="Are you sure you want to perform this action?"
      />
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="w-full max-h-[85%] flex flex-col lg:flex-row gap-[20px] mt-4 mb-20 p-3">
        <div className="w-[30%] rounded-[16px] border border-gray-300 p-4">
          <h3 className="font-bold text-base">ACCOUNT INFORMATION</h3>
          <div className="grid grid-cols-[auto_auto] gap-3 text-[14px]">
            {[
              { label: 'Email', value: account?.email },
              { label: 'Address', value: account?.address },
              { label: 'Phone Number', value: account?.phone },
              { label: 'Company Name', value: account?.company },
              { label: 'Contact Person', value: account?.contact_person },
              { label: 'URL', value: account?.url, showButton: true },
              { label: 'Status', value: account?.status },
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <label className="mb-1 text-gray-700 font-[550]">{item.label}</label>
                <InputCopy value={item.value} showButton={item.showButton ?? false} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[70%] rounded-[16px] border border-gray-300 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h3 className="font-bold text-base">PROJECT OVERVIEW</h3>
            <Button
              value="ADD"
              backgroundColor="var(--color-primary)"
              onClick={() => {
                setProjectCreating({
                  name: '',
                  account_id: id,
                  description: '',
                  start_date: null,
                  end_date: null,
                  track: 'Planning',
                });
                setAccountSearchKeyword(account?.contact_person);
                setEdit(false);
                toggleAddForm(true);
              }}
            />
          </div>
          <div className="bg-white max-w-full h-[85%] mt-6">
            {accountDatas.data && accountDatas.data.length > 0 ? (
              <div className="w-full max-h-[100%] overflow-y-auto">
                <table className="text-sm w-full border-collapse">
                  <thead className="sticky top-0 bg-[var(--color-primary)] text-white z-10">
                    <tr className="h-[20%]">
                      <th className="p-2.5 border">Project Name</th>
                      <th className="p-2.5 border">Status</th>
                      <th className="p-2.5 border">Start Date</th>
                      <th className="p-2.5 border">End Date</th>
                      <th className="description-header-cell p-2.5 border">Description</th>
                      <th className="p-2.5 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountDatas.data.map((a) => (
                      <tr
                        key={a.id}
                        className="table-row even:bg-[#fcfcfc] odd:bg-white hover:bg-[#f1f1f1]"
                      >
                        <td className="border border-gray-300 project-detail-link">
                          <a
                            onClick={() => {
                              nav(`/home/Projects/${a.id}`);
                            }}
                          >
                            {`${a.name} (${a.id})`}
                            <ArrowUpRightFromSquare size={15} />
                          </a>
                        </td>
                        <td className="p-2 border border-gray-300 text-center">
                          <div
                            className="text-white rounded-2xl py-0.5 font-semibold"
                            style={{
                              backgroundColor: getBackgroundColor(a.track),
                            }}
                          >
                            {a.track}
                          </div>
                        </td>
                        <td className="p-2 border border-gray-300 text-center">
                          {dateFormater(a.start_date)}
                        </td>
                        <td className="p-2 border border-gray-300 text-center">
                          {dateFormater(a.end_date)}
                        </td>
                        <td className="description-cell p-2 border border-gray-300">
                          <div className="line-clamp-3">{a.description}</div>
                        </td>
                        <td className="p-2 border border-gray-300 text-center">
                          <button>
                            <Edit
                              className="bg-transparent m-[2px] edit-btn"
                              color="var(--color-primary)"
                              size={18}
                              onClick={() => {
                                setEdit(true);
                                fetchDataById(a.id);
                                setSelectProjectId(a.id);
                                toggleAddForm(true);
                              }}
                            />
                          </button>
                          <button>
                            <Trash
                              className="bg-transparent m-[2px] delete-btn"
                              color="#C73535"
                              size={18}
                              onClick={() => {
                                setSelectProjectId(a.id);
                                setShowDialog(true);
                              }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                {' '}
                <table className="text-sm w-full border-collapse">
                  <thead className="sticky top-0 bg-[var(--color-primary)] text-white z-10">
                    <tr className="h-[20%]">
                      <th className="p-2.5 border">Project Name</th>
                      <th className="p-2.5 border">Status</th>
                      <th className="p-2.5 border">Start Date</th>
                      <th className="p-2.5 border">End Date</th>
                      <th className="description-header-cell p-2.5 border">Description</th>
                      <th className="p-2.5 border">Action</th>
                    </tr>
                  </thead>
                </table>
                <div className="flex justify-center items-center text-lg w-full h-[100px] bg-gray-100 border border-gray-300">
                  No data
                </div>
              </>
            )}
            <div className="flex justify-end items-center p-2.5 gap-5">
              <PageInput max={accountDatas.totalPages} onChange={(p) => setPage(p)} page={page} />
              <span className="text-sm font-semibold">Total Pages: {accountDatas.totalPages}</span>
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
    </div>
  );
};

export default AccountDetails;
