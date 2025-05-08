import React, { useState, useEffect } from 'react';
import { Trash, Edit, Search } from 'lucide-react';
import api from '../../services/api.js';
import Button from '../../components/ui/Button';
import PageInput from '../../components/ui/PageInput';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../components/Dialogs.jsx/ConfirmDialog.jsx';
import Overlays from '../../components/Overlays/Overlays.jsx';
import TextField from '../../components/ui/TextField.jsx';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import BreadCrumbs from '../../components/BreadCrumbs';
import { Tooltip } from 'react-tooltip';
import { validateUserUpdate } from '../../utils/validators.js';

const headerAPI = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('cms_token') || ''}`,
  },
};

const UserPage = () => {
  const [userData, setUserData] = useState({ data: [], totalPages: 0 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const [userUpdating, setUserUpdating] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    role_id: '',
    is_active: false,
  });
  const [showUserForm, setShowUserForm] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [errors, setErrors] = useState({});

  const fetchAllUsers = async () => {
    try {
      const response = await api.get(`/users/getAllUsers?page=${page}&limit=${limit}`, headerAPI);
      setUserData(response.data);
    } catch (error) {
      toast.error(`Error: ${error?.message || 'Failed to fetch users'}`);
    }
  };

  const searchUsers = async () => {
    try {
      const response = await api.get(
        `/users/searchUser?query=${encodeURIComponent(keyword)}`,
        headerAPI
      );
      setUserData(response.data);
    } catch (error) {
      toast.error(`Error: ${error?.message || 'Failed to search users'}`);
    }
  };

  useEffect(() => {
    if (keyword.trim()) {
      searchUsers();
    } else {
      fetchAllUsers();
    }
  }, [page, limit, keyword]);

  const handleEditUser = (user) => {
    setUserIdToEdit(user.id);
    setUserUpdating(user);
    setShowUserForm(true);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateUserUpdate({
      fullName: userUpdating.full_name,
      email: userUpdating.email,
      phone: userUpdating.phone,
    });

    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.put(`/users/updateUser/${userIdToEdit}`, userUpdating, headerAPI);
      toast.success('User updated successfully');

      const response = await api.get(`/users/getAllUsers?page=${page}&limit=${limit}`, headerAPI);
      setUserData(response.data);

      setShowUserForm(false);
      setUserIdToEdit(null);

      setUserUpdating((prev) => ({
        ...prev,
        full_name: '',
        email: '',
        phone: '',
        address: '',
        role_id: '',
        is_active: false,
      }));

      setErrors({});
    } catch (error) {
      if (error.response?.data?.message?.includes('Email already exists')) {
        setErrors({ email: 'This email is already in use. Please choose another one.' });
      } else {
        toast.error(`Error updating user: ${error?.message || 'Unknown error'}`);
      }
    }
  };

  const handleDeleteClick = (id) => {
    if (!id) {
      toast.error('Error: Invalid User Id');
      return;
    }
    setUserIdToDelete(id);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDeactivate = async () => {
    if (!userIdToDelete) {
      toast.error('Error: No user ID found');
      return;
    }

    try {
      await api.put(`/users/deactivateUserById/${userIdToDelete}`, { is_active: 0 }, headerAPI);
      toast.success('User deactivated successfully');

      const response = await api.get(`/users/getAllUsers?page=${page}&limit=${limit}`, headerAPI);
      setUserData(response.data);

      setOpenConfirmDialog(false);
      setUserIdToDelete(null);
    } catch (error) {
      toast.error(`Error deactivating user: ${error?.message || 'Unknown error'}`);
    }
  };

  return (
    <>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={handleConfirmDeactivate}
        title="Delete Confirmation"
        message="Are you sure you want to delete this item"
      />
      <Overlays
        title={'UPDATE USER'}
        show={showUserForm}
        closeWhenClickOverlay={false}
        onClose={() => setShowUserForm(false)}
      >
        <form
          className="w-[450px] mx-auto bg-white rounded-2xl "
          onSubmit={handleUserSubmit}
          noValidate
        >
          <div className="grid grid-cols-5 gap-3">
            <div className="flex flex-col col-span-2">
              <label className="mb-1 text-sm text-gray-900">
                Full Name <span className="text-red-500">*</span>
              </label>
              <TextField
                placeholder="Full Name"
                value={userUpdating.full_name}
                onChange={(e) => setUserUpdating({ ...userUpdating, full_name: e.target.value })}
                borderRadius={3}
                error={!userUpdating.full_name}
              />
              {errors.full_name && <span className="text-red-500 text-xs">{errors.full_name}</span>}
            </div>

            <div className="flex flex-col col-span-3">
              <label className="mb-1 text-sm text-gray-900">
                Email <span className="text-red-500">*</span>
              </label>
              <TextField
                type="email"
                placeholder="example@gmail.com"
                value={userUpdating.email}
                onChange={(e) => setUserUpdating({ ...userUpdating, email: e.target.value })}
                borderRadius={3}
                error={!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userUpdating.email)}
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mt-3">
            <div className="flex flex-col col-span-2">
              <label className="mb-1 text-sm text-gray-900">Role</label>
              <select
                className="p-1.5 border-1 border-[#ACB1B5] rounded-[3px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                value={userUpdating.role_id}
                onChange={(e) => setUserUpdating({ ...userUpdating, role_id: e.target.value })}
              >
                <option value="1">Admin</option>
                <option value="2">Manager</option>
                <option value="3">Employee</option>
              </select>
              {errors.role_id && <span className="text-red-500 text-xs">{errors.role_id}</span>}
            </div>

            <div className="flex flex-col col-span-2">
              <label className="mb-1 text-sm text-gray-900">
                Phone<span className="text-red-500">*</span>
              </label>
              <PhoneInput
                inputStyle={{
                  width: '100%',
                  height: '35px',
                  border: '1px solid rgb(172, 177, 181)',
                  borderRadius: '3px',
                }}
                country={'vn'}
                value={userUpdating.phone}
                onChange={(phone) => setUserUpdating({ ...userUpdating, phone })}
              />
              {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
            </div>
          </div>

          <div className="flex flex-col mt-3">
            <label className="mb-1 text-sm text-gray-900">Address</label>
            <textarea
              placeholder="Address"
              value={userUpdating.address}
              onChange={(e) => setUserUpdating({ ...userUpdating, address: e.target.value })}
              className="border-1 border-[#ACB1B5] rounded-[3px] px-2 py-1 text-sm resize-none overflow-hidden"
              style={{
                minHeight: '1.5rem',
                maxHeight: '10rem',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
              }}
            />

            {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
          </div>

          <div className="float-right mt-6">
            <Button
              type="submit"
              value={userIdToEdit ? 'Update User' : 'Register User'}
              backgroundColor="var(--color-primary)"
            />
          </div>
        </form>
      </Overlays>

      <div className="w-[100%] h-full p-2 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="breadcrumbs-container">
            <BreadCrumbs />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="float-left ml-4">USER MANAGEMENT</div>
          <div className="float-right mb-4">
            <TextField
              type="search"
              placeholder="Search by Name, Email."
              width={300}
              borderRadius={50}
              style={{
                float: 'right',
              }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              iconLeft={<Search size={20} color="#666" />}
            />
          </div>
        </div>
        <div className="bg-white max-w-full h-[85%] mt-2 ">
          {userData.data.length > 0 ? (
            <div className="w-full max-h-[500px] overflow-y-auto ">
              <table className="text-sm w-full border-collapse border border-gray-500 ">
                <thead className="sticky top-0 bg-[var(--color-primary)] text-white z-10 ">
                  <tr>
                    <th className="border border-gray-300 p-[10px] text-center text-[13px]">
                      Full Name
                    </th>
                    <th className="border border-gray-300 p-[10px] text-center text-[13px]">
                      Email
                    </th>
                    <th className="border border-gray-300 p-[10px] text-center text-[13px]">
                      Role
                    </th>
                    <th className="border border-gray-300 p-[10px] text-center text-[13px]">
                      Phone
                    </th>
                    <th className="border border-gray-300 p-[10px] text-center text-[13px] w-[20%]">
                      Address
                    </th>
                    <th className="border border-gray-300 p-[10px] text-center text-[13px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData.data.map((user) => (
                    <tr
                      key={user.id}
                      className={`even:bg-[#fcfcfc] odd:bg-white hover:bg-[#f1f1f1] ${!user.is_active ? 'opacity-50' : ''}`}
                    >
                      <td className="border border-gray-300 text-center text-[13px]">
                        {user.full_name}
                      </td>
                      <td className="border border-gray-300 text-center text-[13px]">
                        {user.email}
                      </td>
                      <td className="p-2 border border-gray-300 text-center text-[13px]">
                        {user.role_id === 1
                          ? 'Admin'
                          : user.role_id === 2
                            ? 'Manage'
                            : user.role_id === 3
                              ? 'Employee'
                              : 'Unknown'}
                      </td>
                      <td className="border border-gray-300 text-center text-[13px]">
                        +{user.phone}
                      </td>
                      <td className="border border-gray-300 text-center text-[13px] max-w-[150px]">
                        <div
                          data-tooltip-id={`tooltip-${user.id}`}
                          data-tooltip-content={user.address}
                        >
                          <div className="truncate whitespace-nowrap overflow-hidden max-w-auto pl-4">
                            {user.address}
                          </div>
                        </div>
                        {user.address.length > 35 && (
                          <Tooltip
                            id={`tooltip-${user.id}`}
                            place="top"
                            effect="solid"
                            className="z-50 w-auto max-w-xs break-words whitespace-normal"
                          >
                            {user.address}
                          </Tooltip>
                        )}
                      </td>
                      <td className="border border-gray-300 text-center text-[13px]">
                        {!user.is_active ? (
                          <span className="text-red-500 text-sm font-semibold">
                            Account has been disabled
                          </span>
                        ) : (
                          <>
                            <button>
                              <Edit
                                onClick={() => handleEditUser(user)}
                                className="bg-transparent m-[2px] edit-btn"
                                color="var(--color-primary)"
                                size={18}
                              />
                            </button>
                            <button>
                              <Trash
                                onClick={() => handleDeleteClick(user.id)}
                                className="bg-transparent m-[2px] delete-btn"
                                color="#C73535"
                                size={18}
                              />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center text-lg w-full h-[100px] bg-gray-100 border-gray-300">
              No data available
            </div>
          )}
          <div className="table-controls">
            <div className="table-page-control">
              <PageInput
                max={userData.totalPages}
                onChange={(p) => {
                  setPage(p);
                }}
                page={page}
              />
            </div>
            <div>
              <label>Total Pages: {userData.totalPages}</label>
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
    </>
  );
};

export default UserPage;
