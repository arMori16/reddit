import axios from './components/api/axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the user is accessing the /admin route
  if (pathname.startsWith('/admin')) {
    try {
        const cookieStore = cookies();
        const atToken = cookieStore.get('accessToken')?.value
      // Send a request to the backend to verify the user's role
      const response = await axios.get('/admin/verify',{
        headers:{
            'Authorization':`Bearer ${atToken}`
        }
      });
      console.log('DTA MIDDLEWARE: ',response.data);
      
      if (response.data) {
        // User is authorized, allow them to proceed
        return NextResponse.next();
      } else {
        // User is unauthorized, redirect to login or error page
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      console.error('Error verifying admin access:', error);
      return NextResponse.redirect(new URL('/error', request.url));
    }
  }

  // For all other routes, proceed as normal
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to /admin and subroutes
};
