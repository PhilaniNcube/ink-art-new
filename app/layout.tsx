import { ReactNode } from "react"
import '@/app/globals.css'

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en" >
            <body >

                {children}

            </body>
        </html>
    )
}

export default RootLayout