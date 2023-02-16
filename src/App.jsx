import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())

  //----------------Generates an array of 10 random dice numbers--------------//
  function allNewDice() {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      //------Object is pushed into diceArray with values representing each die-----//
      diceArray.push({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid()
      })
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



  //----------------Generates random dice numbers if isHeld is false--------------//
  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
  //----------------Maintains isHeld state of previous die--------------//
      return die.isHeld ? { ...die } :
        {
          value: Math.floor(Math.random() * 6 + 1),
          isHeld: false,
          id: nanoid()
        }
    }))
  }


  return (
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at
        its current value between rolls.
      </p>
      <div className='dice--container'>
        {diceElements}
      </div>
      <button onClick={rollDice}>Roll</button>
    </main>
  )
}

