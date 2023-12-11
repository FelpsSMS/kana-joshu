import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../@/components/ui/Button'
import { Card, CardState, useCardStore } from '@/@/lib/store'
import { getCardsForTheDay } from './Home'
import CardBack from './CardBack'

const LIMIT_NEW_CARDS_PER_DAY = 5

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

        if (cardsForTheDay.length <= 0) navigate('/finished')

        return cardsForTheDay.sort(() => Math.random() - 0.5)
    }

    useEffect(() => {
        const shuffledCardList = updateAndShuffleCardList()

        const newCards = shuffledCardList.filter((card) => card.cardState === CardState.new)
        const learningCards = shuffledCardList.filter((card) => card.cardState === (CardState.learning))

        const newAndLearningCards = [...newCards.slice(0, LIMIT_NEW_CARDS_PER_DAY), ...learningCards]

        newAndLearningCards.length > 0 ? setCardsBeingReviewed(newAndLearningCards) : setCardsBeingReviewed(shuffledCardList)
    }, [])

    const handleSelection = async (pass: boolean) => {
        setShowCardBack(false)
        updateSRSStats(currentCard, pass)

        if (cardsBeingReviewed.length <= cardsBeingReviewed.indexOf(currentCard) + 1) {
            setCardsBeingReviewed(() => updateAndShuffleCardList())
            setCurrentCard(cardsBeingReviewed[0])
        } else {
            setCurrentCard((prevCard: Card) => cardsBeingReviewed[cardsBeingReviewed.indexOf(prevCard) + 1])
        }
    }

    return (
        <div className="flex flex-col gap-8 justify-center items-center py-8">
            <div className="bg-foreground p-10 flex items-center justify-center rounded-lg sm:p-24">
                <span className="font-extrabold text-8xl text-background sm:text-kana-sm lg:text-kana-lg">{currentCard?.kana}</span>
            </div>

            {showCardBack ?
                <CardBack handleSelection={handleSelection} currentCard={currentCard} />
                :
                <div className="flex justify-center">
                    <Button onClick={() => setShowCardBack(true)}>Show</Button>
                </div>
            }

        </div>
    )
}

export default Session