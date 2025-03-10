const api_key1="9dcca12da8354e5e89bafa1b1c942e2f";
const api_url1="https://api.openweathermap.org/data/2.5/weather";
let searchbtn=document.querySelector("button");
let input=document.querySelector("#cityname");
searchbtn.addEventListener("click",()=>{
    let city=input.value;
    getWeather(city)
})
input.addEventListener("input", ()=>{
    document.querySelector(".city-weather").classList.remove("show");
});
async function getWeather(v) {
    const result1=await fetch(api_url1+`?q=${v}&appid=${api_key1}&units=metric`);
    var data1= await result1.json();
    changeCityWeather(data1);
    console.log(data1);
}
function changeCityWeather(d){
    document.querySelector(".city-name").innerHTML=d.name;
    document.querySelector(".temperature").innerHTML=`${Math.ceil(d.main.temp)}°C`;
    document.querySelector(".city-weather img").src=`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`;
    document.querySelector(".humidity .text b").innerText=`${d.main.humidity}%`;
    const wind_speed=Math.floor(d.wind.speed*3.6);
    document.querySelector(".wind .text b").innerText=`${wind_speed} Kmph`;
    let sunrise=d.sys.sunrise+d.timezone;
    const sunrise_time=convertUnixToTime(sunrise);
    document.querySelector(".sunrise .text b").innerHTML=` <p><b>${sunrise_time}</b></p>`
    let sunset=d.sys.sunset+d.timezone;
    const sunset_time=convertUnixToTime(sunset);
    document.querySelector(".sunset .text b").innerHTML=` <p><b>${sunset_time}</b></p>`
    document.querySelector(".pressure .text h4").innerText=`${d.main.pressure}`;
    document.querySelector(".city-weather").classList.add("show");
}
function convertUnixToTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}