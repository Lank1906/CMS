import { ProjectContext } from '../../context/ProjectContext';
import TextField from '../ui/TextField';
import Select from '../ui/Select';
import Overlays from '../Overlays/Overlays';
import { useContext, useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import './projectForm.css';
import { ChevronDown } from 'lucide-react';

const ProjectForm = ({}) => {
  const {
    showAddForm,
    toggleAddForm,
    loading,
    isEdit,
    projectCreateSubmit,
    nameInputRef,
    accountInputRef,
    projectCreating,
    setProjectCreating,
    accountDatas,
    searchAccountData,
    accountSearchKeyword,
    setAccountSearchKeyword,
    newAccountDatas,
    fetchNewAccountData,
  } = useContext(ProjectContext);
  const [showAccountSelect, toggleAccountSelect] = useState(false);
  useEffect(() => {
    searchAccountData();
  }, [accountSearchKeyword]);
  useEffect(() => {
    fetchNewAccountData();
  }, []);
  const endateInputRef = useRef();

  const setValue = (e) => {
    const { name, value } = e.target;
    setProjectCreating({
      ...projectCreating,
      [name]: value,
    });
  };

  const accountSelectItemClick = (e) => {
    const { id } = e.target;
    const contact = e.target.dataset.contact;

    e.stopPropagation();
    setProjectCreating({
      ...projectCreating,
      account_id: id,
    });
    setAccountSearchKeyword(`${contact}`);
    toggleAccountSelect(false);
  };
  return (
    <>
      <Overlays
        title={isEdit ? 'UPDATE PROJECT' : 'NEW PROJECT'}
        show={showAddForm}
        closeWhenClickOverlay={false}
        onClick={() => toggleAccountSelect(false)}
        onClose={() => {
          toggleAddForm(false);
        }}
      >
        <form className="project-add-form-container" onSubmit={projectCreateSubmit}>
          <div className="project-input-field-container">
            <div className="project-inputs project-name-input">
              <div className="project-label-container">
                <label>Project Name</label>
                <label className="asterisk" title="Required field">
                  {' '}
                  *
                </label>
              </div>
              <TextField
                name={'name'}
                ref={nameInputRef}
                borderRadius={3}
                placeholder={'Project name'}
                value={projectCreating.name}
                onChange={setValue}
              />
            </div>
            <div className="project-inputs project-account-input">
              <div className="project-label-container">
                <label>Account</label>
                <label className="asterisk" title="Required field">
                  {' '}
                  *
                </label>
              </div>
              <TextField
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAccountSelect(true);
                }}
                placeholder={'Contact person, Company,..'}
                ref={accountInputRef}
                borderRadius={3}
                value={accountSearchKeyword}
                onChange={(e) => {
                  toggleAccountSelect(true);
                  setAccountSearchKeyword(e.target.value);
                }}
                iconRight={<ChevronDown color="#555" />}
              />
              <div className={`account-select-container ${showAccountSelect ? 'show' : 'hide'}`}>
                <p className="account-search-result-title">
                  Search results for {`'${accountSearchKeyword}'`} - total: {accountDatas.total}
                </p>
                {accountDatas.data ? (
                  accountDatas.data?.map((item) => {
                    return (
                      <>
                        <div
                          className="account-select-item"
                          id={item.id}
                          data-contact={item.contact_person}
                          onClick={accountSelectItemClick}
                        >
                          {`${item.contact_person} (${item.company}): ${item.email}`}
                        </div>
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
                <div className="account-new-header">-- new account --</div>
                {newAccountDatas.data ? (
                  newAccountDatas.data?.map((item) => {
                    return (
                      <>
                        <div
                          className="account-select-item"
                          id={item.id}
                          data-contact={item.contact_person}
                          onClick={accountSelectItemClick}
                        >
                          {`${item.contact_person} (${item.company}): ${item.email}`}
                        </div>
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="project-input-field-container">
            <div className="project-inputs project-track-select">
              <div className="project-label-container">
                <label>Project Track</label>
              </div>
              <Select
                name={'track'}
                borderRadius={3}
                value={projectCreating.track}
                onChange={setValue}
              >
                <option value={'Planning'}>Planning</option>
                <option value={'Completed'}>Completed</option>
                <option value={'InProgress'}>InProgress</option>
                <option value={'Cancelled'}>Cancelled</option>
                <option value={'Overdue'}>Overdue</option>
              </Select>
            </div>
            <div className="project-inputs project-date-picker">
              <div className="project-label-container">
                <label>Start Date</label>
              </div>
              <TextField
                name={'start_date'}
                type={'date'}
                borderRadius={3}
                value={projectCreating.start_date}
                onChange={(e) => {
                  setValue(e);
                  setTimeout(() => {
                    endateInputRef.current?.querySelector('input')?.showPicker?.();
                  }, 100);
                }}
              />
            </div>
            <div className="project-inputs project-date-picker">
              <div className="project-label-container">
                <label>End Date</label>
              </div>
              <TextField
                name={'end_date'}
                ref={endateInputRef}
                type={'date'}
                borderRadius={3}
                value={projectCreating.end_date}
                onChange={setValue}
              />
            </div>
          </div>
          <div className="project-input-field-container">
            <div className="project-inputs project-description-input">
              <div className="project-label-container">
                <label>Description</label>
              </div>

              <TextField
                name={'description'}
                mutiline={true}
                borderRadius={3}
                placeholder={'Project description'}
                value={projectCreating.description}
                onChange={setValue}
              />
              <label className="project-helper-description">
                {Number(255 - projectCreating.description.length)} characters left
              </label>
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

export default ProjectForm;
