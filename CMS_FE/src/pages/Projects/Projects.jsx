import {
  ArrowUpRightFromSquare,
  Edit,
  Plus,
  RotateCcw,
  Search,
  SquareArrowUpLeft,
  Trash,
  Trash2,
  XCircle,
} from 'lucide-react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Button from '../../components/ui/Button';
import './projects.css';
import TextField from '../../components/ui/TextField';
import { useContext, useEffect } from 'react';
import PageInput from '../../components/ui/PageInput';
import 'react-phone-input-2/lib/style.css';
import ConfirmDialog from '../../components/Dialogs.jsx/ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../../context/ProjectContext';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import { getBackgroundColor } from '../../services/HelpersService';

const Projects = () => {
  const nav = useNavigate();
  const {
    page,
    setPage,
    limit,
    setLimit,
    keyword,
    setKeyword,
    projectDatas,
    toggleAddForm,
    showDialog,
    setShowDialog,
    setSelectProjectId,
    setEdit,
    handleDelete,
    searchData,
    fetchData,
    fetchDataById,
    setProjectCreating,
    setAccountSearchKeyword,
    setShowIsActiveItems,
    showIsActiveItems,
    restoreProject,
  } = useContext(ProjectContext);

  useEffect(() => {
    fetchData();
  }, [page, limit, showIsActiveItems]);

  useEffect(() => {
    searchData();
  }, [keyword]);
  return (
    <>
      <ProjectForm show={() => toggleAddForm(true)} />
      <ConfirmDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleDelete}
        title="Delete confirm?"
        message="Are you sure you want to perform this action?"
      />

      <div className="project-container">
        <div className="breadcrumbs-container">
          <BreadCrumbs />
        </div>
        <div className="controls-container">
          {showIsActiveItems ? (
            <Button
              value={'ADD'}
              onClick={() => {
                setProjectCreating({
                  name: '',
                  account_id: '',
                  description: '',
                  start_date: null,
                  end_date: null,
                  track: 'Planning',
                });
                setAccountSearchKeyword('');
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
          ) : (
            <div className="flex items-center gap-2 text-[100] font-[550] text-gray-700">
              <Trash2 color="gray" /> PROJECT RECYCLING BIN
            </div>
          )}

          <div className="flex gap-2 items-center">
            <TextField
              type={'search'}
              placeholder={'Search by Name...'}
              width={300}
              borderRadius={50}
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              iconLeft={<Search size={20} color="#666" />}
            />
            <div
              className="notification-container"
              onClick={() => {
                setShowIsActiveItems(showIsActiveItems == 1 ? 0 : 1);
              }}
            >
              <div className="notification-icon">
                {showIsActiveItems == 1 ? (
                  <>
                    <Trash2 color="rgb(88, 88, 88)" />
                    <div className="notification-amount">
                      {projectDatas.inactiveCount > 99 ? '99+' : projectDatas.inactiveCount}
                    </div>
                  </>
                ) : (
                  <SquareArrowUpLeft color="rgb(57, 56, 64)" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="project-data-container">
          <table>
            <thead>
              <tr
                className="table-header"
                style={{
                  backgroundColor: showIsActiveItems
                    ? 'var(--color-primary)'
                    : 'rgb(134, 134, 134)',
                }}
              >
                <th>Project Name</th>
                <th>Contact Person Account</th>
                <th>Project Track</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Created Date</th>
                <th className="description-header-cell">Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projectDatas.data ? (
                projectDatas.data.map((item) => (
                  <tr
                    className={`table-row ${showIsActiveItems ? 'normal' : 'trashbin'}`}
                    key={item.id}
                  >
                    <td className="project-detail-link">
                      {showIsActiveItems ? (
                        <a
                          onClick={() => {
                            nav(`/home/Projects/${item.id}`);
                          }}
                        >
                          {`${item.name} (${item.id})`}
                          <ArrowUpRightFromSquare size={15} />
                        </a>
                      ) : (
                        `${item.name} (${item.id})`
                      )}
                    </td>
                    <td>{`${item.account.contact_person} (${item.account.company})`}</td>
                    <td>
                      <div
                        className="rounded-2xl py-0.5 font-semibold"
                        style={{
                          backgroundColor: showIsActiveItems
                            ? getBackgroundColor(item.track)
                            : '#CCC',
                          color: showIsActiveItems ? 'white' : '#888',
                        }}
                      >
                        {item.track}
                      </div>
                    </td>
                    <td>
                      {item.start_date ? new Date(item.start_date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>{item.end_date ? new Date(item.end_date).toLocaleDateString() : 'N/A'}</td>
                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    <td
                      className="description-cell"
                      title={item.description?.length > 25 ? item.description : ''}
                    >
                      <div>{item.description || 'N/A'}</div>
                    </td>

                    <td className="action-cell">
                      <button
                        onClick={() => {
                          if (!showIsActiveItems) {
                            restoreProject(item.id);
                          } else {
                            setEdit(true);
                            fetchDataById(item.id);
                            setSelectProjectId(item.id);
                            toggleAddForm(true);
                          }
                        }}
                      >
                        {showIsActiveItems ? (
                          <Edit className="edit-btn" color="var(--color-primary)" />
                        ) : (
                          <RotateCcw className="edit-btn" color="var(--color-primary)" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setSelectProjectId(item.id);
                          setShowDialog(true);
                        }}
                      >
                        {showIsActiveItems ? (
                          <Trash className="delete-btn" color="#C73535" />
                        ) : (
                          <XCircle className="delete-btn" color="#C73535" />
                        )}
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
              max={projectDatas.totalPages}
              onChange={(p) => {
                setPage(p);
              }}
              page={page}
            />
          </div>
          <div>
            <label>Total Pages: {projectDatas.totalPages}</label>
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

export default Projects;
