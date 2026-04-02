import React, { useEffect, useMemo, useState } from 'react'
import { Heart, Dumbbell, Sparkles, TrendingUp, CalendarDays, Target, RefreshCw } from 'lucide-react'

const workoutPlan = [
  { day: 'Day 1', title: 'Glutes Heavy', emoji: '🍑', focus: 'Build glute size + strength', exercises: [
      { name: 'Hip Thrust', sets: '4x8', keyLift: true },
      { name: 'Romanian Deadlift', sets: '4x8-10', keyLift: true },
      { name: 'Bulgarian Split Squat', sets: '3x10 each' },
      { name: 'Cable Kickbacks', sets: '3x12' },
      { name: 'Glute Bridge Hold', sets: '2x30 sec' },
  ]},
  { day: 'Day 2', title: 'Shoulders + Triceps', emoji: '💪', focus: 'Capped shoulders + toned arms', exercises: [
      { name: 'Shoulder Press', sets: '4x8-10', keyLift: true },
      { name: 'Lateral Raises', sets: '4x12-15' },
      { name: 'Rear Delt Fly', sets: '3x12' },
      { name: 'Tricep Pushdowns', sets: '3x12' },
      { name: 'Overhead Tricep Extension', sets: '3x10' },
  ]},
  { day: 'Day 3', title: 'Glutes + Hamstrings', emoji: '✨', focus: 'Shape + roundness', exercises: [
      { name: 'Hip Thrust (light)', sets: '4x12' },
      { name: 'Lying Leg Curl', sets: '4x12' },
      { name: 'Step-Ups', sets: '3x10 each' },
      { name: 'Abduction Machine', sets: '3x15' },
      { name: 'Cable Pull Through', sets: '3x12' },
  ]},
  { day: 'Day 4', title: 'Back + Shoulders', emoji: '🔥', focus: 'Snatched waist illusion + posture', exercises: [
      { name: 'Lat Pulldown', sets: '4x10', keyLift: true },
      { name: 'Seated Row', sets: '3x10' },
      { name: 'Rear Delt Fly', sets: '3x12' },
      { name: 'Face Pulls', sets: '3x12' },
      { name: 'Lateral Raises (slow)', sets: '3x15' },
  ]},
  { day: 'Day 5', title: 'Glutes Pump', emoji: '💕', focus: 'Lift + glute shelf', exercises: [
      { name: 'Frog Pumps', sets: '3x20' },
      { name: 'Kickback Machine', sets: '3x12' },
      { name: 'Banded Glute Bridges', sets: '3x15' },
      { name: 'Cable Abduction', sets: '3x15' },
      { name: 'Walking Lunges', sets: '2 burnout rounds' },
  ]},
]

const liftNames = ['Hip Thrust', 'Romanian Deadlift', 'Shoulder Press', 'Lat Pulldown']
const initialChecks = workoutPlan.reduce((acc, day) => {
  day.exercises.forEach((exercise) => { acc[`${day.day}-${exercise.name}`] = false })
  return acc
}, {})
const defaultWeights = { 'Hip Thrust': '', 'Romanian Deadlift': '', 'Shoulder Press': '', 'Lat Pulldown': '' }
const defaultCheckIn = { week: '1', bodyweight: '', protein: '', energy: '', notes: '' }
const STORAGE_KEY = 'strong-girls-era-data-v1'

function loadSavedData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}
function Card({ children, className = '' }) { return <div className={`card ${className}`}>{children}</div> }
function SectionTitle({ icon, children }) { return <h2 className="section-title">{icon}{children}</h2> }

