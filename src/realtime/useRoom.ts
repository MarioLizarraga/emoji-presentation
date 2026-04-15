import { useEffect, useRef, useState, useCallback } from 'react'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from './supabase'

// No ambiguous chars: O/0/I/1 excluded
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function generateRoomCode(): string {
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return code
}

type EventHandler = (payload: Record<string, unknown>) => void

interface UseRoomReturn {
  roomCode: string
  connected: boolean
  broadcast: (event: string, payload: Record<string, unknown>) => void
  on: (event: string, handler: EventHandler) => () => void
}

export function useRoom(existingCode?: string): UseRoomReturn {
  const [roomCode] = useState(() => existingCode ?? generateRoomCode())
  const [connected, setConnected] = useState(false)
  const channelRef = useRef<RealtimeChannel | null>(null)
  const listenersRef = useRef<Map<string, EventHandler[]>>(new Map())

  useEffect(() => {
    const channel = supabase.channel(`room:${roomCode}`, {
      config: { broadcast: { self: true } },
    })

    channel.on('broadcast', { event: '*' }, ({ event, payload }) => {
      const handlers = listenersRef.current.get(event)
      if (handlers) {
        for (const handler of handlers) {
          handler(payload as Record<string, unknown>)
        }
      }
    })

    channel.subscribe((status) => {
      setConnected(status === 'SUBSCRIBED')
    })

    channelRef.current = channel

    return () => {
      channel.unsubscribe()
      channelRef.current = null
      setConnected(false)
    }
  }, [roomCode])

  const broadcast = useCallback(
    (event: string, payload: Record<string, unknown>) => {
      channelRef.current?.send({
        type: 'broadcast',
        event,
        payload,
      })
    },
    [],
  )

  const on = useCallback((event: string, handler: EventHandler): (() => void) => {
    const listeners = listenersRef.current
    if (!listeners.has(event)) {
      listeners.set(event, [])
    }
    listeners.get(event)!.push(handler)

    // Return unsubscribe function
    return () => {
      const handlers = listeners.get(event)
      if (handlers) {
        const idx = handlers.indexOf(handler)
        if (idx !== -1) handlers.splice(idx, 1)
      }
    }
  }, [])

  return { roomCode, connected, broadcast, on }
}
