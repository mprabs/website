import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { resolveVersion } from './core/version'
import VersionSwitcher from './core/VersionSwitcher'

const version = resolveVersion()
const VersionApp = lazy(version.load)

document.documentElement.dataset.version = version.id
document.documentElement.style.backgroundColor = version.backdrop

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={null}>
        <VersionApp />
      </Suspense>
    </Router>
    <VersionSwitcher activeId={version.id} />
  </React.StrictMode>
)
