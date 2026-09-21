// import { Footer } from "@/components/layout/footer";
// import { Navbar } from "@/components/layout/navbar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      {/* <Navbar /> */}

      {children}

      {/* <Footer /> */}
    </div>
  );
}
