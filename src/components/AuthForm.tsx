import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FirestoreError } from "firebase/firestore";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface FormProps {
    login: boolean,
    handleSubmit: (e: FormEvent) => void,
    error: FirestoreError | null,
    loading: boolean
}

export default function AuthForm({ login, handleSubmit, error, loading }: FormProps) {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto py-5 justify-center items-center w-full">
            <h3 className="text-3xl font-bold">{login ? 'Login' : 'Crea tu cuentas'}</h3>
            {error && <p className="text-red-600">Parece que ocurrio un error: {error.message.replace('Firebase: Error (auth/', '').replace(')', '')}</p>}
            <div className="min-w-[80%] lg:min-w-96">
                <Label htmlFor="auth-email">Email</Label>
                <Input type="email" id="auth-email" name="email" required placeholder="ej. ejemplo@gmail.com" />
            </div>
            <div className="min-w-[80%] lg:min-w-96 relative">
                <Label htmlFor="auth-password">Contraseña</Label>
                <Input type={showPassword ? "text" : "password"} id="auth-password" name="password" required placeholder="ej. contraseña-de-agenda" />
                <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            <Button type="submit" disabled={loading} variant='secondary' className="shadow-lg">
                {loading ? <Loader2 className=" animate-spin" /> : "Submit"}
            </Button>
        </form>
    )
}