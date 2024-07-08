import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const positionCookie = request.cookies.get('position');
    const position = positionCookie?.value;

    const url = request.nextUrl.clone();

    // Excluir las rutas públicas del middleware
    const publicPaths = ['/', '/account', '/unauthorized'];
    if (publicPaths.includes(url.pathname)) {
        return NextResponse.next();
    }

    if (!positionCookie) {
        // Si no hay posición, redirigir al login o a una página genérica de no autorizado
        return NextResponse.redirect(new URL('/', request.url));
    }

    switch (position) {
        case 'employee':
            // Redirigir a los empleados a su dashboard
            if (!url.pathname.startsWith('/employee') && !url.pathname.startsWith('/record') && !url.pathname.startsWith('/appointments')) {
                url.pathname = '/employee';
                return NextResponse.redirect(url);
            }
            break;
        case 'secretary':
            // Redirigir a los secretarios a su dashboard
            if (!url.pathname.startsWith('/secretary') && !url.pathname.startsWith('/appointments')) {
                url.pathname = '/secretary';
                return NextResponse.redirect(url);
            }
            break;
        case 'patient':
            // Redirigir a los pacientes a su dashboard
            if (!url.pathname.startsWith('/patient') && !url.pathname.startsWith('/appointments') && !url.pathname.startsWith('/record')) {
                url.pathname = '/patient';
                return NextResponse.redirect(url);
            }
            break;
        default:
            // Si la posición es inválida, redirigir a una página genérica de no autorizado
            return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
