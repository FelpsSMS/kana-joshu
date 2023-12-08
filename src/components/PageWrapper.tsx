import { ReactNode } from "react"
import Topbar from "./Topbar";
import Footer from "./Footer";

type WrapperComponentProps = {
    children: ReactNode;
}

const PageWrapper: React.FC<WrapperComponentProps> = ({ children }) => {
    //const hiraganaMap = { 'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お' } satisfies Record<string, string>

    // useEffect(() => {
    //   if (localStorage.getItem('hiraganaMap')) { }
    // }, [])

    {/* <ModeToggle />
    {Object.keys(hiraganaMap).map((key) => <p className="text-lg text-slate-900 font-extrabold">{hiraganaMap[key as keyof typeof hiraganaMap]}</p>)} */}

    return (
        <div className="bg-background h-screen w-screen flex flex-col justify-between">
            <Topbar />
            <div className="flex justify-center items-center">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default PageWrapper
