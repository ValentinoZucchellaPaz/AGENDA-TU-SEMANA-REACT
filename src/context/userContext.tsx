"use client"
import { User } from "firebase/auth"
import { createContext, ReactNode, use, useEffect, useState } from "react"
import { userChangeListener } from "@/firebase/auth"

export const UserContext = createContext<{ user: User | null, loading: boolean } | undefined>(undefined)

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = userChangeListener(setUser, setLoading)
        return () => unsub()
    }, [])

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    )
}

// hook para usar contexto
export const useUserContext = () => {
    const context = use(UserContext);
    if (!context) {
        throw new Error("useFirebaseContentContext debe usarse dentro de un AppProvider");
    }
    return context;
};