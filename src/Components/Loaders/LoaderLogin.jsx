import React from 'react'
import { PulseLoader } from 'react-spinners'
import RedLogo from '../../Assets/Images/RedLogo'

const LoaderLogin = ({ mt = 32 }) => {
       return (
              <>
                     <div className={`w-full h-full flex flex-col justify-start mt-${mt} items-center`}>
                            <RedLogo width={250} height={250} />
                            <PulseLoader color='#9E090F' size={20} />
                     </div>
              </>
       )
}

export default LoaderLogin