import { useRef, useState } from 'react'
import LoginBackground from '../../Assets/Images/LoginBackground'
import { PasswordInput, TextInput } from '../../Components/Components'
import UploadInput from '../../Components/Inputs/UploadInput'

const LoginPage = () => {
  const inputRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  return (
    <>
      <div className="w-full flex items-center justify-center mx-auto h-screen overflow-hidden">
        <div className="w-11/12 flex items-start justify-between h-5/6">

          <div className="sm:w-full xl:w-2/4 flex items-start justify-start bg-red-300 h-full">

            <div className="flex flex-col items-start justify-center gap-y-2">
              <span className='text-2xl font-TextFontMedium text-secoundColor'>Login to Food 2go</span>
              <span className='text-2xl font-TextFontMedium text-secoundColor'>welcome back</span>
            </div>
            <div className="">
              <TextInput
                value={email}
                placeholder={'Email'}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                value={password}
                placeholder={'Password'}
                onChange={(e) => setPassword(e.target.value)}
              />

              <UploadInput
                upload={true}
                placeholder="Demo Video"
                value={email}
                readonly={true}
                onClick={() => { }}
                handleFileChange={() => { }}
                uploadFileRef={inputRef}
              />
            </div>

          </div>

          <div className="sm:hidden xl:flex w-2/4  items-center justify-center bg-red-500 h-full">
            <LoginBackground height='100%' />
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage