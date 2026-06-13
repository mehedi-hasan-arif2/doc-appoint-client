import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "DocAppoint - Premium Doctor Appointment Manager",
  description: "Securely book and manage elite clinical doctor appointments effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" style={{ colorScheme: "dark" }}>
      <body className="flex flex-col min-h-screen antialiased bg-[#0b0f19]"> 
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}