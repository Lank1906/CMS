import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import MainLayout from './pages/layout/MainLayout';
import Accounts from './pages/Account/Account';
import Projects from './pages/Projects/Projects';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='/accounts' element={<Accounts/>}/>
          <Route path='/projects' element={<Projects/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
