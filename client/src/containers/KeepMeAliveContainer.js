import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PlantInfo from '../components/keepMeAliveComponents/PlantInfo.js';
import GameContainer from './GameContainer.js';
import SiteHeader from '../components/keepMeAliveComponents/SiteHeader.js';
import HomeContainer from './HomeContainer.js'

const KeepMeAliveContainer = (props) => {

  const [plants, setPlants] = useState([])
  const [players, setPlayers] = useState([])
  const [isIdPresent, setIsIdPresent] = useState(false)


  useEffect(() => {
    fetch('http://localhost:8080/plants')
      .then(response => response.json())
      .then(plantsObject => plantsObject._embedded.plants)
      .then(plantsArray => setPlants(plantsArray))
      .catch(err => console.error)

    fetchAllPlayers()
  }, [])

  useEffect(() => fetchAllPlayers(), [isIdPresent])

  const fetchAllPlayers = () => {
      fetch('http://localhost:8080/players')
      .then(response => response.json())
      .then(playersObject => playersObject._embedded.players)
      .then(playersArray => setPlayers(playersArray))
      .catch(err => console.error)
  }

  const isPlayerIdInLocalstorage = () => {
    return players.some(player => player.id === parseInt(localStorage.getItem('playerId')))
  }

  if(!players.length){
    return null
  }

  return (
    <>
      <Router>
      <SiteHeader/>
        <Switch>
          <Route exact path="/"
            render={() =>
            <HomeContainer setIsIdPresent={setIsIdPresent}
            plants={plants} 
            />}
          />
          <Route exact path="/:plantId/game" render={() => isPlayerIdInLocalstorage() ? <GameContainer  /> : <Redirect to="/" />} />
          <Route exact path="/:plantId" render={() => isPlayerIdInLocalstorage() ? <PlantInfo plants={plants}/> : <Redirect to="/" />} />
        </Switch>
      </Router>

    </>
  )


}



export default KeepMeAliveContainer;
