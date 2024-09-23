import logo from './logo.svg';
import './App.css';
import {WeatherReportList} from './Components/WebContent/LandingPage/WeatherReportList.js';

function App() {
  return (
    <div className="App">
      <div>
        <p tabindex="0" aria-label="Mingtao Li for the test">
          test - Mingtao Li
        </p>
      </div>
      <WeatherReportList />
    </div>
  );
}

export default App;
