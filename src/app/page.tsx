
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { login } from "@/components/redux/userSlice";
import Navbar from "@/components/navbar/Navbar";
import { RootState } from "@/components/redux/userStore";
import { QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import { cookies, headers } from "next/headers";
import redis from "@/redis/redisConfig";




export default async function Home() {
  
  return (
      <>
        <h1>HI!</h1>
      </>
  );

}
