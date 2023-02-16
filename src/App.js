import './App.css';
import { useEffect, useState } from 'react';
import { Convertor } from './components/convertor';

function App() {


  const BASE_URL = "https://api.apilayer.com/exchangerates_data/latest";

  const [currencylist, setCurrencylist] = useState([]);
  const [fromcurrency, setFromcurrency] = useState();
  const [tocurrency, setTocurrency] = useState();
  const [exchangerate, setExchangerate] = useState([]);
  const [amount, setAmount] = useState(1);
  const [isfromCurrencyChanged, setIsfromCurrencyChaged] = useState(true);

  let fromAmount, toAmount;

  if (isfromCurrencyChanged) {

    fromAmount = amount;
    toAmount = amount * exchangerate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangerate;
  }



  //console.log(currencylist)

  useEffect(() => {
    fetch(BASE_URL,
      {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'apikey': "DugB3pliAZP4tQ3SV2cokZ9UqtVrGYXk"
        }
      })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setCurrencylist([data.base, ...Object.keys(data.rates)]);
        setFromcurrency(data.base);
        const firstcurrency = Object.keys(data.rates)[0];
        setTocurrency(firstcurrency);
        setExchangerate((data.rates)[tocurrency]);
        console.log('exchange rate', exchangerate);
      })
  }, [])

  useEffect(() => {
    if (fromcurrency != null && tocurrency != null) {
      fetch(`${BASE_URL}?symbols=${tocurrency}&base=${fromcurrency}`,
        {
          method: 'GET',
          redirect: 'follow',
          headers: {
            'apikey': "DugB3pliAZP4tQ3SV2cokZ9UqtVrGYXk"
          }
        })
        .then(res => res.json())
        .then(data => setExchangerate((data.rates)[tocurrency]))
    }

  }, [fromcurrency, tocurrency])

  const handleFromamountchange = (e) => {
    setAmount(e.target.value);
    setIsfromCurrencyChaged(true);

  }

  const handleToamountchange = (e) => {
    setAmount(e.target.value);
    setIsfromCurrencyChaged(false);

  }


  return (
    <>

      <div className="container mt-5  d-flex justify-content-center bg-success bg-gradient shadow-lg p-5 rounded text-white" >

        <div className='row'>
          <div className='col-12'>
            <Convertor
              currencylist={currencylist}
              selectedcurrency={fromcurrency}
              onChangecurrency={(e) => setFromcurrency(e.target.value)}
              amount={fromAmount}
              onChangeamount={handleFromamountchange}
            />
          </div>
          <div className='col-12'>
            <Convertor
              currencylist={currencylist}
              selectedcurrency={tocurrency}
              onChangecurrency={(e) => setTocurrency(e.target.value)}
              amount={toAmount}
              onChangeamount={handleToamountchange}
            />

          </div>
          <div className='col-12'>
            <h4>{fromAmount} {fromcurrency} = {toAmount} {tocurrency}</h4>
          </div>
        </div>

      </div>

    </>
  );
}

export default App;
