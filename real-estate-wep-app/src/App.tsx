import { useEffect, useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import ManageCareersPage from './pages/admin/managecareers';
import ManagePropertiesPage from './pages/admin/manageproperties';
import PortalAccessPage from './pages/admin/portalaccess';
import SettingsPage from './pages/admin/settings';
import TransactionsPage from './pages/admin/transactions';
import UsersPage from './pages/admin/users';
import AdminFooterComponent from './components/admin/AdminFooterComponent';
import AdminHeaderComponent from './components/admin/AdminHeaderComponent';
import ClientHeaderComponent from './components/client/ClientHeaderComponent';
import CareersPage from './pages/client/careers';
import ContactPage from './pages/client/contact';
import DescriptionPage from './pages/client/description';
import FavoritesPage from './pages/client/favorites';
import Error404Page from './pages/client/error404';
import HelpCenterPage from './pages/client/helpcenter';
import HomePage from './pages/client/home';
import ListingPage from './pages/client/listing';
import PriceHistoryPage from './pages/client/pricehistory';
import PrivacyPolicyPage from './pages/client/privacy';
import ProfilePage from './pages/client/profile';
import ResetPasswordPage from './pages/client/resetpassword';
import SignInPage from './pages/client/signin';
import SignUpPage from './pages/client/signup';
import SocialsPage from './pages/client/socials';
import TermsAndConditionsPage from './pages/client/termsandcondition';
import { AuthUtils } from './services/state/authUtil';
import ClientFooterComponent from './components/client/ClientFooterComponent';
import MyPropertiesPage from './pages/client/properties';
import { fetchCompanyInfo, Setting } from './services/dbservices/company/FetchCompanyInfo';
import ForgotPasswordPage from './pages/client/forgotpassword';
import EmailVerificationPage from './pages/client/emailverification';
import { getLoginSession } from './services/session/UserLoginSession';
import MyTransactionsPage from './pages/client/mytransactions';
import { AdminLoginProp } from './models/interfaces/AdminLoginInterface';
import GreetingsComponent from './components/admin/GreettingsComponent';
import AdminMenuComponent from './components/admin/AdminMenuComponent';
import TicketPage from './pages/admin/tickets';
import ManageFAQPage from './pages/admin/managefaq';
import "../src/shimmer.css";
import "../src/general.css";
import ManageTestimonialPage from './pages/admin/managetestimonials';
import ManageMailingListPage from './pages/admin/managemailinglist';
import SBPIPage from './pages/client/sbpi';

function App() {
  const isAdmin = AuthUtils.isAdmin(window.location.pathname);
  
  const navigate = useNavigate();

  const [settings, setSettings] = useState<Setting[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string>("");
  const [savedUserEmail, setUserEmail] = useState<string>("");
  const [loginId, setLoginId] = useState<string>("");
  const [savedUserId, setUserId] = useState<string>("");

  const [adminInfo, setAdminData] = useState<AdminLoginProp>({
    adminId: "",
    adminEmail: "",
    adminLoginId: "",
    adminPhone: "",
    adminFirstName: "",
    adminLastName: ""
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {

        if(isAdmin)
        {
          const storedAdminData: AdminLoginProp = {
            adminId: localStorage.getItem("adminId") || "",
            adminEmail: localStorage.getItem("adminEmail") || "",
            adminLoginId: localStorage.getItem("adminLoginId") || "",
            adminPhone: localStorage.getItem("adminPhone") || "",
            adminFirstName: localStorage.getItem("adminFirstName") || "",
            adminLastName: localStorage.getItem("adminLastName") || "",
          };

          if (isAdmin) {
            if (!AuthUtils.isAdminPortalPage()) {
              if(!storedAdminData.adminId){
                navigate("/");
                return;
              }              
            }
          }
          
          setAdminData(storedAdminData);
        }
        else
        {
          const savedEmail = await getLoginSession("userEmail");
          const signInId = await getLoginSession("loginId");
          const userId = await getLoginSession("userId");

          setUserEmail(savedEmail);
          setLoginId(signInId);
          setUserId(userId);
        }
        

        const data = await fetchCompanyInfo();
        setSettings(data);       

      } catch (err) {
        setError("Failed to load settings");
      }
      setLoading(false);
    };

    getData();

  }, [isAdmin, location.pathname]);

  const shouldShowHeaderFooter = (): boolean => {
    const hiddenPaths = [
      "/signup",
      "/signin",
      "/forgotpassword",
      "/emailverification",
      "/resetpassword",
      "/portalaccess",
    ];
    return !hiddenPaths.includes(location.pathname);
  };
   

  return (
    isAdmin ? 
    <div id="layout-wrapper">
      <AdminHeaderComponent adminInfo={adminInfo} />

      <div className="vertical-overlay"></div>
      

      {shouldShowHeaderFooter() && <AdminMenuComponent />}

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="h-100">

                {shouldShowHeaderFooter() && <GreetingsComponent />}                  

                  <Routes>
                    {/* Admin Pages */}

                    {/* <Route path="/" element={<PortalAccessPage/>} /> */}                    
                    <Route path="/managecareers" element={<ManageCareersPage />} />
                    <Route path="/managefaq" element={<ManageFAQPage />} />
                    <Route path="/managemailinglist" element={<ManageMailingListPage />} />
                    <Route path="/manageproperties" element={<ManagePropertiesPage />} />
                    <Route path="/managetestimonials" element={<ManageTestimonialPage />} />
                    <Route path="/portalaccess" element={<PortalAccessPage  />} />                    
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/tickets" element={<TicketPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/users" element={<UsersPage />} />
                    import SBPIPage from './pages/client/sbpi';
// ...
<Route path="/sbpi" element={<SBPIPage />} />
                    
                  </Routes>

                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminFooterComponent />      

      </div>     
    </div>
  :
    <div>
    <ClientHeaderComponent settings={settings} savedUserEmail={savedUserEmail} loginId={loginId} />
        <Routes>
          {/* Client Pages */}
          <Route path="/careers" element={<CareersPage settings={settings}/>} />
          <Route path="/contact" element={<ContactPage settings={settings} />} />
          <Route path="/description" element={<DescriptionPage settings={settings}/>} />
          <Route path="/error404" element={<Error404Page />} />
          <Route path="/myfavorites" element={<FavoritesPage/>} />
          <Route path="/helpcenter" element={<HelpCenterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/pricehistory" element={<PriceHistoryPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage settings={settings} />} />
          <Route path="/profile" element={<ProfilePage savedUserEmail={savedUserEmail} loginId={loginId} />} />
          <Route path="/myproperties" element={<MyPropertiesPage savedUserId={savedUserId}/>} />
          <Route path="/mytransactions" element={<MyTransactionsPage savedUserId={savedUserId}/>} />
          <Route path="/resetpassword" element={<ResetPasswordPage savedUserEmail={savedUserEmail} loginId={loginId} />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage savedUserEmail={savedUserEmail} loginId={loginId}/>} />
          <Route path="/emailverification" element={<EmailVerificationPage savedUserEmail={savedUserEmail} loginId={loginId} />} />
          <Route path="/signin" element={<SignInPage savedUserEmail={savedUserEmail} loginId={loginId} />} />
          <Route path="/signup" element={<SignUpPage savedUserEmail={savedUserEmail} loginId={loginId} />} />
          <Route path="/socials" element={<SocialsPage settings={settings} />} />
          <Route path="/termsandconditions" element={<TermsAndConditionsPage settings={settings} />} />
          <Route path="/login" element={<SignInPage savedUserEmail={savedUserEmail} loginId={loginId} />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<Error404Page />} />
        </Routes>
      <ClientFooterComponent settings={settings} savedUserEmail={savedUserEmail} loginId={loginId} />
    </div>
  );
}

export default App;
