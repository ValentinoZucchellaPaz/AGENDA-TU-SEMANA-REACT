export default function Footer() {
    return (
        <footer className="flex flex-row w-full justify-around items-center px-5 py-2 bg-primary dark:bg-black dark:bg-opacity-80">
            <p className="text-white">@ValentinoZucchellaPaz | {new Date().getFullYear()}</p>
        </footer>
    )
}