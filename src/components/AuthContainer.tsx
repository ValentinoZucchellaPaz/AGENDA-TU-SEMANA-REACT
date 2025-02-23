'use client'
import AuthForm from "@/components/AuthForm";
import { useFirebaseErrorContext } from "@/context/firebaseErrorContext";
import { loginWithMail, signUpWithMail } from "@/firebase/auth";
import { FormEvent, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function AuthContainer() {
    const [loading, setLoading] = useState(false)
    const { error, setError } = useFirebaseErrorContext()

    function handleLogin(e: FormEvent, login: boolean) {
        e.preventDefault()
        setLoading(true)
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const authMethod = login ? loginWithMail : signUpWithMail

        authMethod(email, password)
            .then(() => {
                form.reset()
                setError(null)
            })
            .catch(e => setError(e))
            .finally(() => setLoading(false))
    }

    return (
        <Tabs defaultValue="login" className="mx-auto md:w-2/3 px-8 py-3 mt-10 rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
            <TabsList>
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="sign-up">Crear Cuenta</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <AuthForm
                    login={true}
                    handleSubmit={(e) => handleLogin(e, true)}
                    error={error}
                    loading={loading} />
            </TabsContent>
            <TabsContent value="sign-up">
                <AuthForm
                    login={false}
                    handleSubmit={(e) => handleLogin(e, false)}
                    error={error}
                    loading={loading} />
            </TabsContent>
        </Tabs>
    )
}