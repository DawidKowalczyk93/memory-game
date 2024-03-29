import './App.css';
import {useEffect, useState} from "react";
import SingleCard from "./components/SingleCard";
import soundMatched from "./sound/win_success_2.wav"

const cardImages = [
    {"src": "/img/paper.png", matched: false},
    {"src": "/img/potion-1.png", matched: false},
    {"src": "/img/hat.png", matched: false},
    {"src": "/img/plant.png", matched: false},
    {"src": "/img/chest.png", matched: false},
    {"src": "/img/potion-2.png", matched: false}
]

function App() {

    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards);
        setTurns(0)
    }

    //handle a choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const playSoundMatched = () => {
        new Audio(soundMatched).play()
    }

    useEffect(() => {

        if(choiceOne && choiceTwo) {
            setDisabled(true)
            if(choiceOne.src === choiceTwo.src) {
                setCards( prevCards => {
                    return prevCards.map( card => {
                        if(card.src === choiceOne.src) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                playSoundMatched();
                resetTurn();
            } else {
                setTimeout(() => resetTurn() , 1000)
            }
        }

    }, [choiceOne, choiceTwo])
    console.log(cards)

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurn => prevTurn + 1)
        setDisabled(false)
    }
    // start game automatically
    useEffect(() => {
        shuffleCards()
    }, [])

    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>

            <div className="card-grid">
                {cards.map( card => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ) )}
            </div>
            <p>Turns: {turns}</p>

        </div>

    );
}

export default App;
