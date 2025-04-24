import { ChevronLeft, ChevronRight, Edit, Plus, Search, SquareArrowOutUpRightIcon, Trash } from 'lucide-react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Button from '../../components/ui/Button';
import './account.css';
import TextField from '../../components/ui/TextField';
import { use, useEffect, useRef, useState } from "react";
import PageInput from '../../components/ui/PageInput';
import Overlays from '../../components/Overlays/Overlays'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import ConfirmDialog from '../../components/Dialogs.jsx/ConfirmDialog';
const Accounts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [accountDatas, setAccountDatas] = useState([]);
  const [showAddForm, toggleAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectAccountId, setSelectAccountId] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const companyInputRef = useRef();
  const contactPersonInputRef = useRef();
  const emailInputRef = useRef();

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
  }, [page, limit]);

  const fetchDataById = async (id) => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/accounts/${id}`).then(res => {
      setAccountCreating(res.data.data);
      setLoading(false)
    }).catch(err => {
      toast.error(err.response?.data?.message || err.status + ": Account api error!", { position: "bottom-right" });
    })
  }

  useEffect(() => {
    searchData()
  }, [keyword]);

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/accounts/${selectAccountId}`).then(res => {
      fetchData();
      toast.info(`Account deleted!`, { position: "bottom-right" })
    }).catch(err => {
      toast.error(err.response?.data?.message || err.status + ": Account api error!");
    });
  };
  const searchData = async () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/accounts/search-query?keyword=${keyword}`, {
      limit: limit,
      page: page
    }).then(res => {
      setAccountDatas(res.data);
      setLoading(false)
    }).catch(err => {
      toast.error(err.response?.data?.message || err.status + ": Account api error!", { position: "bottom-right" });
    })
  }
  const fetchData = async () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/accounts?page=${page}&limit=${limit}`).then(res => {
      setAccountDatas(res.data);
      setLoading(false)
    }).catch(err => {
      toast.error(err.response?.data?.message || err.status + ": Account api error!", { position: "bottom-right" });
    })
  }

  const accountCreateSubmit = (event) => {
    event.preventDefault();
    const inputs = [companyInputRef, contactPersonInputRef, emailInputRef];
    inputs.forEach((input) => {
      const value = input.current.querySelector("input").value;
      if (value.trim() === "") {
        input.current.style.borderColor = "red";
        input.current.style.boxShadow = "0px 0px 10px rgba(255, 0, 0, 0.24)";
      } else {
        input.current.style.borderColor = "";
        input.current.style.boxShadow = "none";
      }
    });
    if (isEdit) {
      delete accountCreating.created_at;
      delete accountCreating.id;
      axios.patch(`${process.env.REACT_APP_BACKEND_URL}/accounts/${selectAccountId}`, accountCreating).then(res => {
        toast.success("Account update successfully!", { position: "bottom-right" });
        fetchData();
        return toggleAddForm(false);
      }).catch(err => {
        toast.error(err.response?.data?.message || "Account create error!", { position: "bottom-right" });
      });
    } else {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/accounts`, accountCreating).then(res => {
        toast.success("Account create successfully!", { position: "bottom-right" });
        fetchData();
        return toggleAddForm(false);
      }).catch(err => {
        toast.error(err.response?.data?.message || "Account create error!", { position: "bottom-right" });
      });
    }
  };
  return <>
    <ConfirmDialog
      open={showDialog}
      onClose={() => setShowDialog(false)}
      onConfirm={handleDelete}
      title="Delete confirm?"
      message="Are you sure you want to perform this action?"
    />
    <Overlays
      title={isEdit ? "UPDATE ACCOUNT" : "NEW ACCOUNT"}
      show={showAddForm}
      closeWhenClickOverlay={false}
      onClose={() => toggleAddForm(false)}>
      <form
        className='account-add-form-container'
        onSubmit={accountCreateSubmit}
      >
        <div className='input-field-container'>
          <div className='label-container'>
            <label>Company</label><label className='asterisk' title='Required field'> *</label>
          </div>
          <TextField ref={companyInputRef} borderRadius={3} placeholder={"Company"}
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
          <TextField ref={contactPersonInputRef} borderRadius={3} placeholder={"Contact Person"}
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
          <TextField ref={emailInputRef} type={"email"} borderRadius={3} placeholder={"examle@gmail.com"}
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
            <label>URL</label>
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
            type={"submit"}
            disable={loading}
            value={isEdit ? "Update" : "Add"}
            backgroundColor="var(--color-primary)" />
        </div>
      </form>
    </Overlays>
    <div className='account-container'>

      <div className='breadcrumbs-container'>
        <BreadCrumbs />
      </div>
      <div className='controls-container'>
        <Button
          value={"ADD"}
          onClick={() => { setEdit(false); toggleAddForm(true) }}
          backgroundColor="var(--color-primary)"
          iconLeft={<><Plus size={15} /></>}
        />
        <TextField
          type={"search"}
          placeholder={"Search by Account Name, Email,...."}
          width={300}
          borderRadius={50}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
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
                <td><a href={`mailto:${a.email}`}>{a.email}</a></td>
                <td>+{a.phone}</td>
                <td>{new Date(a.created_at).toUTCString()}</td>
                <td className='action-cell'>
                  <button onClick={() => {
                    setEdit(true);
                    fetchDataById(a.id);
                    setSelectAccountId(a.id);
                    toggleAddForm(true);
                  }}>
                    <Edit className='edit-btn' color='var(--color-primary)' />
                  </button>
                  <button onClick={() => {
                    setSelectAccountId(a.id);
                    setShowDialog(true)
                  }}>
                    <Trash className='delete-btn' color='#C73535' />
                  </button>
                </td>
              </tr>
            )) : <></>}
          </tbody>


        </table>

      </div>
      <div className='table-controls'>
        <div className='table-page-control'>
          <PageInput max={accountDatas.totalPages}
            onChange={p => {
              setPage(p)
            }}
            page={page} />
        </div>
        <div>
          <label>Total Pages: {accountDatas.totalPages}</label>
        </div>
        <div className='rows-select'>
          <select onChange={(e) => {
            setPage(1);
            setLimit(e.target.value);
          }}>
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
  </>;
};

export default Accounts;
