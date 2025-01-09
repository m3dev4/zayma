const ClientStoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex-grow">{children}</div>
    </div>
  );
};
