import React from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import SignUp from './Login/SignUp';
import SignIn from './Login/SignIn';
import HomePage from './Product/HomePage';
import Dashboard from './Admin/Dashboard';
import ProductForm from './Admin/ProductForm';
import Navbar from './Admin/Navbar';
import UploadAdForm from './Admin/UploadAdForm';
import '@fortawesome/fontawesome-free/css/all.min.css';
import TopNavbar from './Product/TopNavbar';
import BottomNavbar from './Product/BottomNavbar';
import AllProducts from './Product/AllProducts';
import UploadOfferForm from './Admin/UploadOfferForm';
import SearchResults from './Product/SearchResults';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductTable from './Admin/ProductTable';
import UserDetailsTable from './Admin/UserDetailsTable';
import AdvertisementDetailsTable from './Admin/AdvertisementDetailsTable';



function App() {
    const location = useLocation();
    console.log('Nav bar for console ',location.pathname); 
    const showNavbar = ['/dashboard', '/add-product','/add-advertisement','/add-offer'].includes(location.pathname);
   const tobottomnavbar = ['/types-of-foods', '/upcoming-foods','/random-foods','/ongoing','/newly-added','/updated-foods','/home','/All','/search-results'].includes(location.pathname);
   console.log(location.pathname); 
    return (
        <div className='App'>
             {tobottomnavbar && <TopNavbar />}
             {tobottomnavbar && <BottomNavbar />}
            {showNavbar && <Navbar />}
           
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/home" element={<HomePage />} />

                <Route path="/search-results" element={<SearchResults />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/product-table" element={<ProductTable />} />
                <Route path="/userdetails-table" element={<UserDetailsTable />} />
                <Route path="/advertisement-table" element={<AdvertisementDetailsTable />} />

                <Route path="/add-product" element={<ProductForm />} />
                <Route path="/add-advertisement" element={<UploadAdForm />} />
                <Route path="/add-offer" element={<UploadOfferForm />} />

                <Route path="/All" element={<AllProducts />} />
                <Route path="/upcoming-foods" element={<HomePage />} />
                <Route path="/random-foods" element={<HomePage />} />
                <Route path="/ongoing" element={<HomePage />} />
                <Route path="/newly-added" element={<HomePage />} />
                <Route path="/updated-foods" element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default App;