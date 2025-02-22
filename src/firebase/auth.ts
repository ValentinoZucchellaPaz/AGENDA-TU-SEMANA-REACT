import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, Unsubscribe, User } from 'firebase/auth'
import { auth } from './config'

export async function signUpWithMail(email: string, password: string): Promise<User> {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user
}

export async function loginWithMail(email: string, password: string): Promise<User> {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
}

export function logout(): void {
    signOut(auth)
}

export function userChangeListener(
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Unsubscribe {
    return onAuthStateChanged(auth, (user) => {
        setUser(user)
        setLoading(false)
    })
}