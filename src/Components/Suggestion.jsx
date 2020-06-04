import React from "react";
import "./SearchForm.css";

export default function Suggestion({ ClickItem, CountryName, CountryCode }) {
  return (
    <div
      className="suggestion-item"
      onClick={() => ClickItem(CountryName, CountryCode)}
    >
      <h5>{CountryName}</h5>
      <h5>{CountryCode}</h5>
    </div>
  );
}
