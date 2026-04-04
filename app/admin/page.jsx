'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Orders from './components/Orders.jsx';
import Products from './components/Products.jsx';
import Coupons from './components/Coupons';
import Users from './components/Users';
import Reviews from './components/Reviews';
import Analytics from './components/Analytics';
import Refunds from './components/Refunds';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'orders':
        return <Orders />;
      case 'products':
        return <Products />;
      case 'coupons':
        return <Coupons />;
      case 'users':
        return <Users />;
      case 'reviews':
        return <Reviews />;
      case 'analytics':
        return <Analytics />;
      case 'refunds':
        return <Refunds />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-background flex-col sm:flex-row">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-auto scroll-smooth">
        {renderSection()}
      </main>
    </div>
  );
}
