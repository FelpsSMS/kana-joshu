import { Button } from '@/@/components/ui/Button';
import { Card, useCardStore } from '@/@/lib/store';
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const getCardsForTheDay = (cardList: Card[]) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    console.log(cardList.map((card) => console.table(card)))

    return cardList.filter((card) => card.dueDate <= today.getTime())
}

//TODO: ADD NUMBER OF NEW CARDS PER DAY
//TODO: MAKE IT SO CARDS KEEP SHOWING UP AFTER "NEW" AND "LEARNING" CARDS UNTIL THERE ARE NO MORE "RELEARNING" CARDS

const Home: FC = ({ }) => {
    const navigate = useNavigate()
    const cards = useCardStore((state) => state.cards)
    const initCards = useCardStore((state) => state.initCards)

    const handleClick = () => {
        if (getCardsForTheDay(cards).length <= 0) {
            navigate('/finished')
            return
        }

        navigate('/session')
    }

    useEffect(() => {
        if (cards.length <= 0) initCards()
    }, [])

    return (
        <div className="flex flex-col gap-8 justify-center items-center">
            <span className="font-black font-">カナ助手</span>
            <p className="w-36 text-center text-lg">Welcome back! Ready to start?</p>
            <Button className="w-20" onClick={() => handleClick()}>
                Study
            </Button>
        </div>
    )
}

export default Home;