"use server"
import  "@/app/globals.css";
import '@fortawesome/fontawesome-free/css/all.css';
import { tokenManager } from "@/api/setup-token";
import ClientRefreshToken from "@/api/clientRefreshToken";
import Navbar from "@/components/navbar/Navbar"
import { getStateFromCookiesStorage } from "@/utils/getUserState";
import { ToastContainer } from "react-toastify";
import axios from "@/api/axios";
import { cookies } from "next/headers";
import initTranslations from "@/lib/i18react";
import TranslationsProvider from "@/utils/translations/TransProvider";
export default async function RootLayout({ children }:any) {
  const userState = await getStateFromCookiesStorage();
  const userFirstname = userState === 'registered'? await axios.get('/user/firstname',{
    headers:{
        'Authorization':`Bearer ${cookies().get('accessToken')?.value}`
    }
  }) : null;
  const currentLang = cookies().get("NEXT_LOCALE")?.value || "ru";
  const { t, resources } = await initTranslations(currentLang, ['home']);
  return (
      <html lang={currentLang} className="min-h-screen">
        <TranslationsProvider resources={resources} locale={currentLang} namespaces={['home']}>
          <body className="min-h-screen pt-[14rem] overflow-x-hidden overflow-y-scroll bg-[#242424] relative">
          <ClientRefreshToken/>
          <ToastContainer position="bottom-right"/>
            <Navbar user={userState} userFirstName={userFirstname?.data}/>
            {children}
          </body>
        </TranslationsProvider>
      </html>
  );
}
