import { ArrowUpRightFromSquare, Edit, Plus, Search, Trash } from 'lucide-react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Button from '../../components/ui/Button';
import './account.css';
import TextField from '../../components/ui/TextField';
import { useContext, useEffect } from 'react';
import PageInput from '../../components/ui/PageInput';
import Overlays from '../../components/Overlays/Overlays';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ConfirmDialog from '../../components/Dialogs.jsx/ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../context/AccountContext';
const Accounts = () => {
  const nav = useNavigate();
  const {
    page,
    setPage,
    limit,
    setLimit,
    keyword,
    setKeyword,
    accountDatas,
    showAddForm,
    toggleAddForm,
    loading,
    showDialog,
    setShowDialog,
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
  } = useContext(AccountContext);

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  useEffect(() => {
    searchData();
  }, [keyword]);

  return (
    <>
      <ConfirmDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleDelete}
        title="Delete confirm?"
        message="Are you sure you want to perform this action?"
      />
      <Overlays
        title={isEdit ? 'UPDATE ACCOUNT' : 'NEW ACCOUNT'}
        show={showAddForm}
        closeWhenClickOverlay={false}
        onClose={() => toggleAddForm(false)}
      >
        <form className="account-add-form-container" onSubmit={accountCreateSubmit}>
          <div className="input-field-container">
            <div className="label-container">
              <label>Company</label>
              <label className="asterisk" title="Required field">
                {' '}
                *
              </label>
            </div>
            <TextField
              ref={companyInputRef}
              borderRadius={3}
              placeholder={'Company'}
              value={accountCreating.company}
              onChange={(e) =>
                setAccountCreating({
                  ...accountCreating,
                  company: e.target.value,
                })
              }
              error={!accountCreating.company}
            />
          </div>
          <div className="input-field-container">
            <div className="label-container">
              <label>Contact Person</label>
              <label className="asterisk" title="Required field">
                {' '}
                *
              </label>
            </div>
            <TextField
              ref={contactPersonInputRef}
              borderRadius={3}
              placeholder={'Contact Person'}
              value={accountCreating.contact_person}
              onChange={(e) =>
                setAccountCreating({
                  ...accountCreating,
                  contact_person: e.target.value,
                })
              }
              error={!accountCreating.contact_person}
            />
          </div>
          <div className="input-field-container">
            <div className="label-container">
              <label>Email</label>
              <label className="asterisk" title="Required field">
                {' '}
                *
              </label>
            </div>
            <TextField
              ref={emailInputRef}
              type={'email'}
              borderRadius={3}
              placeholder={'examle@gmail.com'}
              value={accountCreating.email}
              onChange={(e) =>
                setAccountCreating({
                  ...accountCreating,
                  email: e.target.value,
                })
              }
              error={
                !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(accountCreating.email)
              }
            />
          </div>
          <div className="input-field-container">
            <div className="label-container">
              <label>Phone</label>
            </div>
            <PhoneInput
              country={'vn'}
              value={accountCreating.phone}
              onChange={(phone) =>
                setAccountCreating({
                  ...accountCreating,
                  phone: phone,
                })
              }
            />
          </div>
          <div className="input-field-container">
            <div className="label-container">
              <label>URL</label>
            </div>
            <TextField
              borderRadius={3}
              placeholder={'https//facebook.com/example.vn'}
              value={accountCreating.url}
              onChange={(e) =>
                setAccountCreating({
                  ...accountCreating,
                  url: e.target.value,
                })
              }
              error={!accountCreating.url.startsWith('https://')}
            />
          </div>
          <div className="input-field-container">
            <div className="label-container">
              <label>Address</label>
            </div>
            <TextField
              borderRadius={3}
              placeholder={'Address'}
              value={accountCreating.address}
              onChange={(e) =>
                setAccountCreating({
                  ...accountCreating,
                  address: e.target.value,
                })
              }
              error={!accountCreating.address}
            />
          </div>
          <div className="form-control-container">
            <Button
              type={'submit'}
              disable={loading}
              value={isEdit ? 'Update' : 'Add'}
              backgroundColor="var(--color-primary)"
            />
          </div>
        </form>
      </Overlays>
      <div className="account-container">
        <div className="breadcrumbs-container">
          <BreadCrumbs />
        </div>
        <div className="controls-container">
          <Button
            value={'ADD'}
            onClick={() => {
              setEdit(false);
              toggleAddForm(true);
            }}
            backgroundColor="var(--color-primary)"
            iconLeft={
              <>
                <Plus size={15} />
              </>
            }
          />
          <TextField
            type={'search'}
            placeholder={'Search by Contact Person, Email,....'}
            width={300}
            borderRadius={50}
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            iconLeft={<Search size={20} color="#666" />}
          />
        </div>
        <div className="data-container">
          <table>
            <thead>
              <tr className="table-header">
                <th>Company</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accountDatas.data ? (
                accountDatas.data.map((a) => (
                  <tr className="table-row" key={a.id}>
                    <td className="account-detail-link">
                      <a
                        onClick={() => {
                          nav(`/home/accounts/${a.id}`);
                        }}
                      >
                        {a.company}
                        <ArrowUpRightFromSquare size={15} />
                      </a>
                    </td>
                    <td>{a.contact_person}</td>
                    <td>
                      <a href={`mailto:${a.email}`}>{a.email}</a>
                    </td>
                    <td>+{a.phone}</td>
                    <td>{new Date(a.created_at).toLocaleDateString()}</td>
                    <td className="action-cell">
                      <button
                        onClick={() => {
                          setEdit(true);
                          fetchDataById(a.id);
                          setSelectAccountId(a.id);
                          toggleAddForm(true);
                        }}
                      >
                        <Edit className="edit-btn" color="var(--color-primary)" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectAccountId(a.id);
                          setShowDialog(true);
                        }}
                      >
                        <Trash className="delete-btn" color="#C73535" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
        <div className="table-controls">
          <div className="table-page-control">
            <PageInput
              max={accountDatas.totalPages}
              onChange={(p) => {
                setPage(p);
              }}
              page={page}
            />
          </div>
          <div>
            <label>Total Pages: {accountDatas.totalPages}</label>
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
    </>
  );
};

export default Accounts;
