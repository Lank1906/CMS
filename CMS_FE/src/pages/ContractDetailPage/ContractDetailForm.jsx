import { useEffect, useRef, useState } from 'react';
import Overlays from '../../components/Overlays/Overlays';
import TextField from '../../components/ui/TextField';
import Button from '../../components/ui/Button';
import {
  searchUsers,
  getUserLatestRole,
  getAllContractRoles,
  addContractStaff,
  getUsers,
} from '../../services/ContractDetailService';
import { toast } from 'react-toastify';
import { ChevronDown } from 'lucide-react';
import './contractdetail.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AddContractStaffOverlay = ({
  show,
  onClose,
  contractId,
  updateStaffs,
  preselectedRoleId,
  isViewOnly,
  staffData,
}) => {
  const [keyword, setKeyword] = useState(staffData?.full_name || '');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(staffData || null);
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [historyRole, setHistoryRole] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    if (preselectedRoleId && preselectedRoleId !== 0) {
      setSelectedRoleId(preselectedRoleId);
    }
  }, [preselectedRoleId]);

  useEffect(() => {
    const fetchRolesAndUsers = async () => {
      const resRoles = await getAllContractRoles();
      setRoles(resRoles?.data || []);
      const resUsers = await getUsers();
      setUsers(resUsers.data || []);
    };
    fetchRolesAndUsers();
  }, []);

  useEffect(() => {
    if (!keyword) return;
    const fetchUsers = async () => {
      const res = await searchUsers(keyword);
      setUsers(res?.data || []);
    };
    fetchUsers();
  }, [keyword]);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setKeyword(user.full_name);
    setShowDropdown(false);
    roleHistory(user.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedRoleId) {
      toast.error('Missing user or role');
      return;
    }

    try {
      const res = await addContractStaff({
        contract_id: contractId,
        user_id: selectedUser.id,
        contract_role_id: selectedRoleId,
      });

      const selectedRole = roles.find((r) => r.id == selectedRoleId);
      const roleName = selectedRole?.name || 'Unknown';

      updateStaffs(
        {
          id: res.data.id,
          user_id: selectedUser.id,
          full_name: selectedUser.full_name,
          email: selectedUser.email,
        },
        roleName + '-' + selectedRoleId
      );

      toast.success(res.message || 'Added successfully');

      handleClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding staff');
    }
  };

  const roleHistory = async (id) => {
    const res = await getUserLatestRole(id);
    setHistoryRole(res?.role || null);
  };

  useEffect(() => {
    if (staffData) {
      setSelectedUser(staffData);
      setSelectedRoleId(preselectedRoleId);
      setKeyword(staffData.full_name);

      roleHistory(staffData.id);
    }
  }, [staffData]);

  const handleClose = () => {
    setSelectedUser(null);
    setHistoryRole(null);
    setKeyword('');
    setShowDropdown(false);
    onClose();
  };

  return (
    <Overlays
      title={isViewOnly ? 'View User' : 'Assign Resource'}
      show={show}
      onClose={handleClose}
      closeWhenClickOverlay={true}
    >
      <form className="p-2 grid grid-cols-2 gap-2 text-sm relative" onSubmit={handleSubmit}>
        <div className="col-span-2">
          <label className="block font-medium mb-1">User (Full name)</label>
          <TextField
            borderRadius={5}
            placeholder="Search user by name/email/phone"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setShowDropdown(true);
            }}
            onClick={() => setShowDropdown(!showDropdown)}
            iconRight={<ChevronDown size={16} />}
            disabled={isViewOnly}
          />
          {showDropdown && !isViewOnly && (
            <div
              ref={dropdownRef}
              className="absolute z-10 w-full bg-white shadow border max-h-52 overflow-auto mt-1 rounded"
            >
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  >
                    {user.full_name} - {user.email} - {user.phone}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-gray-500">No users found</div>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input className="input-1" value={selectedUser?.email || ''} disabled={isViewOnly} />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <PhoneInput
            country="vn"
            value={selectedUser?.phone || ''}
            disabled={isViewOnly}
            inputStyle={{ width: '225px' }}
          />
        </div>

        <div className="col-span-2">
          <label className="block font-medium mb-1">Role</label>
          <select
            className="w-full border px-3 py-2 rounded text-sm"
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value)}
          >
            <option value="">Select role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block font-medium mb-1">History Role</label>
          <div className="border rounded px-3 py-2 bg-gray-100 min-h-[40px] space-y-1">
            {Array.isArray(historyRole) && historyRole.length > 0 ? (
              historyRole.map((item) => (
                <div key={item.role_id} className="flex justify-between">
                  <span>
                    <strong>{item.role_name}</strong>
                  </span>
                  <span>x{item.count}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No data</div>
            )}
          </div>
        </div>

        <div className="col-span-2 text-right">
          {!isViewOnly && (
            <Button value="Add Staff" type="submit" backgroundColor="var(--color-primary)" />
          )}
        </div>
      </form>
    </Overlays>
  );
};

export default AddContractStaffOverlay;
