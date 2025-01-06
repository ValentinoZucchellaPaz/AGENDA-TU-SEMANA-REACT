'use client'
import { FirestoreError } from "firebase/firestore";
import { createContext, Dispatch, ReactNode, SetStateAction, use, useState } from "react";

interface FirebaseErrorType {
    error: FirestoreError | null,
    setError: Dispatch<SetStateAction<FirestoreError | null>>
}

export const FirebaseErrorContext = createContext<FirebaseErrorType | undefined>(undefined)

export default function FirebaseErrorProvider({ children }: { children: ReactNode }) {
    const [error, setError] = useState<FirestoreError | null>(null)
    return (
        <FirebaseErrorContext value={{ error, setError }}>
            {children}
        </FirebaseErrorContext>
    )
}

// Hook personalizado para usar el contexto
export const useFirebaseErrorContext = () => {
    const context = use(FirebaseErrorContext);
    if (!context) {
        throw new Error("useFirebaseErrorContext debe usarse dentro de un AppProvider");
    }
    return context;
};