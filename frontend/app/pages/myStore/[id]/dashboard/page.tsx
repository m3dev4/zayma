import SideBarDashboard from '@/components/sideBarDashboard';

const Dashboard = () => {
  return (
    <div className="w-full h-full min-h-screen bg-primary overflow-hidden">
      <div className="flex justify-between items-center">
        <div className="p-0 w-full m-auto">
          <SideBarDashboard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
