import { useDispatch, useSelector } from 'react-redux'
// import Swal from 'sweetalert2'
// import { useNavigate } from 'react-router-dom'

// import { pageApi } from '../api/PageApi'
import { onChecking } from '../store/auth/authSlice'
import axios from 'axios'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()


  // const navigateTo = useNavigate()


  const startRegister = async User => {
    dispatch(onChecking())
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register-doctor`, {

        ...User,
      })
      console.log(User)
      console.log(data)
      // localStorage.setItem('token', data.token)
      // localStorage.setItem('token-init-date', new Date().getTime())
      // dispatch(onLogin({ name: data.user.name, uid: data.user.id }))
      console.log('Usuario creado correctamente', 'success')
      // Swal.fire('Usuario correctamente registrado!')
      // navigateTo(`/dashboard`)
    } catch (error) {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: error.response.data?.details
      // })
      console.log('Error al crear usuario', error.message)
      // dispatch(onLogout(error.response.data?.msg || 'add valid email or password'))
      // setTimeout(() => {
      //   dispatch(clearErrorMessage())
      // }, 10)
    }
  }



  return {
    status,
    user,
    errorMessage,

    startRegister,


  }
}

