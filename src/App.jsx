import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [crypto, setCrypto] = useState("BTN");
  const [fiat, setFiat] = useState("USD");
  const [currentDate, setCurrentDate] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    const finalURL = baseURL + crypto + fiat;

    axios
      .get(finalURL)
      .then((response) => {
        const price = response.data.last;
        const currentDate = response.data.display_timestamp;

        setCurrentDate(currentDate);
        setPrice(price);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError(`Error Retrieving ${crypto} Price`);
      });
  };

  return (
    <div className="container">
      <h1>Bitcoin Ticker</h1>

      <form className="form" onSubmit={handleSubmit}>
        <select
          className="dropdown"
          name="crypto"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
        >
          <option value="BTN">Bitcoin</option>
          <option value="ETH">Ethereum</option>
          <option value="LTC">Litecoin</option>
        </select>

        <select
          className="dropdown"
          name="fiat"
          value={fiat}
          onChange={(e) => setFiat(e.target.value)}
        >
          <option value="USD">US Dollar</option>
          <option value="GBP">GB Pounds</option>
          <option value="EUR">EU Euro</option>
        </select>

        <button className="button" type="submit">
          Check
        </button>
      </form>

      {currentDate && (
        <p className="result">The Current Date is {currentDate}</p>
      )}
      {price && (
        <h2 className="result">
          The Current {crypto} Price is: {price} {fiat}
        </h2>
      )}
      {error && <h2 className="error">{error}</h2>}
    </div>
  );
};

export default App;
