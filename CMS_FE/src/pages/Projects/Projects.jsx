import { ArrowUpRightFromSquare, Edit, Plus, Search, Trash } from 'lucide-react';
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
import Select from '../../components/ui/Select';
const getBackgroundColor = (track) => {
  switch (track) {
    case 'Planning':
      return 'rgb(221, 206, 92)';
    case 'Completed':
      return 'rgb(141, 210, 143)';
    case 'InProgress':
      return 'rgb(129, 171, 205)';
    case 'Cancelled':
      return 'rgb(240, 151, 116)';
    case 'Overdue':
      return 'rgb(139, 139, 139)';
    default:
      return 'white';
  }
};
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
  } = useContext(ProjectContext);

  useEffect(() => {
    fetchData();
  }, [page, limit]);

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
            placeholder={'Search by Name...'}
            width={300}
            borderRadius={50}
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            iconLeft={<Search size={20} color="#666" />}
          />
        </div>
        <div className="project-data-container">
          <table>
            <thead>
              <tr className="table-header">
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
                  <tr className="table-row" key={item.id}>
                    <td className="project-detail-link">
                      <a
                        onClick={() => {
                          nav(`/home/Projects/${item.id}`);
                        }}
                      >
                        {item.name}
                        <ArrowUpRightFromSquare size={15} />
                      </a>
                    </td>
                    <td>{`${item.account.contact_person} (${item.account.company})`}</td>
                    <td>
                      <div
                        className="text-white rounded-2xl py-0.5 font-semibold"
                        style={{
                          backgroundColor: getBackgroundColor(item.track),
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
                    <td className="description-cell">
                      <div>{item.description}</div>
                    </td>

                    <td className="action-cell">
                      <button
                        onClick={() => {
                          setEdit(true);
                          fetchDataById(item.id);
                          setSelectProjectId(item.id);
                          toggleAddForm(true);
                        }}
                      >
                        <Edit className="edit-btn" color="var(--color-primary)" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectProjectId(item.id);
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
