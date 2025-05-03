import { ArrowUpRightFromSquare, Edit, Plus, Search, Trash } from 'lucide-react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Button from '../../components/ui/Button';
import './contract.css';
import TextField from '../../components/ui/TextField';
import { useContext, useEffect } from 'react';
import PageInput from '../../components/ui/PageInput';
import Overlays from '../../components/Overlays/Overlays';
import 'react-phone-input-2/lib/style.css';
import ConfirmDialog from '../../components/Dialogs.jsx/ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { ContractContext } from '../../context/ContractContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { useState } from 'react';
import { fetchData } from '../../services/ContractService';
const Contracts = () => {
  const [currency, setCurrency] = useState('VND', 'USD');
  const nav = useNavigate();
  const {
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
    setSelectContractId,
    isEdit,
    setEdit,
    handleDelete,
    searchData,
    contractCreateSubmit,
    
    fetchDataById,
    contractCreating,
    setContractCreating,
    titleInputRef,
    signedDateInputRef,
    projectIdInputRef,
    totalAmountInputRef,
    workingDaysInputRef,
    startDateInputRef,
    endDateInputRef,
  } = useContext(ContractContext);

  useEffect(() => {
    fetchData(
      page,
      limit,
      (data) => setContractDatas(data),
      (status) => setLoading(status)
    );
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
        title={isEdit ? 'UPDATE CONTRACT' : 'NEW CONTRACT'}
        show={showAddForm}
        closeWhenClickOverlay={false}
        onClose={() => {
          toggleAddForm(false);
          setContractCreating({
            title: '',
            project_id: '',
            signed_date: '',
            total_amount: '',
            working_days: '',
            start_date: '',
            end_date: '',
            status: 'Draft',
          });
        }}
      >
        <form className="contract-add-form-container" onSubmit={contractCreateSubmit}>
          <div className="form-row">
            <div className="input-field-container">
              <div className="label-container">
                <label>Title</label>
                <label className="asterisk">*</label>
              </div>
              <TextField
                ref={titleInputRef}
                borderRadius={3}
                placeholder="Contract Title"
                value={contractCreating.title}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, title: e.target.value })
                }
              />
            </div>
            <div className="input-field-container">
              <div className="label-container">
                <label>Project ID</label>
                <label className="asterisk">*</label>
              </div>
              <TextField
                ref={projectIdInputRef}
                borderRadius={3}
                placeholder="Project ID"
                value={contractCreating.project_id}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, project_id: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-field-container">
              <div className="label-container">
                <label>Signed Date</label>
              </div>
              <TextField
                ref={signedDateInputRef}
                type="date"
                borderRadius={3}
                value={contractCreating.signed_date}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, signed_date: e.target.value })
                }
              />
            </div>
            <div className="input-field-container">
              <div className="label-container">
                <label>Total Amount</label>
              </div>
              <TextField
                ref={totalAmountInputRef}
                type="number"
                borderRadius={3}
                placeholder="Total Amount"
                value={contractCreating.total_amount}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, total_amount: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-field-container">
              <div className="label-container">
                <label>Working Days</label>
              </div>
              <TextField
                ref={workingDaysInputRef}
                type="number"
                borderRadius={3}
                placeholder="Working Days"
                value={contractCreating.working_days}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, working_days: e.target.value })
                }
              />
            </div>
            <div className="input-field-container">
              <div className="label-container">
                <label>Status</label>
              </div>
              <select
                className="form-select"
                value={contractCreating.status}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, status: e.target.value })
                }
              >
                <option value="Draft">Draft</option>
                <option value="WaitingForApproval">Waiting for Approval</option>
                <option value="Signed">Signed</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-field-container">
              <div className="label-container">
                <label>Start Date</label>
              </div>
              <TextField
                ref={startDateInputRef}
                type="date"
                borderRadius={3}
                value={contractCreating.start_date}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, start_date: e.target.value })
                }
              />
            </div>
            <div className="input-field-container">
              <div className="label-container">
                <label>End Date</label>
              </div>
              <TextField
                ref={endDateInputRef}
                type="date"
                borderRadius={3}
                value={contractCreating.end_date}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, end_date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-control-container">
            <Button
              type="submit"
              disable={loading}
              value={isEdit ? 'Update' : 'Add'}
              backgroundColor="var(--color-primary)"
            />
          </div>
        </form>
      </Overlays>
      <div className="contract-container">
        <div className="breadcrumbs-container">
          <BreadCrumbs />
        </div>

        <div className="controls-container">
          <Button
            value={'ADD'}
            onClick={() => {
              setEdit(false);
              setContractCreating({
                title: '',
                project_id: '',
                signed_date: '',
                total_amount: '',
                working_days: '',
                start_date: '',
                end_date: '',
                status: 'Draft',
              });
              toggleAddForm(true);
            }}
            backgroundColor="var(--color-primary)"
            iconLeft={<Plus size={15} />}
          />
          <TextField
            type={'search'}
            placeholder={'Search by Title, Status,...'}
            width={300}
            borderRadius={50}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            iconLeft={<Search size={20} color="#666" />}
          />
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

        <div className="table-controls">
          <div className="table-page-control">
            <PageInput max={contractDatas.totalPages} onChange={(p) => setPage(p)} page={page} />
          </div>
          <div>
            <label>Total Pages: {contractDatas.totalPages}</label>
          </div>
          <div className="rows-select">
            <select
              onChange={(e) => {
                setPage(1);
                setLimit(e.target.value);
              }}
              value={limit}
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

export default Contracts;
