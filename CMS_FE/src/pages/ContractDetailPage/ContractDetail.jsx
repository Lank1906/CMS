import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, UserPlus, Eye, Trash2 } from 'lucide-react';
import dayjs from 'dayjs';
import BreadCrumbs from '../../components/BreadCrumbs';
import InputCopy from '../../components/ui/InputCopy';
import {
  getContractById,
  getContractStaffByContractId,
  deleteContractStaff,
} from '../../services/ContractDetailService';
import Button from '../../components/ui/Button';
import ConfirmDialog from '../../components/Dialogs.jsx/ConfirmDialog';
import { toast } from 'react-toastify';
import AddContractStaffOverlay from './ContractDetailForm';
import PageInput from '../../components/ui/PageInput';
import TextField from '../../components/ui/TextField';

const ContractDetails = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandAccount, setExpandAccount] = useState(false);
  const [contractStaffs, setContractStaffs] = useState([]);
  const [expandedRoles, setExpandedRoles] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [showStaffOverlay, setShowStaffOverlay] = useState(false);
  const [preselectedRoleId, setPreselectedRoleId] = useState(0);
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(0);

  const formatDate = (dateStr) => (dateStr ? dayjs(dateStr).format('DD-MMM-YYYY') : 'N/A');
  const formatNumber = (val) => (typeof val === 'number' ? val.toLocaleString() : 'N/A');

  const toggleRole = (role) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [role]: !prev[role],
    }));
  };

  useEffect(() => {
    if (!id) return;
    const fetchContract = async () => {
      try {
        const response = await getContractById(id);
        setContract(response?.data);
        fetchContractStaffs(page, limit);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [id, page]);

  const fetchContractStaffs = async (page, rowsPerPage) => {
    try {
      const response = await getContractStaffByContractId(id, page, rowsPerPage);
      setContractStaffs(response.data);
      setTotalPage(response.totalPages);
      setPage(page);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedStaffId) return;

    try {
      await deleteContractStaff(selectedStaffId);
      toast.success('Staff deleted successfully');
      setContractStaffs((prev) => {
        const updated = {};
        for (const [role, users] of Object.entries(prev)) {
          const filtered = users.filter((u) => u.id !== selectedStaffId);
          if (filtered.length > 0) updated[role] = filtered;
        }
        return updated;
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowDialog(false);
      setSelectedStaffId(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading data...</div>;
  }

  if (!contract) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        Contract not found!
      </div>
    );
  }

  const {
    title = 'N/A',
    signed_date,
    total_amount,
    working_days,
    start_date,
    end_date,
    status = 'N/A',
    Project: project,
  } = contract;

  const account = project?.account;

  return (
    <>
      <ConfirmDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleDelete}
        title="Delete confirm?"
        message="Are you sure you want to perform this action?"
      />
      <div className="w-auto h-screen pl-6 pt-2 bg-white">
        <div className="breadcrumbs-container">
          <BreadCrumbs />
        </div>

        <div className="flex flex-col lg:flex-row gap-[20px] h-[calc(100vh-100px)] pr-4 pb-4">
          <div className="w-full lg:w-[40%] h-full rounded-[16px] border border-gray-300flex p-4  flex-col overflow-hidden">
            <h3 className="font-bold text-base mb-3">CONTRACT INFORMATION</h3>
            <div className="flex-1 overflow-auto pr-1">
              <div className="grid grid-cols-[auto-auto] gap-2 text-[14px]">
                <div className="col-span-2 flex flex-col">
                  <label className="mb-1 text-gray-700 font-[550]">Title</label>
                  <InputCopy value={title} />
                </div>

                {[
                  { label: 'Signed Date', value: formatDate(signed_date) },
                  { label: 'Start Date', value: formatDate(start_date) },
                  { label: 'End Date', value: formatDate(end_date) },
                  { label: 'Working Days', value: working_days ?? 'N/A' },
                  { label: 'Total Amount', value: `${formatNumber(total_amount)} VND` },
                  { label: 'Status', value: status },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <label className="mb-1 text-gray-700 font-[550]">{item.label}</label>
                    <TextField
                      value={item.value}
                      borderRadius={5}
                      backgroundColor="rgb(229 231 235 / var(--tw-bg-opacity))"
                    />
                  </div>
                ))}

                {account && (
                  <div className="col-span-2 flex justify-between items-center border rounded px-3 py-2 bg-gray-50 mt-4">
                    <div>
                      <p className="font-semibold text-sm text-gray-800">
                        Company: {account.company}
                      </p>
                      <p className="text-sm text-gray-600">Project: {project?.name}</p>
                    </div>
                    <button onClick={() => setExpandAccount(!expandAccount)}>
                      {expandAccount ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                )}

                {expandAccount && account && (
                  <div className="col-span-2 mt-2 p-3 border rounded bg-white space-y-3 overflow-y-auto">
                    <div>
                      <label className="block text-gray-700 font-[550] mb-1">Contact Person</label>
                      <InputCopy value={account.contact_person ?? 'N/A'} />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-[550] mb-1">Email</label>
                      <InputCopy value={account.email ?? 'N/A'} />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-[550] mb-1">Phone</label>
                      <InputCopy value={account.phone ?? 'N/A'} />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-[550] mb-1">
                        Project Description
                      </label>
                      <InputCopy value={project?.description ?? 'N/A'} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[60%] h-full rounded-[16px] border border-dashed border-gray-300 p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 className="font-bold text-base">CONTRACT OVERVIEW</h3>
              <Button
                value="ADD"
                backgroundColor="var(--color-primary)"
                onClick={() => {
                  setShowStaffOverlay(true);
                  setEdit(true);
                }}
              />
            </div>
            <div className="bg-white max-w-full h-[85%] mt-6">
              <table className="w-full table-fixed text-sm border-collapse mt-4">
                <thead className="bg-[var(--color-primary)] text-white">
                  <tr>
                    <th className="p-2 border w-[40%]">Name</th>
                    <th className="p-2 border w-[40%]">Email</th>
                    <th className="p-2 border w-[20%] text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(contractStaffs).length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center p-4 text-gray-500 italic">
                        No contract staff available.
                      </td>
                    </tr>
                  ) : (
                    Object.entries(contractStaffs).map(([role, users]) => (
                      <React.Fragment key={role}>
                        <tr className="bg-gray-100 cursor-pointer" onClick={() => toggleRole(role)}>
                          <td colSpan={2} className="p-2 font-semibold">
                            {role.split('-')[0]}
                          </td>
                          <td className="p-2 flex justify-between items-center gap-2">
                            <button
                              title="Add Employee"
                              className="p-1.5 border rounded-md hover:bg-gray-100 active:bg-gray-200 transition"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreselectedRoleId(role.split('-')[1]);
                                setEdit(true);
                                setShowStaffOverlay(true);
                              }}
                            >
                              <UserPlus size={16} className="text-blue-600" />
                            </button>
                            <button
                              title={expandedRoles[role] ? 'Collapse' : 'Expand'}
                              className="p-1.5 border rounded-md hover:bg-gray-100 active:bg-gray-200 transition"
                            >
                              {expandedRoles[role] ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </button>
                          </td>
                        </tr>

                        {expandedRoles[role] &&
                          users.map((user) => (
                            <tr key={user.id}>
                              <td className="p-2 border truncate">{user.full_name}</td>
                              <td className="p-2 border truncate">{user.email}</td>
                              <td className="p-2 border flex justify-center items-center gap-2">
                                <button
                                  title="View Employee"
                                  className="p-1.5 border rounded-md hover:bg-gray-100 transition"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreselectedRoleId(role.split('-')[1]);
                                    setEdit(false);
                                    const updatedUser = { ...user, id: user.user_id };
                                    delete updatedUser.user_id;
                                    setUser(updatedUser);
                                    setShowStaffOverlay(true);
                                  }}
                                >
                                  <Eye size={16} className="text-blue-600" />
                                </button>
                                <button
                                  title="Delete Employee"
                                  className="p-1.5 border rounded-md hover:bg-gray-100 transition"
                                  onClick={() => {
                                    setSelectedStaffId(user.id);
                                    setShowDialog(true);
                                  }}
                                >
                                  <Trash2 size={16} className="text-red-600" />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>

              <div className="table-controls">
                <div className="table-page-control">
                  <PageInput
                    max={totalPage}
                    onChange={(p) => {
                      setPage(p);
                    }}
                    page={page}
                  />
                </div>
                <div>
                  <label>Total Pages: {totalPage}</label>
                </div>
                <div className="rows-select">
                  <select
                    onChange={(e) => {
                      setPage(1);
                      setLimit(e.target.value);
                    }}
                  >
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="70">70</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddContractStaffOverlay
        show={showStaffOverlay}
        onClose={() => {
          setShowStaffOverlay(false);
          setUser(null);
        }}
        contractId={id}
        updateStaffs={(user, roleName) => {
          setContractStaffs((prev) => {
            const updated = { ...prev };
            if (!updated[roleName]) updated[roleName] = [];
            if (!updated[roleName].some((u) => u.id === user.id)) {
              updated[roleName].push(user);
            }
            return updated;
          });
        }}
        preselectedRoleId={preselectedRoleId}
        isViewOnly={!edit}
        staffData={user}
      />
    </>
  );
};

export default ContractDetails;
