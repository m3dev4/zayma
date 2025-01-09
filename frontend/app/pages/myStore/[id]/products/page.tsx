/* eslint-disable @typescript-eslint/no-unused-vars */
import SideBarDashboard from '@/components/sideBarDashboard';
import PagePrincipalProductId from './page';

const Product = () => {
  return (
    <div className="w-full min-h-screen h-screen bg-primary overflow-hidden">
      <div className="p-0 w-full m-auto">
        <SideBarDashboard />
      </div>
    </div>
  );
};

export default Product;
