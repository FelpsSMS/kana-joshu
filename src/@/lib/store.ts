import { calculateSRSStats, removeHours } from "@/srsalgo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum CardState {
    "new", 
    "learning", 
    "relearning", 
    "reviewing"
}
  
export type CardSRSStats = {
    key: string
    repetitions: number,
    efactor: number,
    leech: boolean,
    mature: boolean,
    cardState: CardState,
    totalLapses: number,
    passCount: number,
    failCount: number,
    consecutiveLapses: number,
    dueDate: number,
}

export type CardUniqueValues = {
    key: string,
    kana: string,
    audioUrl: string,
}

export type Card = CardSRSStats & CardUniqueValues

const DEFAULT_SRS_VALUES = {
    repetitions: 0,
    efactor: 2.5,
    leech: false,
    mature: false,
    cardState: CardState.new,
    totalLapses: 0,
    passCount: 0,
    failCount: 0,
    consecutiveLapses: 0,
    dueDate: removeHours(Date.now()),
}

const UNIQUE_VALUES_LIST = [
    { key: "a", kana: "あ", audioUrl: "" },
    { key: "i", kana: "い", audioUrl: "" },
    { key: "u", kana: "う", audioUrl: "" },
    { key: "e", kana: "え", audioUrl: "" },
    { key: "o", kana: "お", audioUrl: "" },
]

export type State = {
    cards: Card[],
}

export type Actions = {
    updateSRSStats: (card: Card, pass: boolean) => void
    initCards: () => void
}

const mergeObjects = (obj1: object, obj2: object): object => {
    return JSON.parse(JSON.stringify({ ...obj1, ...obj2 }))
}

export const useCardStore = create<State & Actions>()(persist((set) => ({
    cards: [],

    initCards: () => set(() => ({
        cards: UNIQUE_VALUES_LIST.map((el) => {
            console.log({...el, ...DEFAULT_SRS_VALUES})

            return mergeObjects(el, DEFAULT_SRS_VALUES) as Card
        })
    })),

    updateSRSStats: (cardToBeUpdated: Card, pass: boolean) => {
        const { repetitions, efactor, leech, mature, cardState, 
            totalLapses, consecutiveLapses, failCount, passCount, dueDate } = calculateSRSStats(cardToBeUpdated, pass)

        set((state) => ({
            cards: state.cards.map((card) => 
                card.key === cardToBeUpdated.key ? 
                { ...card, repetitions, efactor, leech, mature, cardState, totalLapses, consecutiveLapses, failCount, passCount, dueDate } 
                : card
            )
            })
            )
        },
    }), 
    { name: "card-storage", }
    )
)
