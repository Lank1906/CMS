import React, { useState, useEffect, useContext } from 'react';
import { Trash, Edit } from 'lucide-react';
import InputCopy from '../../components/ui/InputCopy';
import { useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import PageInput from '../../components/ui/PageInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import BreadCrumbs from '../../components/BreadCrumbs';
import { ProjectContext } from '../../context/ProjectContext';
import { dateFormater } from '../../services/HelpersService';

const ProjectDetails = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [projectDatas, setProjectDatas] = useState({ data: [], totalPages: 0 });

  const { fetchDataById, projectCreating, loading } = useContext(ProjectContext);

  useEffect(() => {
    if (!id) return;
    fetchDataById(id);
    setProjectDatas({ data: [], totalPages: 0 });
  }, [id]);

  useEffect(() => {
    if (!loading && !projectCreating) {
      toast.error('Project not found!');
    } else if (loading) {
      toast.info('Loading data...');
    }
  }, [loading, projectCreating]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading data...</div>;
  }

  if (!projectCreating) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">
        Project not found!
      </div>
    );
  }

  const formatDate = (dateStr) => {
    return dateStr ? dayjs(dateStr).format('DD-MMM-YYYY') : 'N/A';
  };

  return (
    <div className="w-auto h-screen pl-2 pt-2 bg-white">
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="w-full max-h-[85%] flex flex-col lg:flex-row gap-[20px] mt-4 mb-20">
        <div className="detail-info-container w-[35%] rounded-[16px] p-4">
          <h3 className="font-bold text-base">PROJECT INFORMATION</h3>
          <div className="grid gap-2">
            <div className="flex w-full gap-3">
              <div className="flex-1 grid gap-2 text-sm">
                {[
                  { label: 'Project name', value: projectCreating?.name },
                  { label: 'Track', value: projectCreating?.track },
                  { label: 'Start date', value: dateFormater(projectCreating?.start_date) },
                  { label: 'Created Date', value: dateFormater(projectCreating?.created_at) },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <label className="mb-1 text-gray-700 font-[550]">{item.label}</label>
                    <InputCopy value={item.value} showButton={item.showButton ?? false} />
                  </div>
                ))}
              </div>
              <div className="flex-1 grid gap-2 text-sm">
                {[
                  { label: 'Account Company', value: projectCreating?.account?.company },
                  {
                    label: 'Account Contact Person',
                    value: projectCreating?.account?.contact_person,
                  },
                  { label: 'End date', value: dateFormater(projectCreating?.start_date) },
                  { label: 'Last update', value: dateFormater(projectCreating?.updated_at) },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <label className="mb-1 text-gray-700 font-[550]">{item.label}</label>
                    <InputCopy value={item.value} showButton={item.showButton ?? false} />
                  </div>
                ))}
              </div>
            </div>
            <div key={9} className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700 font-[550]">Description</label>
              <div className="bg-gray-200 text-sm flex items-center justify-between border border-gray-300 rounded-md overflow-hidden p-2">
                {projectCreating?.description}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[70%] rounded-[16px] border border-gray-200 shadow-md p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h3 className="font-bold text-base">CONTRACTs</h3>
            <Button value="ADD" backgroundColor="var(--color-primary)" />
          </div>
          <div className="bg-white max-w-full h-[85%] mt-6">
            {projectDatas.data && projectDatas.data.length > 0 ? (
              <div className="w-full max-h-[100%] overflow-y-auto">
                <table className="text-sm w-full border-collapse">
                  <thead className="sticky top-0 bg-[var(--color-primary)] text-white z-10">
                    <tr className="h-[20%]">
                      <th className="p-2 border">Title</th>
                      <th className="p-2 border">Signed Date</th>
                      <th className="p-2 border">Total Amount</th>
                      <th className="p-2 border">Working Days</th>
                      <th className="p-2 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectDatas.data.map((a) => (
                      <tr
                        key={a.id}
                        className="table-row even:bg-[#fcfcfc] odd:bg-white hover:bg-[#f1f1f1]"
                      >
                        <td className="p-2 border border-gray-300">
                          <div className="line-clamp-3">{a.name}</div>
                        </td>
                        <td className="p-2 border border-gray-300 text-center">{a.track}</td>
                        <td className="p-2 border border-gray-300 text-center">
                          {formatDate(a.start_date)}
                        </td>
                        <td className="p-2 border border-gray-300 text-center">
                          {formatDate(a.end_date)}
                        </td>
                        <td className="description-cell p-2 border border-gray-300">
                          <div className="line-clamp-3">{a.description}</div>
                        </td>
                        <td className="p-2 border border-gray-300 text-center">
                          <button>
                            <Edit
                              className="bg-transparent m-[2px] edit-btn"
                              color="var(--color-primary)"
                              size={18}
                            />
                          </button>
                          <button>
                            <Trash
                              className="bg-transparent m-[2px] delete-btn"
                              color="#C73535"
                              size={18}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                {' '}
                <table className="text-sm w-full border-collapse">
                  <thead className="sticky top-0 bg-[var(--color-primary)] text-white z-10">
                    <tr>
                      <th className="p-2 border">Title</th>
                      <th className="p-2 border">Signed Date</th>
                      <th className="p-2 border">Total Amount</th>
                      <th className="p-2 border">Working Days</th>
                      <th className="p-2 border">Action</th>
                    </tr>
                  </thead>
                </table>
                <div className="flex justify-center items-center text-lg w-full h-[100px] bg-gray-100 border border-gray-300">
                  No data
                </div>
              </>
            )}
            <div className="flex justify-end items-center p-2.5 gap-3">
              <PageInput max={projectDatas.totalPages} onChange={(p) => setPage(p)} page={page} />
              <span className="text-sm font-semibold">Total Pages: {projectDatas.totalPages}</span>
              <select
                className="w-[70px] h-[24px] border border-gray-300 focus:outline-none rounded-md"
                onChange={(e) => {
                  setPage(1);
                  setLimit(Number(e.target.value));
                }}
                value={limit}
              >
                {[10, 30, 50, 70, 100, 200].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
