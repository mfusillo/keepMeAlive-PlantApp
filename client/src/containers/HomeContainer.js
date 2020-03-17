import React, {useState, useEffect} from 'react';
import SelectPlant from '../components/keepMeAliveComponents/SelectPlant.js';
import NewUser from '../components/keepMeAliveComponents/NewUser.js'

const HomeContainer = ({fetchAllPlayers, plants}) => {

  const [isIdPresent, setIsIdPresent] = useState(false)

  useEffect(fetchAllPlayers, [])
  
  const checkPlayerIdIsInLocalStorage = (id) => {
 
    if (parseInt(id) === parseInt(localStorage.getItem('playerId'))) { 
      return <SelectPlant plants={plants}/>
    } else {
      return <NewUser 
        changeIsIdPresent={setIsIdPresent}
      />
    }
  }

  return (
    <>
      {checkPlayerIdIsInLocalStorage(localStorage.getItem('playerId'))}
    </>
  )

}

export default HomeContainer