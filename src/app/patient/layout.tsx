
import MarginWidthWrapper from "@/components/margin-width-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex">
        {children}
      </div>

    </div>
  );
}
