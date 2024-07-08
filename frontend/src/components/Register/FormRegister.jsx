import { useForm } from 'react-hook-form'
import { useAuthStore } from '../../hooks/useAuthStore'

// "name":"Diego",
// "lastName": "Garay",
// "password": "Abc123",
// "email": "diegogaraycullas@gmail.com",
// "birthdate": "02/10/1987",
// "dni": "12345678",
// "sex": "M",
// "bloodFactor": "O+"


export default function FormRegister() {
  const { startRegister } = useAuthStore()

  const {
    // register,
    handleSubmit,
    // formState: { errors },
    // watch,
    reset
  } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      birthdate:'',
      email: '',
      dni:'',
      bloodFactor:'',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange'
  })

  const onSubmit = handleSubmit(data => {

    startRegister({
        companyName: data.companyName,
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      })
      console.log(data)
    reset()
  })



  return (
    <form
    onSubmit={onSubmit} className="flex flex-col items-center justify-center w-full mb-16 text-blue">
      <label htmlFor="name">Nombres</label>
      <div className="w-full input-container">
        <input
          className="w-full textField"
          type="text"
          id="name"
          name="name"
        />
      </div>

      <label htmlFor="lastName">Apellidos</label>
      <div className="w-full input-container">
        <input
          className="w-full textField"
          type="text"
          id="lastName"
          name="lastName"
        />
      </div>

      <label htmlFor="email">Correo electronico</label>
      <div className="w-full input-container">
        <input
          className="w-full textField"
          type="email"
          id="email"
          name="email"
        />
      </div>
      <label htmlFor="phone">Telefono</label>
      <div className="w-full input-container">
        <input className="w-full textField" type="tel" id="phone" name="phone" />
      </div>
      <label htmlFor="dni">DNI</label>
      <div className="w-full input-container">
        <input className="w-full textField" type="number" id="dni" name="dni" />
      </div>

      <label htmlFor="password">Contraseña</label>
      <div className="w-full input-container">
        <input className="w-full textField" type="password" id="password" />
      </div>

      <label htmlFor="password">Confirmar contraseña</label>
      <div className="w-full input-container">
        <input
          className="w-full textField"
          type="password"
          id="confirmPassword"
        />
      </div>

      <button type="submit" className="block w-full mt-8 btn btn-template-1">
        Registrarme
      </button>
      <button className="block w-full mt-4 btn btn-template-1">
        Iniciar Sesión
      </button>
    </form>
  );
}
