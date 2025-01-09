'use client';

interface ClientStoreLayoutProps {
  children: React.ReactNode;
}

const ClientStoreLayout = ({ children }: ClientStoreLayoutProps) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default ClientStoreLayout;
