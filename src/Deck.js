import {useState, useEffect} from "react";
import axios from "axios";

import Card from "./Card";


const Deck = ({deck_id}) => {

    const [cards, setCard] = useState([]);
    
    useEffect(() => {
        const intervalId = setInterval(async () => {
            const result = await axios.post(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
            if(result.data.success){
                let temp = [...cards];
                temp.push(result.data.cards[0])
                setCard(temp);
            }else{
                clearInterval(intervalId);
                document.getElementById("btn").innerHTML = "NO CARDS!"
                document.getElementById("btn").setAttribute("disabled", "");  
            }
        },1000);

        return () => {clearInterval(intervalId)}
    },[])

    return(
        <div>
            {cards.map((img,i) => <Card image={img.image} key={i} alt={img.name}/>)}
        </div>
    );


}

export default Deck;