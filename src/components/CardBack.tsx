import { Button } from '@/@/components/ui/Button';
import { Card } from '@/@/lib/store';
import { LucideSpeaker, LucideVolume2 } from 'lucide-react';
import { FC } from 'react'

type CardBackProps = {
    currentCard: Card,
    handleSelection: (pass: boolean) => void,
}

function playSound(audio: string) {
    const sound = new Audio(audio);
    sound.volume = 0.5; //maybe add a setting later for changing the volume

    sound.play().catch((err) => {
        console.log(err);
    });
}

const CardBack: FC<CardBackProps> = ({ currentCard, handleSelection }) => {
    return (
        <div className="flex flex-col items-center gap-8">
            <span className="font-extrabold text-6xl text-foreground">{currentCard?.key}</span>
            <LucideVolume2 onClick={() => playSound(currentCard?.audioUrl)} />

            <div className="flex space-x-8">
                <Button onClick={() => handleSelection(true)}>Pass</Button>
                <Button onClick={() => handleSelection(false)} variant={'secondary'}>Fail</Button>
            </div>
        </div>
    )
}

export default CardBack;