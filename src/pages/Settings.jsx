import { useTheme } from "../contexts/ThemeProvider"
import { useEffect, useState } from "react"

const Settings = () => {
  const { theme, setTheme } = useTheme()
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    setDeferredPrompt(null)
  }

  return (
    <div>
      <select name="theme" value={theme} onChange={(e) => setTheme(e.target.value)} id="theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
      <button onClick={handleInstallClick} disabled={!deferredPrompt}>
        Install
      </button>
    </div>
  )
}

export default Settings
