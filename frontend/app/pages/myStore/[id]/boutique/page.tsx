import SideBarDashboard from '@/components/sideBarDashboard';
import React from 'react';
import UpdateStore from './update/page';
import DeleteProduct from '../products/[productId]/delete/page';

const GetMyStore = () => {
  return (
    <div className="w-full min-h-screen h-full bg-primary overflow-hidden">
      <div className="p-0 w-full m-auto flex items-center gap-20">
        <div>
          <SideBarDashboard />
        </div>
        <div className="flex items-center justify-center">
          <UpdateStore />
          <DeleteProduct />
        </div>
      </div>
    </div>
  );
};

export default GetMyStore;
