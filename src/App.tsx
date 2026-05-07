import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import AnalysisBoard from './components/AnalysisBoard';
import GameAnalyzer from './components/GameAnalyzer';
import OpeningExplorer from './components/OpeningExplorer';
import PuzzleMode from './components/PuzzleMode';
import Settings from './components/Settings';

type ViewType = 'analysis' | 'games' | 'openings' | 'puzzles' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('analysis');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'analysis':
        return <AnalysisBoard />;
      case 'games':
        return <GameAnalyzer />;
      case 'openings':
        return <OpeningExplorer />;
      case 'puzzles':
        return <PuzzleMode />;
      case 'settings':
        return <Settings />;
      default:
        return <AnalysisBoard />;
    }
  };

  return (
    <div className="app">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className={`main-content ${sidebarOpen ? '' : 'sidebar-closed'}`}>
        {renderView()}
      </main>
    </div>
  );
}

export default App;