import React, { useState } from 'react';
import '../style/wiki.css'

const Wiki = () => {
    const [wikiText,setWikiText]=useState([]);
    const [wikiLink,setWikiLink]=useState([]);


    const apiCall=(str)=>{
        if(str){
            fetch(`https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=opensearch&search=${str}`)
            .then(data=>{return data.json();
            })
            .then(resData=>{
                console.log(resData);
                setWikiLink(()=>resData[3]);
                setWikiText(()=>resData[1]);
            })
        }
        else{
            setWikiLink(()=>[]);
            setWikiText(()=>[]);
        }
        
    }

    let timer;
    function debounce(e){
        clearTimeout(timer);
        timer=setTimeout(()=>{
            apiCall(e.target.value);
            timer=undefined;
        },500);
    }
    return (
        <div className="mainContainer">
            <div className="box">
                <div className="inputContainer">
                    <div className="heading">Wiki Link Search App</div>
                    <h3 className="h3">Search Anything</h3>
    
                    <input type="text" className="inputBox" onChange={debounce}/>
                </div>
                <div className="wikiText">
                {
                    wikiText && wikiText.map((item, index) => 
                        <>
                        <a className="alllinks" href={wikiLink[index]} target="_blank">{item}</a>
                        <br/>
                        </>
                    )
                }
                </div>
            </div>
        </div>
    );
};

export default Wiki;