'use client'

import { useState } from 'react'

export default function Home() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<Array<{ id: number; text: string; status: 'pending' | 'executing' | 'completed' }>>([])
  const [nextId, setNextId] = useState(1)

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: nextId, text: task, status: 'pending' }])
      setNextId(nextId + 1)
      setTask('')
    }
  }

  const executeTask = (id: number) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, status: 'executing' as const } : t
    ))

    setTimeout(() => {
      setTasks(prevTasks => prevTasks.map(t =>
        t.id === id ? { ...t, status: 'completed' as const } : t
      ))
    }, 2000)
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>Action Engine</h1>
        <p style={styles.subtitle}>Execute tasks, automate workflows, and extend your reach</p>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Enter a task to execute..."
            style={styles.input}
          />
          <button onClick={addTask} style={styles.button}>
            Add Task
          </button>
        </div>

        <div style={styles.taskList}>
          {tasks.map(t => (
            <div key={t.id} style={styles.taskItem}>
              <div style={styles.taskContent}>
                <div style={{
                  ...styles.statusBadge,
                  backgroundColor:
                    t.status === 'completed' ? '#10b981' :
                    t.status === 'executing' ? '#f59e0b' :
                    '#6b7280'
                }}>
                  {t.status}
                </div>
                <span style={styles.taskText}>{t.text}</span>
              </div>
              <div style={styles.taskActions}>
                {t.status === 'pending' && (
                  <button
                    onClick={() => executeTask(t.id)}
                    style={styles.executeButton}
                  >
                    Execute
                  </button>
                )}
                <button
                  onClick={() => deleteTask(t.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div style={styles.emptyState}>
            <p>No tasks yet. Add a task to get started!</p>
          </div>
        )}
      </div>
    </main>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
    background: 'linear-gradient(to right, #ffffff, #e0e7ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '40px',
    opacity: 0.9,
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
  },
  input: {
    flex: 1,
    padding: '15px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    outline: 'none',
  },
  button: {
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#ffffff',
    color: '#667eea',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  taskContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flex: 1,
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#ffffff',
  },
  taskText: {
    fontSize: '16px',
  },
  taskActions: {
    display: 'flex',
    gap: '10px',
  },
  executeButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#10b981',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  deleteButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    opacity: 0.7,
  },
}
