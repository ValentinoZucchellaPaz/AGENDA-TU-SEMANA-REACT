import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FirestoreError } from "firebase/firestore";

interface FormProps {
    login: boolean,
    handleSubmit: (e: FormEvent) => void,
    error: FirestoreError | null
}

export default function AuthForm({ login, handleSubmit, error }: FormProps) {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto py-5 justify-center items-center w-full">
            <h3 className="text-3xl font-bold">{login ? 'Login' : 'Crea tu cuentas'}</h3>
            {error && <p className="text-red-600">Parece que ocurrio un error: {error.message.replace('Firebase: Error (auth/', '').replace(')', '')}</p>}
            <div className="min-w-[80%] lg:min-w-96">
                <Label htmlFor="auth-email">Email</Label>
                <Input type="email" id="auth-email" name="email" required placeholder="ej. ejemplo@gmail.com" />
            </div>
            <div className="min-w-[80%] lg:min-w-96">
                <Label htmlFor="auth-password">Contraseña</Label>
                <Input type="password" id="auth-password" name="password" required placeholder="ej. contraseña-de-agenda" />
            </div>
            <Button type="submit" variant='secondary' className="shadow-lg">Submit</Button>
        </form>
    )
}