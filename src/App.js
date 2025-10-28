import logo from './logo.svg';
import './App.css';
import Countdown from './countdown';
import ThemeButton from './ThemeButton';
import Sidebar from './Sidebar.jsx';
import DataController from './DataController.js';
import react from 'react';

function App() {
  const [isOpeningAct, setIsOpeningAct] = react.useState(false);
  const [theme, setTheme] = react.useState(DataController.retrieveCacheData()?.currTheme ?? 'light');
  const [countdownArgs, setCountdownArgs] = react.useState({  
    targetDate: new Date(DataController.retrieveCacheData()?.date) ?? new Date(),
    usingHoursFormat: DataController.retrieveCacheData?.hoursFormat ?? true
  })

  document.documentElement.setAttribute('data-theme', theme);
  

  const toggleTheme = () => {
    const newTheme = theme ==='dark' ? 'light' : 'dark';
    setTheme(newTheme);
    DataController.cacheData(countdownArgs.targetDate, countdownArgs.usingHoursFormat, newTheme)
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  function updateCountdownArgs(e) {
    setCountdownArgs(e);
    DataController.cacheData(e.targetDate, e.usingHoursFormat, theme);
  }

  return (
    <div className="container">
      <Sidebar isOpen={isOpeningAct} setIsOpen={setIsOpeningAct} />
      <ThemeButton func={toggleTheme}/>
      <Countdown targetDate={countdownArgs.targetDate} usingHoursFormat={countdownArgs.usingHoursFormat} setCountdownArgs={updateCountdownArgs} setIsOpeningAct={setIsOpeningAct}/>
    </div>
  );
}


export default App;
