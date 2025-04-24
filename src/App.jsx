import React ,{useState,useEffect}from 'react'
import "./App.css"

function App() {
  
   

      const[city, setCity] = useState('')
      const[temp, setTemp] = useState(false)
      const[weather, setWeather] = useState([])
      const getBackgroundStyle = () => {
        if (!weather.current) return {};
      
        const condition = weather.current.condition.text.toLowerCase();
      
        if (condition.includes("sunny")) {
          return { background: "linear-gradient(to bottom,rgb(235, 210, 148),rgb(172, 134, 31))" }; 
        } else if (condition.includes("cloudy")) {
          return { background: "linear-gradient(to bottom, #d7d2cc, #304352)" };
        } else if (condition.includes("rain")) {
          return { background: "linear-gradient(to bottom, #4b6cb7, #182848)" }; 
        } else if (condition.includes("snow")) {
          return { background: "linear-gradient(to bottom, #e0fafc, #cfdef3)" }; 
        } else {
          return { background: "linear-gradient(to bottom, #bdc3c7, #2c3e50)" }; 
        }
      };

      useEffect(()=>{
           const url = "https://api.weatherapi.com/v1/forecast.json"
        const api_key = "06a81ea7a2cd45f680551452252404"
          fetch(`${url}?key=${api_key}&q=mumbai&days=7`)
          .then(response=>response.json())
          .then(data=>{
             console.log(data)
            setWeather(data)
            setTemp(true)
          })
    
      },[])

      const searchWeather =()=>{
        const url = "https://api.weatherapi.com/v1/forecast.json"
        const api_key = "06a81ea7a2cd45f680551452252404"
        
          fetch(`${url}?key=${api_key}&q=${city}&days=7`)
          .then(response=>{
            if(!response.ok){
              alert("Location not found")
            }
            else{
              response.json()
              .then(data=>setWeather(data))
              setCity('')
            }
            })
          }  

    
    return(
    <>
    <div className="main" style={ getBackgroundStyle()}>
    <div className="child1">
      <input 
      type="text"
      placeholder='enter city name'
      id="inp"
      value={city}
      onChange={(event)=>setCity(event.target.value)}></input>
      <button onClick={searchWeather} id="btn">Search</button>
    </div>

    {temp && <>
                <div className='child2'>
                  <div className="main-info">
                    <div className="temp">
                  <img  className="img" src={weather.current.condition.icon}/>
                  <h4 id="tempc">{weather.current.temp_c}°C</h4>
                  </div>
                  <div className="place">
                  <h2 id="place">{weather.location.name}</h2>
                  <h3 id='region'>{weather.location.region}</h3>
                  <h3 id='region'>{weather.location.country}</h3> 
                  </div>
                
                  </div>
                  <div className="extra-info">
                    <div className="info">
                      <img src ="./humidity.png" alt="humidity" 
                    style={{width:'40px' , height:'40'}}/>
                    <stong> Humidity</stong>
                    <p> {weather.current.humidity}%</p>
                    </div>


                    <div className="info">
                      <img src ="./wind.png" alt="wind" 
                    style={{width:'40px' , height:'40'}}/>
                    <stong> Wind</stong>
                    <p> {weather.current.wind_kph}kph</p>
                    </div>
                    
                    <div className="info">
                      <img src ="./sun.png" alt="uv" 
                    style={{width:'40px' , height:'40'}}/>
                    <stong> UV</stong>
                    <p> {weather.current.uv}</p>
                    </div>
                    
                     
                    <div className="info">
                      <img src ="./air.png" alt="air pressure" 
                    style={{width:'40px' , height:'40'}}/>
                    <stong> Air Pressure</stong>
                    <p> {weather.current.pressure_mb}</p>
                    </div>

                    <div className="info">
                      <img src ="./temperature.png" alt="feels like" 
                    style={{width:'40px' , height:'40'}}/>
                    <stong> Feels like</stong>
                    <p> {weather.current.feelslike_c}°C</p>
                    </div>

                    <div className="info">
                      <img src ="./view.png" alt="feels like" 
                    style={{width:'40px' , height:'40'}}/>
                    <stong> Visibility</stong>
                    <p> {weather.current.vis_km}km</p>
                    </div>
                    
                     
                      </div>
                </div>


              
              <div className='child3'>
                  <h1>Sunrise: {weather.forecast.forecastday[0].astro.sunrise}</h1>
                  <h1>Sunset: {weather.forecast.forecastday[0].astro.sunset}</h1>
                  <h1>max: {weather.forecast.forecastday[0].day.maxtemp_c}°C</h1>
                  <h1>min: {weather.forecast.forecastday[0].day.mintemp_c}°C</h1>
              </div>
              <div className = "child4">
                {weather.forecast?.forecastday?.slice(0,7).map((day,index)=>
                  {const weekday = new Date(day.date ).toLocaleDateString('en-US',{
                    weekday:'long',
                  });
                  const iconurl = `https:${day.day.condition.icon}`;
                  const tempC = day.day.avgtemp_c;
                  return(<div 
                  className="card"key={index}>
                    <h3>{weekday}</h3>
                    <img src ={iconurl}alt="weather icon"/>
               <h4>{tempC}°C</h4>
             </div>);
})}
              </div>
              </>}
    </div>
   
    </>
  )
}

export default App