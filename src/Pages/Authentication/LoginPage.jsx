import { useEffect, useState } from 'react'
import { EmailInput, LoaderLogin, PasswordInput, SubmitButton } from '../../Components/Components'
import LoginBackground from '../../Assets/Images/LoginBackground'
import { useAuth } from '../../Context/Auth'
import { useNavigate } from 'react-router-dom'
import { usePost } from '../../Hooks/usePostJson'
import { useDispatch } from 'react-redux'
import { setUser } from '../../Store/CreateSlices'

const LoginPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { postData, loadingPost, response } = usePost({ url: 'https://bcknd.food2go.online/api/admin/auth/login' }); // Destructure as an object
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Use uppercase "D"

    if (!email) {
      auth.toastError("Please Enter The Email.");
      return;
    }
    if (!password) {
      auth.toastError("Please Enter The Password.");
      return;
    }
    const payload =
    {
      email,
      password
    }

    postData(payload); // Call postData with formData
  };

  useEffect(() => {
    if (response) {
      console.log('response', response)

      dispatch(setUser(response.data.admin))


      auth.login(response.data.admin)

      navigate("/dashboard", { replace: true });
    }
  }, [response])
  return (
    <>
      <form onSubmit={handleLogin} className="w-full flex items-center justify-center mx-auto h-screen overflow-hidden">
        <div className="w-11/12 flex items-start justify-between h-5/6">

          <div className="sm:w-full xl:w-5/12 flex flex-col items-start justify-start gap-y-8 h-full">

            {loadingPost ?
              (
                <>
                  <div className="w-full h-full"><LoaderLogin /></div>
                </>
              )
              : (
                <>
                  <div className="flex w-full  flex-col items-start justify-start gap-y-4">
                    <span className='sm:text-4xl xl:text-5xl font-TextFontRegular text-secoundColor'>Login to Food2go</span>
                    <span className='sm:text-4xl xl:text-5xl font-TextFontRegular text-secoundColor'>welcome back</span>
                  </div>
                  <div className="w-full flex flex-col justify-center gap-y-10 h-3/5">

                    <div className="w-full flex flex-col justify-center gap-y-6">

                      <div className="w-11/12 mx-auto">
                        <EmailInput
                          value={email}
                          required={false}
                          placeholder={'Email'}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="w-11/12 mx-auto">
                        <PasswordInput
                          value={password}
                          placeholder={'Password'}
                          required={false}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="w-11/12 mx-auto">
                      <SubmitButton text={'Login'} handleClick={handleLogin} />
                    </div>
                  </div>
                </>
              )}
          </div>

          <div className="sm:hidden xl:flex w-2/4  items-center justify-center h-full">
            <LoginBackground height='100%' />
          </div>
        </div>
      </form>
    </>
  )
}

export default LoginPage