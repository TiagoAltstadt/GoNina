import "./App.css";
import React, { useState } from "react";

function App() {
  const [id, setId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const baseURL =
    "https://gist.github.com/FerdinandvHagen/ce5a939da313c6a8dfe2ad006fd11d9c/orders";

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const fetchOrderData = async () => {
    try {
      const options = {
        method: "GET",
        mode: "no-cors",
      };
      const response = await fetch(`${baseURL}/${id}`, options);
      if (response.ok) {
        const jsonData = await response.json();
        setOrderData(jsonData);
        setErrorMessage("");
      } else {
        setOrderData(null);
        setErrorMessage("No matching order found");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseURL}/${id}`, {
        method: "DELETE",
        mode: "no-cors",
      });
      if (response.ok) {
        console.log("Order deleted successfully");
        setOrderData(null);
      } else {
        console.error("Error deleting order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div>
      <div className="App">
        <div className="title">Go Niña</div>
        <div className="subtitle">Order Details</div>
        <div className="search">
          <label htmlFor="orderId">Order ID:</label>
          <input
            type="text"
            id="orderId"
            value={id}
            onChange={handleInputChange}
          />
          <button className="button-search" onClick={fetchOrderData}>
            Search
          </button>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        {orderData && (
          <div className="data-container">
            <div className="data">
              <span className="data-title">Order ID:</span> {orderData.id}
            </div>
            <div className="data">
              <span className="data-title">Status:</span> {orderData.status}
            </div>
            <div className="data">
              <span className="data-title">Amount:</span> {orderData.amount}
            </div>
            <div className="data">
              <span className="data-title">Currency:</span> {orderData.currency}
            </div>
            <button className="button-delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="createdBy">Created By: Tiago Altstadt</div>
      <div className="createdBy">
        http://https//www.linkedin.com/in/tiagoaltstadt/
      </div>
    </div>
  );
}

export default App;
