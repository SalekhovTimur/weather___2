import React, { useState } from "react";
import Conditions from "../Conditions/Conditions";
import classes from "./Forecast.module.css";
import clearSky from "../../assets/clearSky.gif";
import brokenClouds from "../../assets/brokenClouds.gif";
import lightRain from "../../assets/lightRain.gif";
import moderateRain from "../../assets/moderateRain.gif";
import overcastClouds from "../../assets/overcastClouds.gif";
import fewClouds from "../../assets/fewClouds.gif";
import scatClouds from "../../assets/scatClouds.gif";

import '../../App.css'




const Forecast = ({setGif, setLocation}) => {
    
    const [responseObj, setResponseObj] = useState({});
    const [city, setCity] = useState("");
    const [unit, setUnit] = useState("imperial");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const uriEncodedCity = encodeURIComponent(city);
  
  function getForecast(e) {
    e.preventDefault();

    if (city.length === 0) {
      return setError(true);
    }

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_api_key,
      },
    };
    
    setError(false);
    setResponseObj({});
    setLoading(true);

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        
        if (response.cod !== 200) {
          throw new Error();
        }
        
        
        setLocation(city)
        setResponseObj(response);
        setLoading(false);
        if (response.weather[0].description === "overcast clouds") {
          setGif(overcastClouds);
  
        } else if (response.weather[0].description === "light rain") {
          setGif(lightRain);
        } else if (response.weather[0].description === "broken clouds") {
          setGif(brokenClouds);
          
        } else if (response.weather[0].description === "moderate rain") {
          setGif(moderateRain);
        } else if (response.weather[0].description === "few clouds") {
          setGif(fewClouds);
        } else if (response.weather[0].description === "clear sky") {
          setGif(clearSky);
        } else if (response.weather[0].description === "scattered clouds") {
          setGif(scatClouds);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err.message);
      });
  }
  
  return (
    <div>
      <h2>Найдите текущие погодные условия</h2>
      <form onSubmit={getForecast}>
        <input
          type="text"
          placeholder="Введите город"
          maxLength="50"
          value={city}
          
          className={classes.textInput}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <label className={classes.Radio}>
          <input
            type="radio"
            name="units"
            checked={unit === "metric"}
            value="metric"
            onChange={(e) => setUnit(e.target.value)}
          />
          Цельсии
        </label>
        <label className={classes.Radio}>
          <input
            type="radio"
            name="units"
            checked={unit === "imperial"}
            value="imperial"
            onChange={(e) => setUnit(e.target.value)}
          />
          Фаренгейт
        </label>
          <button className={classes.Button} type="submit">
            Получить прогноз
          </button>
      </form>
      <Conditions
        responseObj={responseObj}
        error={error}
        loading={loading}
      />
    </div>
  );
};
export default Forecast;