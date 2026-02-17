import { Routes, Route } from "react-router-dom";
import HomeLayout from "../layout/MainLayout";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import EventPage from "../pages/EventsPage";
import MyProfilePage from "../pages/MyProfilePage";
import HomePage from "../pages/HomePage";
import ViewProfile from "../pages/ViewProfile";
import Create from "../pages/Create";
import MainLayout from "../layout/MainLayout";
import HelpPage from "../pages/HelpPage";
import CommunityPage from "../pages/CommunityPage";
import ChatPage from "../pages/ChatPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import OtpVerificationPage from "../pages/OtpVerificationPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import EventPreview from "../components/EventPreview";
import PublishedEventsPage from "../pages/PublishedEventsPage";
import RegisteredUsersPage from "../pages/RegisteredUsersPage";
import EditEventPage from "../pages/EditEventPage";
import PastEventsList from "../pages/PastEventsList";
import CompletedEventsPage from "../pages/CompletedEventsPage";
import QRScanner from '../pages/QRScanner';
import ProtectedRoute from '../components/ProtectedRoute';

function CustomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />   
      <Route path={`/profile/:id`} element={<MyProfilePage />} />
      <Route path="/events" element={<EventPage/>}/>
      <Route path="/viewprofile/:userId" element={<ViewProfile />} />
      <Route path="/help" element={<HelpPage/>  }/>
      <Route path="/create" element={<ProtectedRoute><MainLayout><Create/></MainLayout></ProtectedRoute>}/>
      <Route path="/app" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

      <Route path="/communities" element={<CommunityPage/>}/>
      <Route path="/chats" element={<ProtectedRoute><ChatPage/></ProtectedRoute>}/>
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/otp-verification" element={<OtpVerificationPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      
      <Route path="/event-preview" element={<EventPreview />} />
      <Route path="/published-events" element={<ProtectedRoute><MainLayout><PublishedEventsPage/></MainLayout></ProtectedRoute>} />
      <Route path="/event/:eventId/registereduser" element={<ProtectedRoute><MainLayout><RegisteredUsersPage /></MainLayout></ProtectedRoute>} />
      <Route path="/edit-event/:id" element={<ProtectedRoute><MainLayout><EditEventPage/></MainLayout></ProtectedRoute>}/>
      <Route path="/past-events" element={<ProtectedRoute><MainLayout><PastEventsList/></MainLayout></ProtectedRoute>}/>

      <Route path="/completed-events" element={<ProtectedRoute><MainLayout>
        <CompletedEventsPage/>
      </MainLayout></ProtectedRoute>}/>  
      <Route path="/chat/:conversationId?" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
      <Route path="/qr-scanner" element={<ProtectedRoute><QRScanner /></ProtectedRoute>} />
    </Routes>
  );
}

export default CustomeRoutes;
