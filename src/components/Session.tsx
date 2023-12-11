import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../@/components/ui/Button'
import { Card, CardState, useCardStore } from '@/@/lib/store'
import { getCardsForTheDay } from './Home'

const Session: FC = () => {
    const navigate = useNavigate()

    const cards = useCardStore((state) => state.cards)
    const updateSRSStats = useCardStore((state) => state.updateSRSStats)
    const [currentCard, setCurrentCard] = useState<Card>(cards[0])
    const [cardsBeingReviewed, setCardsBeingReviewed] = useState<Card[]>(cards)
    const [showCardBack, setShowCardBack] = useState<boolean>(false)

    function updateAndShuffleCardList() {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const cardsForTheDay = getCardsForTheDay(cards)
        //cardsForTheDay.forEach((el) => console.log(el, new Date(el.dueDate)))

        if (cardsForTheDay.length <= 0) navigate('/finished')

        return cardsForTheDay.sort(() => Math.random() - 0.5)
    }

    useEffect(() => {
        const shuffledCardList = updateAndShuffleCardList()

        const newAndLearningCards = shuffledCardList.filter((card) => card.cardState === (CardState.new || CardState.learning))

        newAndLearningCards.length > 0 ? setCardsBeingReviewed(newAndLearningCards) : setCardsBeingReviewed(shuffledCardList)
    }, [])

    const handleSelection = async (pass: boolean) => {
        setShowCardBack(false)
        updateSRSStats(currentCard, pass)

        if (cardsBeingReviewed.length <= cardsBeingReviewed.indexOf(currentCard) + 1) {
            setCardsBeingReviewed(updateAndShuffleCardList())
            setCurrentCard(cardsBeingReviewed[0])
        } else {
            setCurrentCard((prevCard: Card) => cardsBeingReviewed[cardsBeingReviewed.indexOf(prevCard) + 1])
        }
    }

    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="bg-foreground p-10 flex items-center justify-center rounded-lg">
                    <span className="font-extrabold text-8xl text-background">{currentCard?.kana}</span>
                </div>
                {
                    showCardBack && <span className="font-extrabold text-8xl text-background">{currentCard?.key}</span>
                }
                {
                    showCardBack ?
                        <div className="flex justify-between">
                            <Button onClick={() => handleSelection(true)}>Pass</Button>
                            <Button onClick={() => handleSelection(false)} variant={'secondary'}>Fail</Button>
                        </div>
                        :
                        <div className="flex justify-center">
                            <Button onClick={() => setShowCardBack(true)}>Show</Button>
                        </div>
                }
            </div >
        </>
    )
}

export default Session