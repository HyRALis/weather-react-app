import React, { useState } from "react";
import "./SearchForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";

export default function SearchForm({
  GetData,
  Search,
  City,
  Country,
  SetCity,
  SetCountry,
}) {
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
          onChange={(e) => SetCountry(e.target.value)}
          value={Country}
          onKeyPress={Search}
        />
        <button className="search-btn" onClick={GetData}>
          <FontAwesomeIcon icon={faSearchLocation} size="1x" />
        </button>
      </div>
    </div>
  );
}
