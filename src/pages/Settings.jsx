import { useTheme } from "../contexts/ThemeProvider"


const Settings = () => {
  const {theme, setTheme} = useTheme()
  return (
    <div>
      <select name="theme" value={theme} onChange={(e) => setTheme(e.target.value)} id="theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  )
}

export default Settings