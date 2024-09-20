'use client'

import { setupTokenRefresh } from "../api/setup-token"


export const ClientRefresh = ()=>{
    setupTokenRefresh();
    return null;
}