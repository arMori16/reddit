import { NextRequest, NextResponse } from "next/server";




export async function middleware(request:NextRequest){
    const userState = request.cookies.get('state');
    console.log(`IT'S MIDDLEWARE: `,userState);
    if(userState?.value === 'registered'){
        console.log('TOCKEN CACHED IN REDIS: ',userState.value);
    }
    
    return NextResponse.next();    
}