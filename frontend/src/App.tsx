import { useState } from 'react'
import FallingLeaves from './components/FallingLeaves'
import './App.css'

const NAV_ITEMS = ['Experience', 'About', 'Contact', 'Resume'] as const

function App() {
  const [active, setActive] = useState<string>('About')

  return (
    <div className="app">
      <FallingLeaves />
      <nav className="nav">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item}
            className={`nav-link${active === item ? ' active' : ''}`}
            style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="hero-content">
        <h1 className="hero-name">Rahul Pothineni</h1>
        <p className="hero-tagline">Portfolio</p>
        <div className="hero-divider" />
      </div>
    </div>
  )
}

export default App
