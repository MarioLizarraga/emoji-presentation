import { HashRouter, Routes, Route } from 'react-router-dom'
import { PresenterView } from './views/PresenterView'
import { RemoteView } from './remote/RemoteView'
import { PlayerView } from './views/PlayerView'

export default function App() {
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
