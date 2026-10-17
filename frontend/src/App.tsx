import { useState, useEffect } from 'react'
import FallingLeaves from './components/FallingLeaves'
import './App.css'

const API_BASE = 'http://localhost:8000'
const NAV_ITEMS = ['Experience', 'About', 'Contact', 'Resume'] as const

interface AboutData {
  name: string
  bio: string
  education: string
  skills: string[]
}

interface ContactData {
  email: string
  github: string
  linkedin: string
}

function ExperienceContent() {
  return (
    <>
      <div className="section-label">WORK</div>
      <div className="work-entry">
        <p className="work-role">Software Development Engineer Intern at <strong>Amazon</strong></p>
        <p className="work-date">Summer 2026 - Python, Java, TypeScript, React, AWS (Bedrock AgentCore, Strands, S3, DynamoDB)</p>
        <ul className="work-bullets">
          <li>Worked on the Robotics Delivery and Packaging Innovation Team in Bellevue, WA</li>
          <li>Built a RAG assistant on AWS Bedrock to help onboard warehouse associates</li>
          <li>Designed a multi-agent architecture with orchestrator and specialized subagents for context retrieval</li>
        </ul>
      </div>
      <div className="work-entry">
        <p className="work-role">Software Engineer Intern at <strong>Edit On The Spot</strong></p>
        <p className="work-date">Spring 2026 - Python, TypeScript, React, SQL</p>
        <ul className="work-bullets">
          <li>Built a fullstack web application to let content creators remotely control Apple DockKit camera stands</li>
          <li>Ported an existing web media-editing application to a mobile iOS application</li>
        </ul>
      </div>
      <div className="work-entry">
        <p className="work-role">Software Developer Intern at <strong>Beshton Software Inc.</strong></p>
        <p className="work-date">Summer 2025 - Java, Spring Boot, OpenAI API, SQL</p>
        <ul className="work-bullets">
          <li>Created internal LLM Tooling to help HR categorize customer feedback and complaints autonomously</li>
        </ul>
      </div>
    </>
  )
}

function AboutContent() {
  const [data, setData] = useState<AboutData | null>(null)

  useEffect(() => {
    fetch(`${API_BASE}/about`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => {})
  }, [])

  return (
    <>
      <div className="section-label">ABOUT</div>
      {data ? (
        <div className="section-body">
          {data.bio && <p>{data.bio}</p>}
          {data.education && <p className="work-date">{data.education}</p>}
          {data.skills.length > 0 && (
            <ul className="work-bullets">
              {data.skills.map((s) => <li key={s}>{s}</li>)}
            </ul>
          )}
          {!data.bio && !data.education && data.skills.length === 0 && (
            <p className="work-date">Coming soon.</p>
          )}
        </div>
      ) : (
        <p className="work-date">Loading...</p>
      )}
    </>
  )
}

function ContactContent() {
  const [data, setData] = useState<ContactData | null>(null)

  useEffect(() => {
    fetch(`${API_BASE}/contact`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => {})
  }, [])

  return (
    <>
      <div className="section-label">CONTACT</div>
      {data ? (
        <div className="section-body">
          {data.email && <p><a href={`mailto:${data.email}`}>{data.email}</a></p>}
          {data.github && (
            <p><a href={data.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>
          )}
          {data.linkedin && (
            <p><a href={data.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          )}
        </div>
      ) : (
        <p className="work-date">Loading...</p>
      )}
    </>
  )
}

function App() {
  const [active, setActive] = useState<string>('Experience')

  const handleNav = (item: string) => {
    if (item === 'Resume') {
      window.open(`${API_BASE}/resume`, '_blank')
      return
    }
    setActive(item)
  }

  return (
    <div className="app">
      <FallingLeaves />
      <div className="left-header">
        <div className="site-name">Rahul Pothineni</div>
        <div className="page-content">
          {active === 'Experience' && <ExperienceContent />}
          {active === 'About' && <AboutContent />}
          {active === 'Contact' && <ContactContent />}
        </div>
      </div>
      <nav className="nav">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item}
            className={`nav-link${active === item ? ' active' : ''}${item === 'Resume' ? '' : ''}`}
            style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            onClick={() => handleNav(item)}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="social-links">
        <a href="https://github.com/rahul-pothineni" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/rahul-pothineni-a63244328/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default App
