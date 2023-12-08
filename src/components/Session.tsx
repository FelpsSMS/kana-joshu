import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../@/components/ui/Button'

type LocationProps = {
    state: { kana: string[] }
}

const Session: FC = () => {
    const { state }: LocationProps = useLocation()
    const navigate = useNavigate()

    const [currentKana, setCurrentKana] = useState<string>(state.kana[0])

    const handleSelection = (pass: boolean) => {
        if (pass) {

        } else {

        }

        if (state.kana.length <= state.kana.indexOf(currentKana) + 1) navigate('/finished')

        setCurrentKana((prevKana: string) => state.kana[state.kana.indexOf(prevKana) + 1])
    }

    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="bg-foreground p-10 flex items-center justify-center rounded-lg">
                    <span className="font-extrabold text-8xl text-background">{currentKana}</span>
                </div>
                <div className="flex justify-between">
                    <Button onClick={() => handleSelection(true)}>Pass</Button>
                    <Button onClick={() => handleSelection(false)} variant={'secondary'}>Fail</Button>
                </div>
            </div >
        </>
    )
}

export default Session;