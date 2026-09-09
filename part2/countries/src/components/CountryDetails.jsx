import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

export default function CountryDetails({ country }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const [lat, lon] = country.latlng;

        axios
            .get(
                `https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
            )
            .then((response) => setWeather(response.data.data))
            .catch((error) => {
                console.error("Fetched to load weather data", error);
                setWeather(null);
            });
    }, [country]);

    return (
        <div>
            <section>
                <h2>
                    {country.flag} {country.name?.common}
                </h2>
                <p>
                    <strong>Official Name:</strong> {country.name?.official}
                </p>
                <div
                    style={{ display: "flex", gap: "20px", marginTop: "20px" }}
                >
                    {country.flags?.png && (
                        <div>
                            <h4>Flag</h4>
                            <img
                                src={country.flags.png}
                                alt={
                                    country.flags.alt ||
                                    `Flag of ${country.name?.common}`
                                }
                                width="150"
                                style={{ border: "1px solid #ccc" }}
                            />
                        </div>
                    )}
                    {country.coatOfArms?.png && (
                        <div>
                            <h4>Coat of Arms</h4>
                            <img
                                src={country.coatOfArms.png}
                                alt={`Coat of Arms of ${country.name?.common}`}
                                width="100"
                            />
                        </div>
                    )}
                </div>
            </section>

            <hr />

            <section>
                <h3>Key Properties</h3>
                <p>
                    <b>Capital: </b>
                    {country.capital?.join(", ") || "N/A"}
                </p>
                <p>
                    <b>Region: </b>
                    {country.region}{" "}
                    {country.subregion ? `(${country.subregion})` : ""}
                </p>
                <p>
                    <b>Population: </b>
                    {country.population?.toLocaleString()}
                </p>
                <p>
                    <b>Area: </b>
                    {country.area?.toLocaleString()} km²
                </p>

                <p>
                    <b>Independent: </b>
                    {country.independent ? "Yes" : "No"}
                </p>
                <p>
                    <b>UN Member: </b>
                    {country.unMember ? "Yes" : "No"}
                </p>
                <p>
                    <b>Landlocked: </b>
                    {country.landlocked ? "Yes" : "No"}
                </p>

                <p>
                    <b>Top-Level Domain: </b>
                    {country.tld?.join(", ") || "None"}
                </p>
                <p>
                    <b>Borders: </b>
                    {country.borders?.join(", ") || "None"}
                </p>
                <p>
                    <b>Timezones: </b>
                    {country.timezones?.join(", ") || "N/A"}
                </p>

                <p>
                    <b>Coordinates (Lat, Lng): </b>
                    {country.latlng?.[0]}, {country.latlng?.[1]}
                </p>
            </section>

            <hr />

            <section>
                <h3>Languages</h3>
                <ul>
                    {country.languages ? (
                        Object.values(country.languages).map((language) => (
                            <li key={language}>{language}</li>
                        ))
                    ) : (
                        <li>No languages listed</li>
                    )}
                </ul>
            </section>

            <section>
                <h3>Currencies</h3>
                <ul>
                    {country.currencies ? (
                        Object.values(country.currencies).map((currency) => (
                            <li key={currency.name}>
                                {currency.name}{" "}
                                {currency.symbol ? `(${currency.symbol})` : ""}
                            </li>
                        ))
                    ) : (
                        <li>No currencies listed</li>
                    )}
                </ul>
            </section>

            <section>
                <h3>Alternative Spellings</h3>
                <ul>
                    {country.altSpellings?.map((spelling) => (
                        <li key={spelling}>{spelling}</li>
                    ))}
                </ul>
            </section>

            <hr />

            {weather?.[0] && (
                <section>
                    <h3 style={{ display: "flex", alignItems: "center" }}>
                        Weather
                        {weather[0].weather?.[0]?.icon && (
                            <img
                                src={`https://openweathermap.org/img/wn/${weather[0].weather[0].icon.replace(/n$/, "d")}@2x.png`}
                                alt={
                                    weather[0].weather[0].description ||
                                    "Weather icon"
                                }
                                width="64"
                            />
                        )}
                    </h3>
                    <p>
                        <b>Condition: </b>
                        {weather[0].weather?.[0]?.main}
                        {weather[0].weather?.[0]?.description}
                    </p>
                    <p>
                        <b>Temperature: </b>
                        {Math.round(weather[0].temp)}°C (Feels like:{" "}
                        {Math.round(weather[0].feels_like)}°C)
                    </p>
                    <p>
                        <b>Dew Point: </b>
                        {weather[0].dew_point}°C
                    </p>
                    <p>
                        <b>Humidity: </b>
                        {weather[0].humidity}%
                    </p>
                    <p>
                        <b>Pressure: </b>
                        {weather[0].pressure} hPa
                    </p>
                    <p>
                        <b>UV Index: </b>
                        {weather[0].uvi}
                    </p>
                    <p>
                        <b>Cloud Cover: </b>
                        {weather[0].clouds}%
                    </p>
                    <p>
                        <b>Visibility: </b>
                        {(weather[0].visibility / 1000).toFixed(1)} km (
                        {weather[0].visibility} m)
                    </p>
                    <p>
                        <b>Wind: </b>
                        {weather[0].wind_speed} m/s at {weather[0].wind_deg}°
                        {weather[0].wind_gust &&
                            ` (Gusts: ${weather[0].wind_gust} m/s)`}
                    </p>

                    <p>
                        <b>Sunrise: </b>
                        {new Date(
                            weather[0].sunrise * 1000,
                        ).toLocaleTimeString()}
                    </p>
                    <p>
                        <b>Sunset: </b>
                        {new Date(
                            weather[0].sunset * 1000,
                        ).toLocaleTimeString()}
                    </p>
                </section>
            )}

            <hr />

            <section>
                <h3>Other Details</h3>
                <p>
                    <b>Calling Code: </b>
                    {country.idd?.root}
                    {country.idd?.suffixes?.[0] || ""}
                </p>
                <p>
                    <b>Driving Side: </b>
                    {country.car?.side || "N/A"}
                </p>
                <p>
                    <b>Maps: </b>
                    {country.maps?.googleMaps ? (
                        <a
                            href={country.maps.googleMaps}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Google Maps
                        </a>
                    ) : (
                        "N/A"
                    )}
                </p>
            </section>
        </div>
    );
}
