import React, { useState } from 'react';
import '../styles/Settings.css';
import { Save, RotateCcw } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    engineDepth: 20,
    boardTheme: 'light',
    showCoordinates: true,
    soundEnabled: false,
    autoAnalyze: true
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('chessboardSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings({
      engineDepth: 20,
      boardTheme: 'light',
      showCoordinates: true,
      soundEnabled: false,
      autoAnalyze: true
    });
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h2>Settings</h2>
      </div>

      <div className="settings-content">
        <div className="setting-group">
          <label htmlFor="engineDepth">Engine Depth</label>
          <input
            id="engineDepth"
            type="range"
            min="10"
            max="30"
            value={settings.engineDepth}
            onChange={(e) => handleChange('engineDepth', Number(e.target.value))}
          />
          <span className="value">{settings.engineDepth}</span>
        </div>

        <div className="setting-group">
          <label htmlFor="boardTheme">Board Theme</label>
          <select
            id="boardTheme"
            value={settings.boardTheme}
            onChange={(e) => handleChange('boardTheme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="wood">Wood</option>
          </select>
        </div>

        <div className="setting-group checkbox">
          <input
            id="showCoordinates"
            type="checkbox"
            checked={settings.showCoordinates}
            onChange={(e) => handleChange('showCoordinates', e.target.checked)}
          />
          <label htmlFor="showCoordinates">Show Board Coordinates</label>
        </div>

        <div className="setting-group checkbox">
          <input
            id="soundEnabled"
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(e) => handleChange('soundEnabled', e.target.checked)}
          />
          <label htmlFor="soundEnabled">Enable Sound</label>
        </div>

        <div className="setting-group checkbox">
          <input
            id="autoAnalyze"
            type="checkbox"
            checked={settings.autoAnalyze}
            onChange={(e) => handleChange('autoAnalyze', e.target.checked)}
          />
          <label htmlFor="autoAnalyze">Auto-Analyze Positions</label>
        </div>

        <div className="settings-actions">
          <button onClick={handleSave} className="btn-primary">
            <Save size={18} />
            Save Settings
          </button>
          <button onClick={handleReset} className="btn-secondary">
            <RotateCcw size={18} />
            Reset to Defaults
          </button>
        </div>

        {saved && <div className="save-notification">Settings saved!</div>}
      </div>
    </div>
  );
};

export default Settings;