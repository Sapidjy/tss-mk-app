import UserFooter from "@/src/components/UserFooter";
import UserHeader from "@/src/components/UserHeader";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <UserHeader />

      <main className="flex-1">
        {children}
      </main>

      <UserFooter />
    </div>
  );
}
