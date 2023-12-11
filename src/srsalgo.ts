import { Card, CardSRSStats, CardState } from "./@/lib/store"

const DAYS_FOR_CARD_TO_BE_MATURE = 21

function getInterval(repetitions: number, newEfactor: number, quality: number): number {
  if (repetitions <= 1) return 1
  if (repetitions == 2) return 3 //original is 6, but I think 3 makes more sense

  return getInterval(repetitions - 1, newEfactor, quality) * newEfactor
}

export const millisecondsInDay = 60 * 60 * 24 * 1000

export function removeHours(dateInMilliseconds: number) {
  const date = new Date(dateInMilliseconds)
  date.setHours(0, 0, 0, 0)

  return date.getTime()
}

export function calculateSRSStats({ key, repetitions, efactor, leech, mature, cardState, 
  totalLapses, consecutiveLapses, failCount, passCount, dueDate }: Card, pass: boolean): CardSRSStats {
  let quality = 0
  
  
  if (pass) {
    quality = 4
    passCount += 1
    
    if (cardState == CardState.new) cardState = CardState.learning

    if (cardState == CardState.learning) cardState = CardState.reviewing
    
    if (cardState == CardState.relearning) {
      cardState = CardState.reviewing
      consecutiveLapses = 0
    }

  } else {
    failCount += 1
    
    if (cardState == CardState.reviewing) {
      cardState = CardState.relearning
      consecutiveLapses += 1
      totalLapses += 1
    }

  }

  quality < 3 ?  repetitions = 0 : repetitions += 1
  
  const newEfactor = Math.max(
    1.3,
    efactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02),
  )
    
  const interval = getInterval(repetitions, newEfactor, quality)

  const newDueDate = pass ? Date.now() + millisecondsInDay * interval : dueDate
    
  leech = consecutiveLapses > 4
  mature = interval > millisecondsInDay * DAYS_FOR_CARD_TO_BE_MATURE

  return { key, repetitions, efactor: newEfactor, dueDate: newDueDate, consecutiveLapses, 
    totalLapses, failCount, passCount, leech, mature, cardState } 
}