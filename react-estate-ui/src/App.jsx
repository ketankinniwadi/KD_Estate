import './layout.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar' 
import HomePage from './routes/homepage/HomePage'
import LoginPage from './routes/loginpage/LoginPage'
import SignUpPage from './routes/signpage/SignUpPage'
import ListPage from './routes/listpage/ListPage'
import SinglePage from './routes/singlepage/SinglePage';
import InquiryForm from './routes/inquirypage/InquiryForm';
import OwnerPage from './routes/ownerpage/OwnerPage';
import AddPropertyPage from './routes/addpropertypage/AddPropertypage';
import ProtectedRoute from './ProtectedRoute';  // Import ProtectedRoute
import DeleteProperty from './routes/deletepage/deletepage';
import ForgotPassword from './routes/forgotpassword/ForgotPassword';

import ResetPassword from './routes/resetpassword/ResetPassword';
function App() {
  return (
    <Router>
      <div className="layout">
        <div className="nav">
          <Navbar />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/:id" element={<SinglePage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<ResetPassword />} />
            
            {/* ✅ Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
              <Route path="/inquiry/:propertyId" element={<InquiryForm />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["OWNER"]} />}>
              <Route path="/owner" element={<OwnerPage />} />
              <Route path='/addproperty' element={<AddPropertyPage />} />
              <Route path='/deleteproperty/:id' element={<DeleteProperty />} />
            </Route>
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
