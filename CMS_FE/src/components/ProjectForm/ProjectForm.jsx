import { ProjectContext } from '../../context/ProjectContext';
import TextField from '../ui/TextField';
import Select from '../ui/Select';
import Overlays from '../Overlays/Overlays';
import { useContext, useEffect, useState } from 'react';
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
  } = useContext(ProjectContext);
  const [showAccountSelect, toggleAccountSelect] = useState(false);
  useEffect(() => {
    searchAccountData();
  }, [accountSearchKeyword]);

  return (
    <>
      <Overlays
        title={isEdit ? 'UPDATE PROJECT' : 'NEW PROJECT'}
        show={showAddForm}
        closeWhenClickOverlay={false}
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
                ref={nameInputRef}
                borderRadius={3}
                placeholder={'Project name'}
                value={projectCreating.name}
                onChange={(e) =>
                  setProjectCreating({
                    ...projectCreating,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div
              className="project-inputs project-account-input"
              onClick={() => toggleAccountSelect(!showAccountSelect)}
            >
              <div className="project-label-container">
                <label>Account</label>
                <label className="asterisk" title="Required field">
                  {' '}
                  *
                </label>
              </div>
              <TextField
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
                {accountDatas.data ? (
                  accountDatas.data?.map((item) => {
                    return (
                      <>
                        <div
                          className="account-select-item"
                          onClick={() => {
                            setProjectCreating({
                              ...projectCreating,
                              account_id: item.id,
                            });
                            setAccountSearchKeyword(`${item.contact_person}`);
                          }}
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
                borderRadius={3}
                value={projectCreating.track}
                onChange={(e) =>
                  setProjectCreating({
                    ...projectCreating,
                    track: e.target.value,
                  })
                }
              >
                <option>Planning</option>
                <option>Completed</option>
                <option>InProgress</option>
                <option>Cancelled</option>
                <option>Overdue</option>
              </Select>
            </div>
            <div className="project-inputs project-date-picker">
              <div className="project-label-container">
                <label>Start Date</label>
              </div>
              <TextField
                type={'date'}
                borderRadius={3}
                value={projectCreating.start_date}
                onChange={(e) =>
                  setProjectCreating({
                    ...projectCreating,
                    start_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="project-inputs project-date-picker">
              <div className="project-label-container">
                <label>End Date</label>
              </div>
              <TextField
                type={'date'}
                borderRadius={3}
                value={projectCreating.end_date}
                onChange={(e) =>
                  setProjectCreating({
                    ...projectCreating,
                    end_date: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="project-input-field-container">
            <div className="project-inputs project-description-input">
              <div className="project-label-container">
                <label>Description</label>
              </div>

              <TextField
                mutiline={true}
                borderRadius={3}
                placeholder={'Project description'}
                value={projectCreating.description}
                onChange={(e) =>
                  setProjectCreating({
                    ...projectCreating,
                    description: e.target.value,
                  })
                }
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
