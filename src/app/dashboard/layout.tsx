import "../globals.css";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
      <div className="min-h-full flex w-full h-full items-center justify-center bg-black">
          {children}
      </div>
  );
}
