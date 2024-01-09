const apiKey = "cfbb6cd338146975048e3ee8fbd9d640";
const cidadeInput = document.querySelector('#cidade-input');
const pesquisarBtn = document.querySelector('#pesquisar');

const nomecidade = document.querySelector('#cidade');
const temperatura = document.querySelector('#temperatura span');
const descricao = document.querySelector('#descricao');
const umidade = document.querySelector('#umidade span');
const vento = document.querySelector('#vento span');

const getWeatherData = async (city) => {
    try {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
        const resposta = await fetch(apiWeatherURL);

        if (!resposta.ok) {
            throw new Error('Não foi possível econtrar essa cidade, favor reescrever o nome do local');
        }

        const data = await resposta.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

const showWeatherData = async (city) => {
    try {
        const data = await getWeatherData(city);

        nomecidade.innerText = data.name;
        temperatura.innerText = parseInt(data.main.temp) + '°C';
        descricao.innerText = data.weather[0].description;
        umidade.innerText = `Umidade no local: ${data.main.humidity}%`;
        vento.innerText = `Velocidade do vento: ${data.wind.speed}km/h;`;
    } catch (error) {
        alert(error.message);
    }
}

pesquisarBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const cidade = cidadeInput.value;
    showWeatherData(cidade);
    console.log(cidade);
});

cidadeInput.addEventListener("keyup", async (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        await showWeatherData(city);
    }
});
