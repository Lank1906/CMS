import React, { useState, useEffect } from 'react';
import { Trash, Edit } from 'lucide-react';
import InputCopy from '../../components/ui/InputCopy';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Button from '../../components/ui/Button';
import PageInput from '../../components/ui/PageInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import BreadCrumbs from '../../components/BreadCrumbs';

const ContractDetail = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [historyData] = useState({ data: [], totalPages: 0 });

  const token = localStorage.getItem('cms_token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchContractDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await api.get(`/contracts/details/${id}`, config);
        setContract(response.data?.data);
      } catch {
        toast.error('Failed to fetch contract detail');
      } finally {
        setLoading(false);
      }
    };

    fetchContractDetail();
  }, [id, page, limit]);

  const formatDate = (dateStr) => {
    return dateStr ? dayjs(dateStr).format('DD-MMM-YYYY') : 'N/A';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  if (!contract) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">
        Contract not found!
      </div>
    );
  }

  return (
    <div className="w-auto h-screen pl-6 pt-2 bg-white">
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="w-full max-h-[85%] flex flex-col lg:flex-row gap-[20px] mt-4 mb-20">
        <div className="w-[30%] rounded-[16px] border border-gray-300 p-4">
          <h3 className="font-bold text-base">CONTRACT INFORMATION</h3>
          <div className="grid grid-cols-[auto_auto] gap-3 text-[14px]">
            {[
              { label: 'Title', value: contract.title },
              { label: 'Project ID', value: contract.project_id },
              { label: 'Signed Date', value: formatDate(contract.signed_date) },
              { label: 'Total Amount', value: contract.total_amount },
              { label: 'Working Days', value: contract.working_days },
              { label: 'Start Date', value: formatDate(contract.start_date) },
              { label: 'End Date', value: formatDate(contract.end_date) },
              { label: 'Status', value: contract.status },
              { label: 'Created At', value: formatDate(contract.created_at) },
              { label: 'Updated At', value: formatDate(contract.updated_at) },
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <label className="mb-1 text-gray-700 font-[550]">{item.label}</label>
                <InputCopy value={item.value} showButton={false} />
              </div>
            ))}
          </div>
        </div>

        <div className="w-[70%] rounded-[16px] border border-gray-300 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h3 className="font-bold text-base">CONTRACT HISTORY</h3>
            <Button value="ADD" backgroundColor="var(--color-primary)" />
          </div>

          <div className="bg-white max-w-full h-[85%] mt-6">
            {historyData.data.length > 0 ? (
              <div className="w-full max-h-[100%] overflow-y-auto">
                <table className="text-sm w-full border-collapse">
                  <thead className="sticky top-0 bg-[var(--color-primary)] text-white z-10">
                    <tr>
                      <th className="p-2.5 border">Version</th>
                      <th className="p-2.5 border">Note</th>
                      <th className="p-2.5 border">Updated At</th>
                      <th className="p-2.5 border">File</th>
                      <th className="p-2.5 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.data.map((h) => (
                      <tr key={h.id} className="even:bg-[#fcfcfc] odd:bg-white hover:bg-[#f1f1f1]">
                        <td className="p-2 border text-center">{h.version}</td>
                        <td className="p-2 border">{h.note}</td>
                        <td className="p-2 border text-center">{formatDate(h.updated_at)}</td>
                        <td className="p-2 border text-center">
                          <a
                            href={h.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Download
                          </a>
                        </td>
                        <td className="p-2 border text-center">
                          <button>
                            <Edit size={18} color="var(--color-primary)" />
                          </button>
                          <button>
                            <Trash size={18} color="#C73535" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex justify-center items-center text-lg w-full h-[100px] bg-gray-100 border border-gray-300">
                No data
              </div>
            )}

            <div className="flex justify-end items-center p-2.5 gap-5">
              <PageInput max={historyData.totalPages} onChange={(p) => setPage(p)} page={page} />
              <span className="text-sm font-semibold">Total Pages: {historyData.totalPages}</span>
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

export default ContractDetail;
