import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    if(!sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url))
    } else {
        return NextResponse.next();
    }
}

export const config = { matcher: ["/dashboard/:path*"] }