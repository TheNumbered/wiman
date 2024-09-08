import React from 'react';
import Layout from '../../components/sidebar/Layout';
import DashboardCards from './DashboardCards';

const AdminDashboard: React.FC = () => {
  // const [activePage, setActivePage] = useState<string>(''); // State to track the active page

  /*const handleSidebarItemClick = (page: string) => {
    setActivePage(page);
  };*/

  return (
    <Layout hasSearch={false} onSidebarItemClick={handleSidebarItemClick}>
      <DashboardCards />
      {/* The Layout component already handles rendering the correct content based on activePage */}
    </Layout>
  );
};

export default AdminDashboard;
