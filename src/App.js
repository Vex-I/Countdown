import logo from './logo.svg';
import './App.css';
import Countdown from './countdown';
import ThemeButton from './ThemeButton';
import Sidebar from './Sidebar.jsx';
import DataController from './DataController.js';
import react, { useEffect } from 'react';
import Wave from "react-wavify";


const MS_IN_HOUR = 360000;
function App() {
  const [isOpeningAct, setIsOpeningAct] = react.useState(false);
  const [theme, setTheme] = react.useState(DataController.retrieveCacheData()?.currTheme ?? 'light');
  const [tracking, setTracking] = react.useState(DataController.retrieveCacheData()?.tracking ?? {
    dateTracked: new Date().toDateString(),
    timeTracked: 0
  })

  const [countdownArgs, setCountdownArgs] = react.useState({  
    targetDate: new Date(DataController.retrieveCacheData()?.date) ?? new Date(),
    usingHoursFormat: DataController.retrieveCacheData?.hoursFormat ?? true
  })

  let lastDate = new Date().toDateString();

  function checkDayChange() {
    const today = new Date().toDateString();
    if (today !== lastDate) {
      setTracking({dateTracked: today, timeTracked: 0})
      lastDate = today;
    }
  }

  useEffect(() => {
    setInterval(() => {
      checkDayChange()
    }, 1000);
  },[])


  function updateTracking(track) {
    setTracking(prev => {
    const newTrack = {
      dateTracked: prev.dateTracked,
      timeTracked: prev.timeTracked + track
    };

    DataController.cacheData(countdownArgs.targetDate, countdownArgs.usingHoursFormat, theme, newTrack)
    return newTrack;
    })
  }

  document.documentElement.setAttribute('data-theme', theme);
  

  const toggleTheme = () => {
    console.log(theme)
    const newTheme = theme ==='dark' ? 'light' : 'dark';
    setTheme(newTheme);
    DataController.cacheData(countdownArgs.targetDate, countdownArgs.usingHoursFormat, newTheme, tracking)
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  function updateCountdownArgs(e) {
    setCountdownArgs(e);
    DataController.cacheData(e.targetDate, e.usingHoursFormat, theme, tracking);
  }

  function calulateHeight(tracking) {
    const height = 430 * (1 - (tracking / MS_IN_HOUR / 12));
    return height
  }

  return (
    <div className="container">
      <Sidebar isOpen={isOpeningAct} setIsOpen={setIsOpeningAct} setTracking={updateTracking} />
      <ThemeButton func={toggleTheme}/>
      <Countdown 
      targetDate={countdownArgs.targetDate} 
      usingHoursFormat={countdownArgs.usingHoursFormat} 
      setCountdownArgs={updateCountdownArgs} 
      setIsOpeningAct={setIsOpeningAct}
      tracking={tracking.timeTracked}/>
      <div style={{
        position: "fixed",
        zIndex:"-1",
        top:"0px",
        width:"500px",
        height:"434px",
        borderRadius:"8px",
        overflowX:"hidden"}}>
      <Wave 
      style={{
        position:"absolute",
        width:"inherit",
        height:"434px",
        bottom:"0px",
        left:"0px",
        borderRadius:"inherit",
        overflow:"hidden"
      }}
      fill="hsl(240, 43%, 45%)"
      options={{
        height: calulateHeight(tracking.timeTracked),
        amplitude:5,
        speed:1,
      }}/>
      </div>
    </div>
  );
}


export default App;
