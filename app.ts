import axios from "axios";

const fullName: string = "Annika Chauhan";

console.log(fullName);

const nasaKey: string = "lOlH3lnFB8w96r2UdDzVubhemZJxFjDjFQlrr1Ou";

const getNasaKey = async (url: string) : Promise<T> => {
    const params: object = {
        api_key: nasaKey
    }
    const response = await axios.get(url, { params });
    const img = document.createElement("img");
    img.src = response.data.hdurl;
    img.alt = 'I wanted to get the best quality image for you so sometimes it takes some time, sorry!';
    document.getElementById('nasapic').appendChild(img);
}

getNasaKey("https://api.nasa.gov/planetary/apod");