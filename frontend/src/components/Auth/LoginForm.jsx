import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';

const LoginForm = () => {

  const navigate = useNavigate();

  const { startLogin } = useAuthStore();

  const { register, handleSubmit, formState: { errors }, reset, } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: 'onChange'
  });

  const onSubmit = handleSubmit((data) => {
    startLogin(data);
    reset();
  });

  return (
    <form className="flex flex-col items-center justify-center w-full mb-16 gap-6 " onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col'>
        <input
          placeholder='Correo electrónico'
          id='email'
          name='email'
          {...register('email', {
            required: {
              value: true,
              message: 'El correo electrónico es obligatorio'
            }
          })}
        />
        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
      </div>

      <div className='flex flex-col'>
        <input
          id="password"
          type="password"
          placeholder='Contraseña'
          {...register('password', { required: true })}
        />
        {errors.password && <span className='text-red-600'>La contraseña es requerida</span>}
      </div>
      <span className='flex w-full justify-end'>¿Olvidaste tu contraseña?</span>
      <div className='w-56 h-24 flex flex-col items-center'>
        <button type="submit">Ingresar</button>
        <div className='flex flex-row h-full items-end'>
          <span>¿No tienes cuenta?</span>
          <Link to="/register" className=' text-fuchsia-600'>Regístrate</Link>
        </div>
      </div>

    </form>
  );
};

export default LoginForm;