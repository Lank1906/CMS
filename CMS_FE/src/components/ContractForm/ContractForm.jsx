import { ContractContext } from '../../context/ContractContext';
import TextField from '../ui/TextField';
import Select from '../ui/Select';
import Overlays from '../Overlays/Overlays';
import { useContext, useEffect } from 'react';
import Button from '../ui/Button';
import './contractForm.css';
import { toast } from 'react-toastify';
const isDateAfter = (after, before) =>
  after && before && new Date(after).setHours(0, 0, 0, 0) >= new Date(before).setHours(0, 0, 0, 0);
const ContractForm = () => {
  const {
    showAddForm,
    toggleAddForm,
    loading,
    isEdit,
    addContract,
    updateContract,
    contractCreating,
    setContractCreating,
  } = useContext(ContractContext);
  useEffect(() => {
    if (!isEdit) {
      let id = contractCreating.project_id;
      setContractCreating({
        title: '',
        project_id: id,
        status: 'Draft',
        signed_date: '',
        start_date: '',
        end_date: '',
        working_days: 0,
        total_amount: 0,
      });
    }
  }, [isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contractCreating.title || !contractCreating.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!contractCreating.project_id || isNaN(contractCreating.project_id)) {
      toast.error('Invalid project ID');
      return;
    }
    if (!contractCreating.signed_date) {
      toast.error('Signed Date is required');
      return;
    }
    if (!contractCreating.start_date) {
      toast.error('Start Date is required');
      return;
    }
    if (!contractCreating.end_date) {
      toast.error('End Date is required');
      return;
    }
    if (
      contractCreating.start_date &&
      contractCreating.end_date &&
      new Date(contractCreating.start_date) > new Date(contractCreating.end_date)
    ) {
      toast.error('Start Date must be before End Date');
      return;
    }
    if (contractCreating.working_days === '' || isNaN(contractCreating.working_days)) {
      toast.error('Working Days must be a number');
      return;
    }
    if (contractCreating.total_amount === '' || isNaN(contractCreating.total_amount)) {
      toast.error('Total Amount must be a number');
      return;
    }
    if (isEdit) {
      updateContract(contractCreating.id, contractCreating);
    } else {
      addContract(contractCreating);
    }
  };
  return (
    <>
      <Overlays
        title={isEdit ? 'UPDATE CONTRACT' : 'NEW CONTRACT'}
        show={showAddForm}
        closeWhenClickOverlay={false}
        onClose={() => {
          toggleAddForm(false);
        }}
      >
        <form className="project-add-form-container" onSubmit={handleSubmit}>
          <div className="project-input-field-container">
            <div className="project-inputs project-name-input">
              <div className="project-label-container">
                <label>Title</label>
                <label className="asterisk" title="Required field">
                  {' '}
                  *
                </label>
              </div>
              <TextField
                name={'title'}
                borderRadius={3}
                placeholder={'Contract title'}
                error={!contractCreating.title}
                value={contractCreating.title}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, title: e.target.value })
                }
                disabled={isEdit}
              />
            </div>
          </div>

          <div className="project-input-field-container">
            <div className="project-inputs project-track-select">
              <div className="project-label-container">
                <label>Status</label>
                <label className="asterisk" title="Required field">
                  {' '}
                  *
                </label>
              </div>
              <Select
                className=" select-status"
                name={'status'}
                borderRadius={3}
                value={contractCreating.status}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, status: e.target.value })
                }
              >
                <option value={'Draft'}>Draft</option>
                <option value={'WaitingForApproval'}>WaitingForApproval</option>
                <option value={'Signed'}>Signed</option>
              </Select>
            </div>
            <div className="project-inputs project-date-picker">
              <div className="project-label-container">
                <label>Signed Date</label>
                <label className="asterisk" title="Required field">
                  {' '}
                  *
                </label>
              </div>
              <TextField
                name={'signed_date'}
                type={'date'}
                error={!isDateAfter(contractCreating.signed_date, new Date().setHours(0, 0, 0, 0))}
                borderRadius={3}
                value={contractCreating.signed_date}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, signed_date: e.target.value })
                }
              />
            </div>
            <div className="project-inputs project-date-picker">
              <div className="project-label-container">
                <label>Start Date</label>
                <label className="asterisk" title="Required field">
                  {' '}
                  *
                </label>
              </div>
              <TextField
                name={'start_date'}
                type={'date'}
                error={!isDateAfter(contractCreating.start_date, contractCreating.signed_date)}
                borderRadius={3}
                value={contractCreating.start_date}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, start_date: e.target.value })
                }
              />
            </div>
            <div className="project-inputs project-date-picker">
              <div className="project-label-container">
                <label>End Date</label>
                <label className="asterisk" title="Required field">
                  {' '}
                  *
                </label>
              </div>
              <TextField
                name={'end_date'}
                type={'date'}
                error={!isDateAfter(contractCreating.end_date, contractCreating.start_date)}
                borderRadius={3}
                value={contractCreating.end_date}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, end_date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="project-input-field-container">
            <div className="project-inputs project-description-input">
              <div className="project-label-container">
                <label>Working Days</label>
                <label className="asterisk" title="Required field">
                  {' '}
                  *
                </label>
              </div>
              <TextField
                name={'working_days'}
                type={'number'}
                borderRadius={3}
                error={contractCreating.working_days <= 0}
                value={contractCreating.working_days}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, working_days: e.target.value })
                }
              />
            </div>
            <div className="project-inputs project-description-input">
              <div className="project-label-container">
                <label>Total Amount</label>
                <label className="asterisk" title="Required field">
                  {' '}
                  *
                </label>
              </div>
              <TextField
                name={'total_amount'}
                type={'number'}
                error={contractCreating.total_amount <= 0}
                borderRadius={3}
                value={contractCreating.total_amount}
                onChange={(e) =>
                  setContractCreating({ ...contractCreating, total_amount: e.target.value })
                }
              />
            </div>
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
    </>
  );
};

export default ContractForm;
