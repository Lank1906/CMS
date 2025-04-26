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

const AccountDetails = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [accountDatas, setAccountDatas] = useState({ data: [], totalPages: 0 });

  useEffect(() => {
    const fetchAccountDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await api.get(`/accounts/details/${id}/?page=${page}&limit=${limit}`);
        const acc = response.data.account;

        if (!acc) {
          toast.error('Account not found!');
        }

        setAccount(acc);
        setAccountDatas({
          data: acc?.projects || [],
          totalPages: response.data.projectsPagination?.totalPages || 0,
        });
      } catch (error) {
        const errorMessage = error?.message || 'Failed to fetch account details!';
        toast.error(`Error: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetail();
  }, [id, page, limit]);

  useEffect(() => {
    if (!loading && !account) {
      toast.error('Account not found!');
    } else if (loading) {
      toast.info('Loading data...');
    }
  }, [loading, account]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading data...</div>;
  }

  if (!account) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">
        Account not found!
      </div>
    );
  }

  const formatDate = (dateStr) => {
    return dateStr ? dayjs(dateStr).format('DD-MMM-YYYY') : 'N/A';
  };

  return (
    <div className="w-auto h-screen pl-6 pt-2 bg-white">
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="w-full max-h-[85%] flex flex-col lg:flex-row gap-[20px] mt-4 mb-20">
        <div className="w-[30%] rounded-[16px] border border-gray-300 p-4">
          <h3 className="font-bold text-base">ACCOUNT INFORMATION</h3>
          <div className="grid grid-cols-[auto_auto] gap-3 text-[14px]">
            {[
              { label: 'Email', value: account?.email },
              { label: 'Address', value: account?.address },
              { label: 'Phone Number', value: account?.phone },
              { label: 'Company Name', value: account?.company },
              { label: 'Contact Person', value: account?.contact_person },
              { label: 'URL', value: account?.url, showButton: true },
              { label: 'Status', value: account?.status },
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <label className="mb-1 text-gray-700 font-[550]">{item.label}</label>
                <InputCopy value={item.value} showButton={item.showButton ?? false} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[70%] rounded-[16px] border border-gray-300 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h3 className="font-bold text-base">PROJECT OVERVIEW</h3>
            <Button value="ADD" backgroundColor="var(--color-primary)" />
          </div>
          <div className="bg-white max-w-full h-[85%] mt-6">
            {accountDatas.data && accountDatas.data.length > 0 ? (
              <div className="w-full max-h-[100%] overflow-y-auto">
                <table className="text-sm w-full border-collapse">
                  <thead className="sticky top-0 bg-[var(--color-primary)] text-white z-10">
                    <tr className="h-[20%]">
                      <th className="p-2.5 border">Project Name</th>
                      <th className="p-2.5 border">Status</th>
                      <th className="p-2.5 border">Start Date</th>
                      <th className="p-2.5 border">End Date</th>
                      <th className="p-2.5 border">Description</th>
                      <th className="p-2.5 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountDatas.data.map((a) => (
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
                        <td className="p-2 border border-gray-300">
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
                      <th className="p-4 border w-[25%]">Project Name</th>
                      <th className="p-4 border">Status</th>
                      <th className="p-4 border">Start Date</th>
                      <th className="p-4 border">End Date</th>
                      <th className="p-4 border w-[25%]">Description</th>
                      <th className="p-4 border">Action</th>
                    </tr>
                  </thead>
                </table>
                <div className="flex justify-center items-center text-lg w-full h-[100px] bg-gray-100 border border-gray-300">
                  No data
                </div>
              </>
            )}
            <div className="flex justify-end items-center p-2.5 gap-5">
              <PageInput max={accountDatas.totalPages} onChange={(p) => setPage(p)} page={page} />
              <span className="text-sm font-semibold">Total Pages: {accountDatas.totalPages}</span>
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

export default AccountDetails;
