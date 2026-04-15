import { useEffect, useState, useCallback } from 'react'
import { useRoom } from './useRoom'

export interface Player {
  name: string
  team: 'red' | 'blue'
  joinedAt: number
}

export interface BuzzEvent {
  name: string
  team: 'red' | 'blue'
  timestamp: number
}

export function usePresenter() {
  const { roomCode, connected, broadcast, on } = useRoom()
  const [players, setPlayers] = useState<Player[]>([])
  const [buzzes, setBuzzes] = useState<BuzzEvent[]>([])

  useEffect(() => {
    const unsubJoin = on('player:join', (payload) => {
      const player = payload as unknown as Player
      setPlayers((prev) => {
        // Avoid duplicates by name
        if (prev.some((p) => p.name === player.name)) return prev
        return [...prev, player]
      })
    })

    const unsubBuzz = on('player:buzz', (payload) => {
      const buzz = payload as unknown as BuzzEvent
      setBuzzes((prev) => [...prev, buzz])
    })

    return () => {
      unsubJoin()
      unsubBuzz()
    }
  }, [on])

  const clearBuzzes = useCallback(() => {
    setBuzzes([])
  }, [])

  const sendSlide = useCallback(
    (index: number) => {
      broadcast('presenter:slide', { index })
    },
    [broadcast],
  )

  const startGame = useCallback(
    (mode: string, round: number) => {
      broadcast('presenter:startGame', { mode, round })
    },
    [broadcast],
  )

  const revealAnswer = useCallback(
    (answer: string, correct: boolean) => {
      broadcast('presenter:revealAnswer', { answer, correct })
    },
    [broadcast],
  )

  const updateScore = useCallback(
    (team: 'red' | 'blue', points: number, total: number) => {
      broadcast('presenter:updateScore', { team, points, total })
    },
    [broadcast],
  )

  const nextRound = useCallback(
    (index: number) => {
      broadcast('presenter:nextRound', { index })
    },
    [broadcast],
  )

  const endGame = useCallback(
    (scores: { red: number; blue: number }, winner: 'red' | 'blue' | 'tie', mvp?: string) => {
      broadcast('presenter:endGame', { scores, winner, mvp })
    },
    [broadcast],
  )

  return {
    roomCode,
    connected,
    players,
    buzzes,
    clearBuzzes,
    sendSlide,
    startGame,
    revealAnswer,
    updateScore,
    nextRound,
    endGame,
  }
}
