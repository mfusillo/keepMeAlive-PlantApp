import React, {useState} from 'react';
import SelectPlant from '../components/keepMeAliveComponents/SelectPlant.js';
import NewUser from '../components/keepMeAliveComponents/NewUser.js'

const HomeContainer = ({plants}) => {

  const [, setIsIdPresent] = useState(false)

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