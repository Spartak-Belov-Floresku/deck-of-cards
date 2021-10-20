import {useState, useEffect } from "react";
import axios from "axios";
import Deck from "./Deck";

const BASE_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/";

const DeckCards = () => {

    const [deck, setDeck] = useState(null);
    const [cardsVisible, setDeckVisible] = useState(false)

    useEffect(() => {
        async function getDeck(){
            const result = await axios.post(BASE_URL);
            setDeck(result.data);
        }
        getDeck();
    }, []);

    const toggleVisible = () => {
        setDeckVisible(!cardsVisible);
        document.getElementById("btn").innerHTML = !cardsVisible? "STOP DRAWING!": "START DRAWING!";
    }

    return(
        <div id="DeckCards">
            <button id="btn" onClick={toggleVisible}>START DRAWING!</button>
            {cardsVisible && <Deck deck_id={deck.deck_id}/>}
        </div>
    );
};

export default DeckCards;