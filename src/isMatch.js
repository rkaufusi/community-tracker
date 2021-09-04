import React from 'react'

const isMatch = (name) => {
    let temp = 0;
    nameData.map((val) => {
        if(name === val.name){
          urlReddit = `https://www.reddit.com/r/${val.searchTerm}/about.json`;
          console.log("SEARCH TERM " + val.searchTerm);
          temp++;
        }
    })
    if(temp === 0){
      urlReddit = `https://www.reddit.com/r/${name}/about.json`;
    }
    redditExternal = urlReddit.slice(0, -11);
    return (
        <div>
            
        </div>
    )
}

export default isMatch

/*
const isMatch = (name) => {
  let temp = 0;
  nameData.map((val) => {
      if(name === val.name){
        urlReddit = `https://www.reddit.com/r/${val.searchTerm}/about.json`;
        console.log("SEARCH TERM " + val.searchTerm);
        temp++;
      }
  })
  if(temp === 0){
    urlReddit = `https://www.reddit.com/r/${name}/about.json`;
  }
  redditExternal = urlReddit.slice(0, -11);
}
*/
