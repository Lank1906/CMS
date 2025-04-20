import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Button from '../../components/ui/Button';
import './account.css';
import TextField from '../../components/ui/TextField';
import { useState } from "react";
import PageInput from '../../components/ui/PageInput';

const Accounts = () => {
  const [page, setPage] = useState(1);
  return <>
    <div className='account-container'>
      <div className='breadcrumbs-container'>
        <BreadCrumbs />
      </div>
      <div className='controls-container'>
        <Button
          value={"ADD"}
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
          <tr className='table-header'>
            <th>ID</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>

        </table>
        <div className='table-controls'>
          <div className='table-page-control'>
            
            <PageInput/>
            
          </div>
          <div>
            <label>Total Pages:</label>
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
    </div>
  </>;
};

export default Accounts;
