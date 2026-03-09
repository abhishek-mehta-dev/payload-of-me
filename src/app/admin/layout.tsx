import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Payload',
  description: 'Manage your portfolio and blog content natively.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex items-center justify-between border-b border-neutral-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
