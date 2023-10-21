import { Sen } from "next/font/google"
const sen = Sen({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400']
    
})
export default function Layout({children}){
    return (
        <div className={sen.className}>
            {children}
        </div>
    )
}