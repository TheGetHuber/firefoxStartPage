// Function: openURL(string) -> void
// Purpose: redirect to <url> from home page
function openURL(url){
    if(url.startsWith("https://")){
        document.location.href = url
    }else{
        document.location.href = "https://" + url
    }
}

// Function: isURL(string) -> bool
// Purpose: check if given string is url
function isURL(text){
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
      return !!urlPattern.test(text);
}

// Function: getWeather(string) -> json (error)
// Purpose: get weather from open meteo based on given city
// Note: replace those cities with whatever you want. recomended to use https://open-meteo.com/en/docs
async function getWeather(from){
    if(from == "Vitebsk"){
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=55.18065&longitude=30.216501&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&wind_speed_unit=ms&timezone=Europe%2FMoscow&forecast_days=1")
        if(!response.ok){
            throw new Error("Возникли ошибки при получении реквеста погоды: " + response)
        }
        return await response.json()
    }else if(from == "Bobruisk"){
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=53.1449683&longitude=29.2281209&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&wind_speed_unit=ms&timezone=Europe%2FMoscow&forecast_days=1")
        if(!response.ok){
            throw new Error("Возникли ошибки при получении реквеста погоды: " + response)
        }
        return await response.json()
    }else{
        throw new Error("Неправильное указание города")
    }
    
}

// Main function
window.onload = async () => {
    // Note: add whatever you want here, or live blank ("") if you dont want any motd.
    let motds = ["Привет!", "Поищи что-нибудь", "мгемгемгемгемге", 
        "Why do we all have to wear those riddiculous ties?", "Бум, в голову!", 
        "Получи, слащавый педик!", "а может... нет", "Gordon Freeman! And about time too!", 
        "Sometimes I dream about... cheese...", "80 words/min peak", 
        "...И мне плевать, я после смерти отправлюсь в фазу вченого сна...",
        "F = ma", "F = mv", "F = mg", "print(\"Hello world!\")",
        "puts \"Hello world!\"", "based", "Firefox!", "DuckDuckGo", "Время сделать commit!",
        "опять?", "вкладка", "Сумашедшая собака мне отгрызла пару пальцев (да и похуй)",
        "Тимоха! Чё ты делаешь!? Это git commit -f", "Search 100", "не вспоминай", "Я тренеровался до 6-ти часов утра!",
        "Время не вернуть обратно", "1000-7, 993-7, 986-7, ..."
    ]

    // Note: you must edit those 9 lines below if you have edited getWeather function (plus, change the HTML id's too)
    let weatherVitebsk = await getWeather("Vitebsk")
    let weatherBobruisk = await getWeather("Bobruisk")
    
    document.querySelector("#temp-Vitebsk").textContent = weatherVitebsk.current.temperature_2m + " " + weatherVitebsk.current_units .temperature_2m
    document.querySelector("#wind-Vitebsk").textContent = weatherVitebsk.current.wind_speed_10m + " м/с"
    document.querySelector("#humid-Vitebsk").textContent = weatherVitebsk.current.relative_humidity_2m + "%"
    
    document.querySelector("#temp-Bobruisk").textContent = weatherBobruisk.current.temperature_2m + " " + weatherVitebsk.current_units .temperature_2m
    document.querySelector("#wind-Bobruisk").textContent = weatherBobruisk.current.wind_speed_10m + " м/с"
    document.querySelector("#humid-Bobruisk").textContent = weatherBobruisk.current.relative_humidity_2m + "%"

    let motd = document.querySelector("#motd")
    let searchbox = document.querySelector("#searchbox")

    motd.textContent = motds[Math.round(Math.random() * (motds.length - 1))]

    // Purpose: redirect user from home page to a search engine with #searchbox's (input) text content or redirect to a specified url
    document.addEventListener("keydown", (e) => {
        if(e.key == "Enter"){
            if(searchbox === document.activeElement){
                if(isURL(searchbox.value)){
                    openURL(searchbox.value)
                }else{
                    openURL("duckduckgo.com/" + searchbox.value)
                }
            }
        }
    })
}