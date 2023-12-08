import { Moon, Sun } from "lucide-react"
import { useTheme } from "../@/components/ui/ThemeProvider"
import { Button } from "../@/components/ui/Button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button className="rounded-full p-2 bg-background hover:bg-background/75 hover" size="icon" onClick={() => theme == "light" ? setTheme("dark") : setTheme("light")}>
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all text-foreground dark:hidden" />
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all text-foreground hidden dark:flex" />
        </Button >
    )
}
