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

export interface PlayerStats {
  name: string
  team: 'red' | 'blue'
  correctAnswers: number
  points: number
}

export function usePresenter() {
  const { roomCode, connected, broadcast, on } = useRoom()
  const [players, setPlayers] = useState<Player[]>([])
  const [buzzes, setBuzzes] = useState<BuzzEvent[]>([])
  const [remoteSlideCommand, setRemoteSlideCommand] = useState<{ index: number; ts: number } | null>(null)
  const [teamNames, setTeamNames] = useState({ red: '🔥', blue: '🧊' })
  const [scores, setScores] = useState({ red: 0, blue: 0 })
  const [playerStats, setPlayerStats] = useState<Record<string, PlayerStats>>({})

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

    const unsubSlide = on('presenter:slide', (payload) => {
      setRemoteSlideCommand({ index: payload.slideIndex as number, ts: Date.now() })
    })

    const unsubTeamNames = on('presenter:teamNames', (payload) => {
      const red = (payload.red as string) || '🔥'
      const blue = (payload.blue as string) || '🧊'
      setTeamNames({ red, blue })
    })

    const unsubScore = on('presenter:score', (payload) => {
      const team = payload.team as 'red' | 'blue'
      const total = payload.total as number
      setScores((prev) => ({ ...prev, [team]: total }))
    })

    // Listen for resetBuzzers broadcasts (from the remote's X button, etc.)
    const unsubReset = on('presenter:resetBuzzers', () => {
      setBuzzes([])
    })

    // Listen for dismissBuzz (remove a single player's buzz)
    const unsubDismiss = on('presenter:dismissBuzz', (payload) => {
      const name = payload.name as string
      setBuzzes((prev) => prev.filter((b) => b.name !== name))
    })

    return () => {
      unsubJoin()
      unsubBuzz()
      unsubSlide()
      unsubTeamNames()
      unsubScore()
      unsubReset()
      unsubDismiss()
    }
  }, [on])

  const clearBuzzes = useCallback(() => {
    setBuzzes([])
  }, [])

  const dismissBuzz = useCallback((playerName: string) => {
    setBuzzes((prev) => prev.filter((b) => b.name !== playerName))
    // Broadcast so Remote also removes just this one
    broadcast('presenter:dismissBuzz', { name: playerName })
  }, [broadcast])

  const sendSlide = useCallback(
    (index: number) => {
      broadcast('presenter:slide', { slideIndex: index, timestamp: Date.now() })
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

  const recordAnswer = useCallback(
    (name: string, team: 'red' | 'blue', points: number) => {
      setPlayerStats((prev) => {
        const existing = prev[name] ?? { name, team, correctAnswers: 0, points: 0 }
        return {
          ...prev,
          [name]: {
            name,
            team,
            correctAnswers: existing.correctAnswers + 1,
            points: existing.points + points,
          },
        }
      })
    },
    [],
  )

  const resetBuzzers = useCallback(() => {
    setBuzzes([])
    broadcast('presenter:resetBuzzers', {})
  }, [broadcast])

  const nextRound = useCallback(
    (index: number) => {
      broadcast('presenter:nextRound', { index })
    },
    [broadcast],
  )

  const endGame = useCallback(
    (gameScores: { red: number; blue: number }, winner: 'red' | 'blue' | 'tie', mvp?: string) => {
      broadcast('presenter:endGame', { scores: gameScores, winner, mvp })
    },
    [broadcast],
  )

  const broadcastTeamNames = useCallback(
    (red: string, blue: string) => {
      setTeamNames({ red, blue })
      broadcast('presenter:teamNames', { red, blue })
    },
    [broadcast],
  )

  return {
    roomCode,
    connected,
    players,
    buzzes,
    clearBuzzes,
    dismissBuzz,
    sendSlide,
    startGame,
    revealAnswer,
    updateScore,
    recordAnswer,
    resetBuzzers,
    nextRound,
    endGame,
    remoteSlideCommand,
    teamNames,
    broadcastTeamNames,
    scores,
    setScores,
    playerStats,
  }
}