export default function App() {
  const saved = loadSavedData()
  const [checks, setChecks] = useState(saved?.checks || initialChecks)
  const [weights, setWeights] = useState(saved?.weights || defaultWeights)
  const [nextWeek, setNextWeek] = useState(saved?.nextWeek || defaultWeights)
  const [checkIn, setCheckIn] = useState(saved?.checkIn || defaultCheckIn)
  const [activeTab, setActiveTab] = useState('workouts')
  const [installPromptEvent, setInstallPromptEvent] = useState(null)
  const [installMessage, setInstallMessage] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ checks, weights, nextWeek, checkIn }))
  }, [checks, weights, nextWeek, checkIn])

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPromptEvent(e) }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const completed = useMemo(() => Object.values(checks).filter(Boolean).length, [checks])
  const total = Object.keys(checks).length
  const percent = Math.round((completed / total) * 100)
  const toggleCheck = (key) => setChecks((prev) => ({ ...prev, [key]: !prev[key] }))

  const resetWeek = () => {
    if (!window.confirm('Reset all checkmarks for the week?')) return
    setChecks(initialChecks)
  }

  const installApp = async () => {
    if (!installPromptEvent) {
      setInstallMessage('On iPhone: open this app in Safari, tap Share, then tap Add to Home Screen.')
      return
    }
    installPromptEvent.prompt()
    const result = await installPromptEvent.userChoice
    setInstallMessage(result.outcome === 'accepted' ? 'App install started.' : 'Install canceled.')
    setInstallPromptEvent(null)
  }

  return (
    <div className="app-shell">
      <div className="container">
        <div className="hero-grid">
          <Card className="hero-card">
            <div className="eyebrow"><Sparkles size={18} /> Strong Girls Era</div>
            <h1>Glute + Shoulder Builder</h1>
            <p className="lead">A done-for-you 5-day split for building glutes and capped shoulders while still training back and arms.</p>

            <div className="pill-grid">
              <div className="pill pink"><div className="pill-label"><Heart size={16} /> Priority</div><div className="pill-value">Glutes 3x / week</div></div>
              <div className="pill rose"><div className="pill-label"><Dumbbell size={16} /> Focus</div><div className="pill-value">Shoulders 2–3x / week</div></div>
              <div className="pill purple"><div className="pill-label"><Target size={16} /> Add-ons</div><div className="pill-value">Back + arms included</div></div>
            </div>

            <div className="progress-wrap">
              <div className="progress-row"><span>Weekly completion</span><span>{completed}/{total} exercises</span></div>
              <div className="progress-bar"><div className="progress-value" style={{ width: `${percent}%` }} /></div>
              <div className="progress-text">{percent}% complete</div>
            </div>

            <div className="hero-actions">
              <button className="primary-btn" onClick={installApp}>Install on Phone</button>
              <button className="secondary-btn" onClick={resetWeek}><RefreshCw size={16} /> Reset Week</button>
            </div>
            {installMessage && <p className="small-note">{installMessage}</p>}
          </Card>

          <Card>
            <SectionTitle icon={<CalendarDays size={20} />}>Weekly Flow</SectionTitle>
            <div className="flow-list">
              <div className="flow-item filled">Mon — Glutes Heavy</div>
              <div className="flow-item filled">Tue — Shoulders + Triceps</div>
              <div className="flow-item filled">Wed — Glutes + Hamstrings</div>
              <div className="flow-item filled">Thu — Back + Shoulders</div>
              <div className="flow-item filled">Fri — Glutes Pump</div>
              <div className="flow-item dashed">Sat — Optional walk/cardio</div>
              <div className="flow-item dashed">Sun — Rest</div>
            </div>
          </Card>
        </div>

        <div className="tabs">
          <button className={activeTab === 'workouts' ? 'tab active' : 'tab'} onClick={() => setActiveTab('workouts')}>Workouts</button>
          <button className={activeTab === 'progress' ? 'tab active' : 'tab'} onClick={() => setActiveTab('progress')}>Progress</button>
          <button className={activeTab === 'checkin' ? 'tab active' : 'tab'} onClick={() => setActiveTab('checkin')}>Weekly Check-In</button>
        </div>

        {activeTab === 'workouts' && (
          <div className="workout-grid">
            {workoutPlan.map((day) => (
              <Card key={day.day}>
                <div className="card-top-row"><span className="badge">{day.day}</span><span className="emoji">{day.emoji}</span></div>
                <h3>{day.title}</h3>
                <p className="subtle">{day.focus}</p>
                <div className="exercise-list">
                  {day.exercises.map((exercise) => {
                    const key = `${day.day}-${exercise.name}`
                    return (
                      <label className="exercise-item" key={key}>
                        <input type="checkbox" checked={checks[key]} onChange={() => toggleCheck(key)} />
                        <div className="exercise-copy">
                          <div className="exercise-line"><span className="exercise-name">{exercise.name}</span>{exercise.keyLift && <span className="mini-badge">Key lift</span>}</div>
                          <div className="subtle">{exercise.sets}</div>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'progress' && (
          <Card>
            <SectionTitle icon={<TrendingUp size={20} />}>Progression Tracker</SectionTitle>
            <p className="subtle">Aim to add 5–10 lb, 1–2 reps, or cleaner form over time.</p>
            <div className="table-scroll">
              <table className="tracker-table">
                <thead><tr><th>Exercise</th><th>This Week</th><th>Next Goal</th></tr></thead>
                <tbody>
                  {liftNames.map((lift) => (
                    <tr key={lift}>
                      <td>{lift}</td>
                      <td><input className="text-input" value={weights[lift]} onChange={(e) => setWeights((prev) => ({ ...prev, [lift]: e.target.value }))} placeholder="ex: 135 x 8" /></td>
                      <td><input className="text-input" value={nextWeek[lift]} onChange={(e) => setNextWeek((prev) => ({ ...prev, [lift]: e.target.value }))} placeholder="ex: 145 x 8" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="reminder-box"><strong>Quick reminder:</strong> eat enough protein, stay consistent, and treat Hip Thrust, RDL, and Shoulder Press like your money makers.</div>
          </Card>
        )}

        {activeTab === 'checkin' && (
          <div className="checkin-grid">
            <Card>
              <h2 className="plain-title">Weekly Check-In</h2>
              <div className="form-grid">
                <div><label>Week</label><input className="text-input" value={checkIn.week} onChange={(e) => setCheckIn((prev) => ({ ...prev, week: e.target.value }))} /></div>
                <div><label>Bodyweight</label><input className="text-input" value={checkIn.bodyweight} onChange={(e) => setCheckIn((prev) => ({ ...prev, bodyweight: e.target.value }))} placeholder="ex: 145 lb" /></div>
                <div><label>Protein average</label><input className="text-input" value={checkIn.protein} onChange={(e) => setCheckIn((prev) => ({ ...prev, protein: e.target.value }))} placeholder="ex: 140g/day" /></div>
                <div><label>Energy</label><input className="text-input" value={checkIn.energy} onChange={(e) => setCheckIn((prev) => ({ ...prev, energy: e.target.value }))} placeholder="1-10" /></div>
              </div>
              <div className="notes-block">
                <label>Notes + wins</label>
                <textarea className="text-area" value={checkIn.notes} onChange={(e) => setCheckIn((prev) => ({ ...prev, notes: e.target.value }))} placeholder="PRs, how your body felt, cycle notes, recovery, confidence wins..." />
              </div>
            </Card>

            <Card className="nutrition-card">
              <h2 className="plain-title">Nutrition Focus</h2>
              <div className="nutrition-list">
                <div className="nutrition-item"><strong>Protein</strong><p>Target 130–160g daily.</p></div>
                <div className="nutrition-item"><strong>Carbs</strong><p>Fuel your lifts. Don’t fear them on glute days.</p></div>
                <div className="nutrition-item"><strong>Growth rule</strong><p>Glutes do not grow well when you chronically undereat.</p></div>
                <div className="nutrition-item"><strong>Supplements</strong><p>Creatine 5g daily, protein powder for convenience, electrolytes as needed.</p></div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
