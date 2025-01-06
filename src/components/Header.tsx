'use client'
import { ToggleTheme } from "./ui/ToggleTheme";
import Nav from "./Nav";
import UserMenu from "./UserMenu";
import { useFirebaseContentContext } from "@/context/firebaseContentContext";

export default function Header() {
    const { user } = useFirebaseContentContext()

    return (
        <header className="flex flex-row w-full justify-around items-center px-5 py-3 bg-primary dark:bg-black dark:bg-opacity-80">
            <h1 className="text-white font-semibold text-lg">AGENDA TU SEMANA</h1>
            {user?.email ? (
                <>
                    <Nav />
                    <div className="flex flex-row gap-4">
                        <ToggleTheme />
                        <UserMenu userMail={user.email} />
                    </div>
                </>
            )
                : <ToggleTheme />
            }
        </header>
    )
}