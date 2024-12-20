'use client'

import { useEffect } from "react"
import { tokenManager } from "./setup-token"

const ClientRefreshToken = ()=>{
    useEffect(()=>{
        tokenManager.setupTokenRefresh()
        return(
            tokenManager.stopTokenRefresh()
        )
    })
    return null;
}
export default ClientRefreshToken;