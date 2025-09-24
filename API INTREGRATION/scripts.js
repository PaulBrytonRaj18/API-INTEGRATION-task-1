// Weather search using Open-Meteo (no API key required)

const formElement = document.getElementById('search-form');
const inputElement = document.getElementById('city-input');
const statusElement = document.getElementById('status');
const resultsElement = document.getElementById('results');

function setStatus(message, type = 'info') {
	statusElement.textContent = message;
	statusElement.className = type;
}

function renderWeatherCard(cityName, weather) {
	const card = document.createElement('article');
	card.className = 'card';

	const temperature = weather.temperature_2m?.[0];
	const windspeed = weather.windspeed_10m?.[0];
	const time = weather.time?.[0];

	card.innerHTML = `
		<h3>${cityName}</h3>
		<p><strong>Time:</strong> ${new Date(time).toLocaleString()}</p>
		<p><strong>Temperature:</strong> ${temperature} °C</p>
		<p><strong>Wind:</strong> ${windspeed} km/h</p>
	`;

	resultsElement.replaceChildren(card);
}

async function geocodeCity(city) {
	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
	const response = await fetch(url);
	if (!response.ok) throw new Error('Geocoding failed');
	const data = await response.json();
	if (!data.results || data.results.length === 0) throw new Error('City not found');
	const { latitude, longitude, name, country } = data.results[0];
	return { latitude, longitude, label: `${name}, ${country}` };
}

async function fetchWeather(latitude, longitude) {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,windspeed_10m&timezone=auto&forecast_days=1`;
	const response = await fetch(url);
	if (!response.ok) throw new Error('Weather fetch failed');
	const data = await response.json();
	return data.hourly;
}

formElement?.addEventListener('submit', async (event) => {
	event.preventDefault();
	const city = inputElement.value.trim();
	if (!city) {
		setStatus('Please enter a city name.', 'warn');
		return;
	}

	resultsElement.replaceChildren();
	setStatus('Loading…', 'loading');
	try {
		const { latitude, longitude, label } = await geocodeCity(city);
		const hourly = await fetchWeather(latitude, longitude);
		renderWeatherCard(label, hourly);
		setStatus('');
	} catch (error) {
		console.error(error);
		setStatus(error.message || 'Something went wrong. Please try again.', 'error');
	}
});

// Optional: default example on load
window.addEventListener('DOMContentLoaded', () => {
	if (inputElement && !inputElement.value) {
		inputElement.value = 'London';
		formElement?.dispatchEvent(new Event('submit'));
	}
});

// News search using GNews API
const gnewsApiKey = 'ef597a6bd568022fe2af0935da40c71a';
const newsForm = document.getElementById('news-form');
const newsInput = document.getElementById('news-input');
const newsStatus = document.getElementById('news-status');
const newsResults = document.getElementById('news-results');

function setNewsStatus(message, type = 'info') {
	newsStatus.textContent = message;
	newsStatus.className = type;
}

function createNewsCard(article) {
	const card = document.createElement('article');
	card.className = 'card';
	const title = article.title || 'Untitled';
	const description = article.description || '';
	const source = article.source?.name ? ` • ${article.source.name}` : '';
	const img = article.image || '';
	const url = article.url || '#';

	card.innerHTML = `
		${img ? `<img class="thumb" src="${img}" alt="">` : ''}
		<h3>${title}</h3>
		<p class="muted">${new Date(article.publishedAt).toLocaleString()}${source}</p>
		<p>${description}</p>
		<p><a class="link" href="${url}" target="_blank" rel="noopener">Read more</a></p>
	`;
	return card;
}

async function fetchNews(query) {
	const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=12&apikey=${gnewsApiKey}`;
	const response = await fetch(url);
	if (!response.ok) throw new Error('News fetch failed');
	return response.json();
}

newsForm?.addEventListener('submit', async (event) => {
	event.preventDefault();
	const query = newsInput.value.trim();
	if (!query) {
		setNewsStatus('Please enter a topic or keyword.', 'warn');
		return;
	}
	newsResults.replaceChildren();
	setNewsStatus('Loading…', 'loading');
	try {
		const data = await fetchNews(query);
		if (!data.articles || data.articles.length === 0) {
			setNewsStatus('No articles found. Try another keyword.', 'warn');
			return;
		}
		const fragment = document.createDocumentFragment();
		data.articles.forEach((a) => fragment.appendChild(createNewsCard(a)));
		newsResults.replaceChildren(fragment);
		setNewsStatus('');
	} catch (error) {
		console.error(error);
		setNewsStatus(error.message || 'Could not load news. Please try again.', 'error');
	}
});

// Default news on load
window.addEventListener('DOMContentLoaded', () => {
	if (newsInput && !newsInput.value) {
		newsInput.value = 'technology';
		newsForm?.dispatchEvent(new Event('submit'));
	}
});