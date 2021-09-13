import {React, useState, useEffect} from 'react'
import axios from 'axios';
import './info.css'
import data from './data.js';

const Info = () => {
 const [currency, setCurrency] = useState([]);
 const [modalOpen, setModalOpen] = useState(false);
 const [modal, setModal] = useState([]);
 const [nameData, setNameData] = useState(data);
 const [myLatestState, setMyLatestState] = useState([]);
 const [searchInput, setSearchInput] = useState('');
 const [amount, setAmount] = useState(10);

 let urlReddit;
 let redditExternal = '';

 const redditLogo = 'https://img.favpng.com/1/2/24/reddit-logo-youtube-png-favpng-Rukc5hsDFfci1sNk1LkFBccvW.jpg';
 const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

 const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

useEffect(()=> {
 axios.get(url).then((response) => {
     setCurrency(response.data);
 }).catch(error => console.log(error));
},[]);

const isMatch = (name) => {
  let temp = 0;
  nameData.map((val) => {
      if(name === val.name){
        urlReddit = `https://www.reddit.com/r/${val.searchTerm}/about.json`;
        temp++;
      }
  })
  if(temp === 0){
    urlReddit = `https://www.reddit.com/r/${name}/about.json`;
  }
  redditExternal = urlReddit.slice(0, -11);
}

const clicked = (name, market_rank, image, symbol, current_price, market_cap) => {
    isMatch(name);
    fetchReddit(); 
    
    setModal([name, market_rank, image, symbol, formatter.format(current_price), market_cap.toLocaleString("en-US"), redditExternal]);

    setModalOpen(true);
    urlReddit = '';
    redditExternal = '';
}

    const fetchReddit = async () => {
        try {
            const response = await fetch(urlReddit);
            const myData = await response.json();
            console.log(myData);
            console.log(myData.data.subscribers);
            setMyLatestState(myData.data.subscribers.toLocaleString("en-US"));      
        } catch (error) {
            console.log('try catch ' + error);
            setMyLatestState("No data");
        }
}

const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);
  setAmount(10);
};

const filteredCoins = currency.filter(coin => coin.name.toLowerCase().includes(searchInput.toLowerCase()));

const loadMore = () => {
  setAmount(amount + 10);
}
    return (
        <div className='background'>
          <div className='heading'>
            <h1>Crypto Community Tracker</h1>
            <input type='text' placeholder='search here' onChange={handleChange} value={searchInput} placeholder='Search'/>
          </div>
          
            {filteredCoins.slice(0, amount).map((val) => {
              return ( 
                <>
                  <div className='crypto-container clickable' onClick={ () => clicked(
                    val.name, 
                    val.market_cap_rank, 
                    val.image,
                    val.symbol,
                    val.current_price, 
                    val.market_cap
                    )
                    }>

                      <p className='crypto-row pad'>{val.market_cap_rank}</p>
                      <p className='crypto-row'>
                        <img className='crypto-img' src={val.image} alt={val.name}/>
                      </p>
                      <p className='crypto-row'>{val.name}</p>
                      <p className='crypto-row crypto-symbol'>{val.symbol}</p>
                      <p className='crypto-row'>{'Price: ' + formatter.format(val.current_price)}</p>
                      <p className='crypto-row'>{'Mkt Cap: ' + formatter.format(val.market_cap)}</p>
                        </div>                                          
                          {modalOpen && (
                            <div className='modal-overlay'>
                              <div className='modal-container'>
                                <p className='modal-row'>{modal[1]}</p>
                                <p className='modal-row'>{modal[0]}</p>
                                <p>
                                  <img className='crypto-img' src={modal[2]} alt={modal[0]}/>
                                </p>
                                <p className='crypto-symbol'>{modal[3]}</p>
                                <p>Price <br/> {modal[4]}</p>
                                <p>Market Cap <br/> {modal[5]}</p>
                                <p>Reddit subs <br/> {myLatestState}</p>
                                <p> Reddit <br/> 
                                  <a href={modal[6]} target='_blank'>
                                    <img className='crypto-img' src={redditLogo} alt='reddit'/>
                                  </a>
                                </p>
                                  <button className='close-modal-btn' onClick={() => setModalOpen(false)}>
                                    X
                                  </button>
                              </div>
                            </div>
                          )}                         
                  </>                 
                )               
            })}  
            <div className='heading'>
            {amount >= 100 || filteredCoins.length < amount ? <p>You've reached the end</p> : <button  onClick={() => loadMore()}>Load More</button>}
            </div>         
            
        </div> 
    )
}

export default Info;


