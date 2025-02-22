'use client'
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { useFirebaseErrorContext } from "@/context/firebaseErrorContext";
import { loginWithMail, signUpWithMail } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AuthContainer() {
    const [login, setLogin] = useState(true) // login or sign up flag
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { error, setError } = useFirebaseErrorContext()

    function handleLogin(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        if (login) {
            loginWithMail(email, password).then(() => {
                router.push('/')
                setError(null)
            })
                .catch(e => setError(e))
                .finally(() => setLoading(false))
        } else {
            signUpWithMail(email, password).then(() => {
                router.push('/')
                setError(null)
            })
                .catch(e => setError(e))
                .finally(() => setLoading(false))
        }
        form.reset()
    }

    return (<>
        {loading ?
            <div className="flex justify-center items-center h-[50dvh]">
                <span className="loader"></span>
            </div> :
            <div className='mx-auto md:w-2/3 flex flex-col gap-3 justify-center items-center px-8 py-3 mt-10 rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50'>

                <AuthForm login={login} handleSubmit={handleLogin} error={error} />
            </div>}
        <div className="py-6 w-full flex flex-col items-center">
            <p>{login ? '¿No tienes una cuenta? Comienza a guardar tus tareas' : '¿Ya tienes una cuenta? Allí están tus tareas'}</p>
            <Button onClick={() => {
                setLogin((prev) => !prev)
                setError(null)
            }} variant='outline' className="w-fit shadow-lg">
                {login ? 'Crear cuenta' : 'Login'}
            </Button>
        </div>
    </>
    )
}