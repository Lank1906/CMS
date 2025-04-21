import { ChevronLeft, ChevronRight, Edit, Plus, Search, SquareArrowOutUpRightIcon, Trash } from 'lucide-react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Button from '../../components/ui/Button';
import './account.css';
import TextField from '../../components/ui/TextField';
import { useEffect, useState } from "react";
import PageInput from '../../components/ui/PageInput';
import Overlays from '../../components/Overlays/Overlays'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { toast } from 'react-toastify';
import axios from 'axios';
const Accounts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [accountDatas, setAccountDatas] = useState([]);
  const [showAddForm, toggleAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [accountCreating, setAccountCreating] = useState({
    company: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    url: "",
  })
  useEffect(() => {
    fetchData()
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    axios.get(`http://localhost:3000/api/accounts?page=${page}&limit=${limit}`).then(res => {
      setAccountDatas(res.data);
      setLoading(false)
    }).catch(err => {

    })
  }

  const accountCreateSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:3000/api/accounts`, accountCreating).then(res => {
      toast.success("Account create successfully!");
      fetchData();
      return toggleAddForm(false);
    }).catch(err => {
      toast.error(err.response?.data?.message || "Account create error!");
    });
  };
  return <>
    <Overlays
      title={"NEW ACCOUNT"}
      show={showAddForm}
      onClose={() => toggleAddForm(false)}>
      <form
        className='account-add-form-container'
        onSubmit={accountCreateSubmit}
      >
        <div className='input-field-container'>
          <div className='label-container'>
            <label>Company</label><label className='asterisk' title='Required field'> *</label>
          </div>
          <TextField borderRadius={3} placeholder={"Company"}
            value={accountCreating.company}
            onChange={(e) => setAccountCreating({
              ...accountCreating,
              company: e.target.value
            })}
          />
        </div>
        <div className='input-field-container'>
          <div className='label-container'>
            <label>Contact Person</label><label className='asterisk' title='Required field'> *</label>
          </div>
          <TextField borderRadius={3} placeholder={"Contact Person"}
            value={accountCreating.contact_person}
            onChange={(e) => setAccountCreating({
              ...accountCreating,
              contact_person: e.target.value
            })}
          />
        </div>
        <div className='input-field-container'>
          <div className='label-container'>
            <label>Email</label><label className='asterisk' title='Required field'> *</label>
          </div>
          <TextField type={"email"} borderRadius={3} placeholder={"examle@gmail.com"}
            value={accountCreating.email}
            onChange={(e) => setAccountCreating({
              ...accountCreating,
              email: e.target.value
            })}
          />
        </div>
        <div className='input-field-container'>
          <div className='label-container'>
            <label>Phone</label>
          </div>
          <PhoneInput
            country={'vn'}
            value={accountCreating.phone}
            onChange={(phone) => setAccountCreating({
              ...accountCreating,
              phone: phone
            })}
          />
        </div>
        <div className='input-field-container'>
          <div className='label-container'>
            <label>Url</label>
          </div>
          <TextField borderRadius={3} placeholder={"https//facebook.com/example.vn"}
            value={accountCreating.url}
            onChange={(e) => setAccountCreating({
              ...accountCreating,
              url: e.target.value
            })}
          />
        </div>
        <div className='input-field-container'>
          <div className='label-container'>
            <label>Address</label>
          </div>
          <TextField borderRadius={3} placeholder={"Address"}
            value={accountCreating.address}
            onChange={(e) => setAccountCreating({
              ...accountCreating,
              address: e.target.value
            })}
          />
        </div>
        <div className='form-control-container'>
          <Button
            disable={loading}
            value={"Add"}
            backgroundColor="rgb(71, 94, 131)" />
        </div>
      </form>
    </Overlays>
    <div className='account-container'>

      <div className='breadcrumbs-container'>
        <BreadCrumbs />
      </div>
      <div className='controls-container'>
        <Button
          type={"submit"}
          value={"ADD"}
          onClick={() => toggleAddForm(true)}
          backgroundColor="rgb(71, 94, 131)"
          iconLeft={<><Plus size={15} /></>}
        />
        <TextField
          placeholder={"Search by Account Name, Email,...."}
          width={300}
          borderRadius={50}
          iconLeft={<Search size={20} color='#666' />}
        />
      </div>
      <div className='data-container'>
        <table>
          <thead>
            <tr className='table-header'>
              <th>ID</th>
              <th>Company</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accountDatas.data ? accountDatas.data.map((a, index) => (
              <tr className="table-row" key={a.id}>
                <td className='id-cell'><a href='#'>{a.id} <SquareArrowOutUpRightIcon size={15} /></a></td>
                <td>{a.company}</td>
                <td>{a.contact_person}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>{a.created_at}</td>
                <td className='action-cell'>
                  <Edit className='edit-btn' color='#30B376' />
                  <Trash className='delete-btn' color='#C73535' />
                </td>
              </tr>
            )) : <></>}
          </tbody>


        </table>

      </div>
      <div className='table-controls'>
        <div className='table-page-control'>
          <PageInput />
        </div>
        <div>
          <label>Total Pages: {accountDatas.totalPages}</label>
        </div>
        <div className='rows-select'>
          <select>
            <option value="row-10">10</option>
            <option value="row-30">30</option>
            <option value="row-50">50</option>
            <option value="row-70">70</option>
            <option value="row-100">100</option>
            <option value="row-200">200</option>
          </select>
        </div>
      </div>
    </div>
  </>;
};

export default Accounts;
