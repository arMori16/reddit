import axios  from "./axios";
import * as jwt_decode from "jwt-decode";
import {Decoded} from '../api/interfaces/decoded.interface';

const refreshToken = async()=>{
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('getItem(refreshtoken)');
    const {data} = await axios.post('/refresh',{refreshToken});
    console.log('post sdelan');
    localStorage.setItem('accessToken',data.accessToken);
    localStorage.setItem('refreshToken',data.refreshToken);
    return data.accessToken;
}
export const setupTokenRefresh = async()=>{
    const token = localStorage.getItem('accessToken');
    if(!token) return;
    const decoded_token = jwt_decode.jwtDecode<Decoded>(token);
    const expirationTime = decoded_token.exp *1000;
    const currentTime = Date.now();
    console.log('all decoded');

    const timeToRefresh = expirationTime - currentTime - 60000;
    if(timeToRefresh>0){
        setTimeout(async()=>{
            console.log('vizvan refresh Token');
            const newToken = await refreshToken();
            setupTokenRefresh();
        },timeToRefresh)
    }
    else{
        refreshToken().then(()=>{
            setupTokenRefresh();
        });
    }

}