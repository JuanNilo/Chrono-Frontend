'use server'

import { cookies } from 'next/headers'

export async function setSessionCookie(userRole:string) {
    try{
        cookies().set('position', userRole, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // One day
            sameSite: true,
            path: '/',
        })
    } catch (error) {
        return error
    }
}

export async function deleteSessionCookie() {
    try{
        cookies().delete('position')
    } catch (error) {
        return error
    }
}