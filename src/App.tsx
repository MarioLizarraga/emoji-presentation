import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { PresenterView } from './views/PresenterView'
import { RemoteView } from './remote/RemoteView'
import { PlayerView } from './views/PlayerView'
import { SoundManager } from './engine/sound/SoundManager'

export default function App() {
  useEffect(() => { SoundManager.init() }, [])

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PresenterView />} />
        <Route path="/remote" element={<RemoteView />} />
        <Route path="/play" element={<PlayerView />} />
      </Routes>
    </HashRouter>
  )
}
