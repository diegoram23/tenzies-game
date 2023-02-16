import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
   const allHeld = dice.every(die => die.isHeld)
   const allEqual = dice => dice.every(die => dice[0])

   if (allHeld && allEqual){
    console.log('You won')
    setTenzies(true)
   }
  },[dice])
//----------------Generates a single new die--------------//
  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  //----------------Generates an array of 10 random dice numbers--------------//
  function allNewDice() {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      //------Object is pushed into diceArray with values representing each die-----//
      diceArray.push(generateNewDie())
    }
    return diceArray
  }

  //----------------Maps over each array element--------------//
  const diceElements = dice.map(die => {
    return <Die
      key={die.id}
      id={die.id}
      handleClick={() => holdDice(die.id)}
      value={die.value}
      isHeld={die.isHeld}
    />
  })

  //----------------Flips boolean of die(isHeld) resulting in color change--------------//
  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }


  function newGame(){
    setDice(allNewDice())
    setTenzies(false)
  }
  //----------------Generates random dice numbers if isHeld is false--------------//
  function rollDice() {
    //----------------Maintains isHeld state of previous die--------------//
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }))
  }


  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at
        its current value between rolls.
      </p>
      <div className='dice--container'>
        {diceElements}
      </div>
      <button onClick={tenzies ? newGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

