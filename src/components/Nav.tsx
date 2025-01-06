'use client'

import { links } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Nav() {
    const path = usePathname()
    return (
        <nav className="hidden md:flex flex-row justify-around w-fit px-4 gap-5">
            {
                links.map(link => <Link className={`text-white font-semibold ${path === link.url ? 'underline' : ''}`} href={link.url} key={link.name}>{link.name}</Link>)
            }
        </nav>
    )
}