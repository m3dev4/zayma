import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('jwt')?.value;

    if (!token && request.nextUrl.pathname.startsWith('/pages/myStore')) {
        console.log('Redirection vers login - Pas de token');
        return NextResponse.redirect(new URL('/pages/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/pages/myStore/:path*',
        '/pages/myStore/:id/:path*'
    ]
}; 