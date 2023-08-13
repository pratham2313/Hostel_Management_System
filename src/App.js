
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Table_feeStatus from './pages/table_feeStatus';
import Table from './pages/table_manageStudent';
import Table_roomAllotment from './pages/table_roomAllotment';
import DashHomepage from './pages/DashHomepage';
import Table_roomStatus from './pages/table_roomStatus';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roomStatusPage" element={<Table_roomStatus />} />
          <Route path="/dashhome" element={<DashHomepage />} />
          <Route path="/manageStudentPage" element={<Table />} />
          <Route path="/feeStatusPage" element={<Table_feeStatus />} />
          <Route path="/roomAllocationPage" element={<Table_roomAllotment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
