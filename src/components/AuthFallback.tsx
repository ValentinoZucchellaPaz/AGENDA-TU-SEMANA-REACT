'use client'
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { useFirebaseErrorContext } from "@/context/firebaseErrorContext";
import { loginWithMail, signUpWithMail } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AuthFallback() {
    const [login, setLogin] = useState(true)
    const router = useRouter()
    const { error, setError } = useFirebaseErrorContext()

    function handleLogin(e: FormEvent) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        if (login) {
            loginWithMail(email, password).then(() => {
                router.push('/')
                setError(null)
            }).catch(e => setError(e))
        } else {
            signUpWithMail(email, password).then(() => {
                router.push('/')
                setError(null)
            }).catch(e => setError(e))
        }
        form.reset()
    }

    return (<>
        <div className='mx-auto md:w-2/3 bg-darkGray dark:bg-black flex flex-col gap-3 justify-center items-center px-8 py-3 mt-10 rounded-xl text-white shadow-lg'>
            <AuthForm login={login} handleSubmit={handleLogin} error={error} />
        </div>
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