# API Integration - Task 1

*Company*: CODTECH IT SOLUTIONS

*Name*: Paul Bryton Raj

*INTERN ID*: CY06DY2622

*DOMAIN*: Full Stack Developement

*DURATION*: 6 weeks

*MENTOR*: **NEELA SANTHOSH**

**Output**
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/8962a152-5d4b-446c-b250-aedcf40a79de" />

<img width="1897" height="1079" alt="image" src="https://github.com/user-attachments/assets/855ff29a-3336-4772-996d-ee0ade5e06aa" />



## Overview
This web application allows users to search for current weather information by city and to search for news articles by topic. The weather data is sourced from the Open-Meteo and Geo API, while the news data is fetched using the GNews API.

## Features
- Search current weather by city name with no API key required.
- Display temperature, wind speed, and timestamp for the searched city.
- Search news articles by keyword or topic.
- Display news headlines, descriptions, sources, publication dates, and images where available.
- Responsive and user-friendly interface.

## Technologies Used
- HTML5, CSS3
- JavaScript (ES6+)
- Open-Meteo Geocoding API
- Open-Meteo Weather Forecast API
- GNews API

## How to Use
1. **Weather Search:**
   - Enter a city name in the weather search input box.
   - Click the "Search" button.
   - View the current temperature, wind speed, and timestamp for that city.

2. **News Search:**
   - Enter a topic or keyword in the news search input box.
   - Click the "Search" button.
   - Browse the latest news articles related to the entered topic.

## Installation and Setup
- Clone or download the repository.
- Open `index.html` in a web browser.
- No backend setup or API key configuration is required for the weather feature.
- The news search feature requires a GNews API key which is already embedded in the JavaScript (`scripts.js`). To use your own key, replace the `gnewsApiKey` variable value.

## Notes
- The application uses third-party APIs and is dependent on their availability.
- News search results are limited to a maximum of 12 articles per search.
- The user interface includes live status updates and accessible ARIA attributes for improved usability.

## Credits
- Weather data powered by [Open-Meteo Geocoding](https://geocoding-api.open-meteo.com) and [Open-Meteo](https://open-meteo.com).
- News data powered by [GNews API](https://gnews.io).

## License
This project is licensed under the MIT License.

---

Built for Task 1 as part of a learning project.
