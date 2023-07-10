import { useEffect, useState } from "react";

export default function App() {
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState("");

  const [baseCurr, setBaseCurr] = useState("USD");

  const [refCurr, setRefCurr] = useState("USD");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [conversionValue, setConversionValue] = useState("");

  const handleChangeBaseCurrencyAmount = (event) => {
    setBaseCurrencyAmount(Number(event.target.value));
  };

  const handleChangeBaseCurr = (event) => {
    setBaseCurr(event.target.value);
  };

  const handleChangeRefCurr = (event) => {
    setRefCurr(event.target.value);
  };

  const output = function () {
    if (!baseCurrencyAmount) {
      return `0 ${refCurr}`;
    } else if (baseCurr === refCurr) {
      return `${baseCurrencyAmount} ${refCurr}`;
    } else {
      return `${conversionValue} ${refCurr}`;
    }
  };

  useEffect(
    function () {
      async function fetchCurrency() {
        try {
          setIsLoading(true);

          setError("");

          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${baseCurrencyAmount}&from=${baseCurr}&to=${refCurr}`
          );

          const data = await res.json();

          setConversionValue(data.rates[refCurr]);

          console.log(data);
        } catch (err) {
        } finally {
          setIsLoading(false);
        }
      }

      fetchCurrency();
    },

    [baseCurr, refCurr, baseCurrencyAmount, conversionValue, error]
  );

  return (
    <div>
      <NavBar></NavBar>
      <label className="form-label">Valor</label>
      <input
        type="text"
        className="form-control"
        onChange={handleChangeBaseCurrencyAmount}
      />
      <label className="form-label">Moeda Base</label>
      <select className="form-select" onChange={handleChangeBaseCurr}>
        <option value="USD">USD</option>

        <option value="EUR">EUR</option>

        <option value="CAD">CAD</option>

        <option value="BRL">BRL</option>
      </select>
      <label className="form-label">Moeda Referência</label>
      <select className="form-select" onChange={handleChangeRefCurr}>
        <option value="USD">USD</option>

        <option value="EUR">EUR</option>

        <option value="CAD">CAD</option>

        <option value="BRL">BRL</option>
      </select>

      <p>
        {isLoading ? (
          <p className="blockquote text-center">Carregando...</p>
        ) : (
          <p className="blockquote text-center">{output()}</p>
        )}
      </p>
    </div>
  );
}

function NavBar() {
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <h1 className="navbar-brand">Conversor de Moedas</h1>
        </div>
      </nav>
    </div>
  );
}
