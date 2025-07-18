import Header from "./components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col h-screen ">
        <Header />
        {children}
      </div>
    </>
  );
}
