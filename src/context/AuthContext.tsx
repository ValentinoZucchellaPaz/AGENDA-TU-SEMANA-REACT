import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '@/DAO/config';
import { useRouter } from 'next/router';
import { AuthContextProps } from '@/types';



const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    error: null,
    handleLogin: () => undefined,
    handleSignUp: () => undefined,
    SignOut: () => undefined
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{ errorCode: string, errorMessage: string } | null>(null);
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // hace login y tmb maneja cualquier error y lo devuelve en obj
    function handleLogin(email: string, password: string): void {
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                router.push('/');
                setUser(res.user);
            })
            .catch((err) => {
                const errorCode: string = err.code.split('/').pop().split('-').join(' ');
                const errorMessage: string = err.message.replace('Firebase: ', '').split('(')[0];
                setError({ errorCode, errorMessage });
            });
    }

    // hace sign up y login juntos, tmb maneja cualquier error y lo devuelve en obj
    function handleSignUp(email: string, password: string): void {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                handleLogin(email, password);
            })
            .catch((err) => {
                const errorCode: string = err.code.split('/').pop().split('-').join(' ');
                let errorMessage: string = err.message.replace('Firebase: ', '').split('(')[0];
                setError({ errorCode, errorMessage });
            });
    }

    function SignOut(): void {
        signOut(auth)
            .then(() => setUser(null))
            .catch(() => console.log('no se pudo desloguear'));
    }


    return (
        <AuthContext.Provider value={{ user, loading, error, handleLogin, handleSignUp, SignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
