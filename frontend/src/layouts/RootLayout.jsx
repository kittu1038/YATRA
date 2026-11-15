import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import CompanionRobot from '../companion/CompanionRobot.jsx';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2F4F7] text-[#111827]">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <CompanionRobot />
    </div>
  );
}
