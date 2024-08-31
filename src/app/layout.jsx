import  "./globals.css";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import Navbar from "@/components/navbar/Navbar"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
