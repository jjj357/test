import React, { useState } from "react";
import Axios from 'axios';
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./WeatherReportList.module.css";

export function WeatherReportList() {
  const weatherAPIKey = '62ddb7d6f9e93530980cd7887999ee12';
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [newWeatherReportList, setNewWeatherReportList] = useState([]);
  const resetWeatherReportList = () => {
    setNewWeatherReportList([]);
    setTemperature("");
    setCity("");
  };
  
  const getAllCityListByName = (name) => {
    if(name === '') {
        return alert('Please enter a city name.');
    }
    setNewWeatherReportList([]);
    setTemperature("");
    const url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + name  + '&limit=5&appid=' + weatherAPIKey;
    Axios.get(url).then(response => {
        //console.log(response);
        if (response.statusText !== "OK") {
            throw Error(response.statusText);
        }
        const tempWeatherReportList = response.data;

        setNewWeatherReportList(tempWeatherReportList);
        
        if(tempWeatherReportList.length === 1) {
            getOneCityWeatherReport((tempWeatherReportList[0]).lat,(tempWeatherReportList[0]).lon);
        }
    }).catch(er=>{
      alert("Get all cities list error: " + er);
    });
  };
  
  const getOneCityWeatherReport = (lat,lon) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + weatherAPIKey;
    Axios.get(url).then(response => {
        //console.log(response);
        if (response.statusText !== "OK") {
            throw Error(response.statusText);
        }
        const tempOneCityWeatherReport = response.data.main.temp;

        setTemperature(tempOneCityWeatherReport);
    }).catch(er=>{
      alert("Get one city weather report error: " + er);
    });
  };
  
    const getOneCityWeatherReportByEnterKey = (event, lat,lon) => {
        if(event.keyCode === 13) { 
            getOneCityWeatherReport(lat,lon);
        }
    };

  return (
    <div className={styles.bigfont}>
        <div className={styles.alert} tabindex="0" aria-label="If many cities have the same city name, click the one you want for the current temperature.">If many cities have the same city name, click the one you want for the current temperature.</div>
        <label>
            <span tabindex="0" aria-label="City Name">City Name:</span>
            <input
              className={styles.input}
              value={city}
              type="text"
              onChange={(e) => setCity(e.target.value)}
              name="name"
              placeholder="city name"
              tabindex="0"
              aria-label="Please enter a city name."
              autoFocus
            />
          </label>
          
      <button
        className={styles.button}
        aria-label="Get Weather Report"
        onClick={() => {
            getAllCityListByName(city);
        }}
      >
        Get Weather Report
      </button>&nbsp;&nbsp;&nbsp;&nbsp;

      <button
        className={styles.button}
        aria-label="Reset Weather Report"
        onClick={() => {
            resetWeatherReportList();
        }}
      >
        Reset
      </button><br/>
          {newWeatherReportList.map((item, i) => {
            return (
              <div key={i} tabindex="0" className={styles.row} aria-label="City Name: {item.name}, State: {item.state}, Country: {item.country}" onKeyDown={(event) => getOneCityWeatherReportByEnterKey(event, item.lat,item.lon)} onClick={() => getOneCityWeatherReport(item.lat,item.lon)}>
                  City Name: {item.name}, State: {item.state}, Country: {item.country}
              </div>
            );
          })}
          
        <label className={styles.alert} tabindex="0" aria-label="Temperature (Celsius): {temperature}">Temperature (Celsius): {temperature}</label>
    </div>
  );
}