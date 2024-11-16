import React from 'react'
import { useSelector } from 'react-redux'

const HomePage = () => {
       const userName = useSelector(state => state.user.name)
       return (
              <>
                     <strong>{userName || 'asada'}</strong>
                     <div>Home Page</div>
              </>
       )
}

export default HomePage