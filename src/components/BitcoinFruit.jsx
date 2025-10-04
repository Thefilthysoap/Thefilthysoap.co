import React, { useEffect, useState } from 'react';

const FRUITS = [
  { name: "Apples", emoji: "🍎", price: 0.75 },
  { name: "Bananas", emoji: "🍌", price: 0.35 },
  { name: "Oranges", emoji: "🍊", price: 0.65 },
  { name: "Grapes", emoji: "🍇", price: 2.99 },
  { name: "Strawberries", emoji: "🍓", price: 4.50 },
  { name: "Pineapples", emoji: "🍍", price: 3.25 }
];

export default function BitcoinFruit() {
  const [btcPrice, setBtcPrice] = useState(null);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  async function fetchBitcoinPrice() {
    try {
      const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
      const json = await res.json();
      setBtcPrice(json.bpi.USD.rate_float);
      setLastUpdated(new Date());
      setError(false);
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    fetchBitcoinPrice();
    const iv = setInterval(fetchBitcoinPrice, 30000);
    return () => clearInterval(iv);
  }, []);

  if (error) {
    return <div className="loading" style={{ color: '#dc3545' }}>
      ❌ Error loading Bitcoin price. Please try again.
    </div>;
  }
  if (btcPrice === null) {
    return <div className="loading">⏳ Loading Bitcoin price…</div>;
  }

  return (
    <>
      <div className="btc-price">
        <div className="btc-symbol">₿ 1 BTC =</div>
        <h2>${btcPrice.toLocaleString(undefined, { minimumFractionDigits:2 })}</h2>
      </div>
      <div className="fruit-section">
        <h3>🍎 Fruit Buying Power</h3>
        <div className="fruit-grid">
          {FRUITS.map(fruit => {
            const count = Math.floor(btcPrice / fruit.price);
            return (
              <div key={fruit.name} className="fruit-card">
                <span className="fruit-emoji">{fruit.emoji}</span>
                <div className="fruit-name">{fruit.name}</div>
                <div className="fruit-count">{count.toLocaleString()}</div>
                <div className="fruit-price">${fruit.price.toFixed(2)} each</div>
              </div>
            );
          })}
        </div>
        <button className="refresh-btn" onClick={fetchBitcoinPrice}>
          🔄 Refresh Price
        </button>
        <div className="last-updated">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </>
  );
}
