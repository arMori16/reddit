"use server"
import  "@/app/globals.css";
import { tokenManager } from "@/components/api/setup-token";
import ClientRefreshToken from "@/components/api/clientRefreshToken";
import Navbar from "@/components/navbar/Navbar"
import { getStateFromCookiesStorage } from "@/utils/getUserState";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";



export default async function RootLayout({ children }:any) {
  const userState = await getStateFromCookiesStorage();
  return (
      <html lang="en" className="min-h-[100vw]">
        <body className="min-h-[100vw] overflow-x-hidden overflow-y-scroll bg-[#242424] relative">
        <ClientRefreshToken/>
        <ToastContainer position="bottom-right"/>
          <Navbar user={userState}/>
          {children}
        </body>
      </html>
  );
}
