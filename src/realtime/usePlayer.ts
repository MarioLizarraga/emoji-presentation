import { useEffect, useState, useCallback } from 'react'
import { useRoom } from './useRoom'

interface GameState {
  mode: string
  round: number
  currentSlide: number
  scores: { red: number; blue: number }
  gameStarted: boolean
  gameEnded: boolean
  winner: 'red' | 'blue' | 'tie' | null
  lastReveal: { answer: string; correct: boolean } | null
  teamNames: { red: string; blue: string }
}

const initialGameState: GameState = {
  mode: '',
  round: 0,
  currentSlide: 0,
  scores: { red: 0, blue: 0 },
  gameStarted: false,
  gameEnded: false,
  winner: null,
  lastReveal: null,
  teamNames: { red: '🔥', blue: '🧊' },
}

export function usePlayer(roomCode: string) {
  const { connected, broadcast, on } = useRoom(roomCode)
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [hasBuzzed, setHasBuzzed] = useState(false)

  useEffect(() => {
    const unsubSlide = on('presenter:slide', (payload) => {
      // Support both 'slideIndex' (standard) and 'index' (legacy) field names
      const idx = (payload.slideIndex ?? payload.index) as number | undefined
      if (idx === undefined) return
      setGameState((prev) => {
        // Only reset buzzer if the slide actually changed
        if (prev.currentSlide !== idx) {
          setHasBuzzed(false)
          return { ...prev, currentSlide: idx, lastReveal: null }
        }
        return prev
      })
    })

    const unsubResetBuzzers = on('presenter:resetBuzzers', () => {
      setHasBuzzed(false)
    })

    const unsubStart = on('presenter:startGame', (payload) => {
      const { mode, round } = payload as { mode: string; round: number }
      setGameState((prev) => ({
        ...prev,
        mode,
        round,
        gameStarted: true,
        gameEnded: false,
        winner: null,
      }))
      setHasBuzzed(false)
    })

    const unsubReveal = on('presenter:revealAnswer', (payload) => {
      const { answer, correct } = payload as { answer: string; correct: boolean }
      setGameState((prev) => ({ ...prev, lastReveal: { answer, correct } }))
    })

    const unsubScore = on('presenter:updateScore', (payload) => {
      const { team, total } = payload as { team: 'red' | 'blue'; points: number; total: number }
      setGameState((prev) => ({
        ...prev,
        scores: { ...prev.scores, [team]: total },
      }))
    })

    const unsubNextRound = on('presenter:nextRound', (payload) => {
      const { index } = payload as { index: number }
      setGameState((prev) => ({
        ...prev,
        round: index,
        lastReveal: null,
      }))
      setHasBuzzed(false)
    })

    const unsubEnd = on('presenter:endGame', (payload) => {
      const { scores, winner } = payload as {
        scores: { red: number; blue: number }
        winner: 'red' | 'blue' | 'tie'
        mvp?: string
      }
      setGameState((prev) => ({
        ...prev,
        scores,
        winner,
        gameEnded: true,
      }))
    })

    const unsubTeamNames = on('presenter:teamNames', (payload) => {
      const red = (payload.red as string) || '🔥'
      const blue = (payload.blue as string) || '🧊'
      setGameState((prev) => ({
        ...prev,
        teamNames: { red, blue },
      }))
    })

    // Also listen for score broadcasts from remote
    const unsubRemoteScore = on('presenter:score', (payload) => {
      const team = payload.team as 'red' | 'blue'
      const total = payload.total as number
      setGameState((prev) => ({
        ...prev,
        scores: { ...prev.scores, [team]: total },
      }))
    })

    return () => {
      unsubSlide()
      unsubResetBuzzers()
      unsubStart()
      unsubReveal()
      unsubScore()
      unsubNextRound()
      unsubEnd()
      unsubTeamNames()
      unsubRemoteScore()
    }
  }, [on])

  const buzz = useCallback(
    (name: string, team: 'red' | 'blue') => {
      if (hasBuzzed) return
      setHasBuzzed(true)
      broadcast('player:buzz', { name, team, timestamp: Date.now() })
    },
    [hasBuzzed, broadcast],
  )

  const join = useCallback(
    (name: string, team: 'red' | 'blue') => {
      broadcast('player:join', { name, team, joinedAt: Date.now() })
    },
    [broadcast],
  )

  return {
    connected,
    gameState,
    hasBuzzed,
    buzz,
    join,
  }
}
