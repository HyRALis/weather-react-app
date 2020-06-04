import React, { useState } from "react";
import "./SearchForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import countryData from "../assets/data/Country.json";
import Suggestion from "./Suggestion";

export default function SearchForm({
  GetData,
  Search,
  City,
  Country,
  SetCity,
  SetCountry,
}) {
  let [suggestArray, setSuggestArray] = useState([]);

  const searchCountry = async (inputText, countries) => {
    SetCountry(inputText);
    let filters = countries.filter((country) => {
      let regex = new RegExp(`^${inputText}`, "gi");
      return country.Name.match(regex);
    });

    if (inputText.length === 0) {
      filters = [];
    }
    setSuggestArray(filters);
  };

  const displaySuggestions = (array) => {
    if (array.length > 0) {
      return array.map((sug, index) => (
        <Suggestion
          key={index}
          SetCountry={SetCountry}
          CountryName={sug.Name}
          CountryCode={sug.Code}
          ClickItem={clickSuggestions}
        />
      ));
    }
  };

  const clickSuggestions = (countryname, countrycode) => {
    const inputbox = document.getElementsByClassName("input-form2");
    inputbox[0].value = countryname;
    SetCountry(countrycode);
    setSuggestArray([]);
  };

  return (
    <div className="search-container">
      <div className="search-form">
        <input
          className="input-form1"
          type="text"
          placeholder="Enter a City..."
          onChange={(e) => SetCity(e.target.value)}
          value={City}
        />
        <input
          className="input-form2"
          type="text"
          placeholder="Enter a Counrty..."
          onChange={(e) => searchCountry(e.target.value, countryData)}
          onKeyPress={Search}
          value={Country}
        />
        <button className="search-btn" onClick={GetData}>
          <FontAwesomeIcon icon={faSearchLocation} size="1x" />
        </button>
      </div>
      <div className="suggestions">{displaySuggestions(suggestArray)}</div>
    </div>
  );
}
