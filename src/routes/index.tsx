import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div style={{ 
      padding: '3rem', 
      textAlign: 'center', 
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      color: '#111827'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Berbagi Bites Jogja
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#4b5563'}}>
        Core System Frontend berhasil diinisialisasi menggunakan <strong>TanStack Start</strong>.
      </p>
    </div>
  )
}