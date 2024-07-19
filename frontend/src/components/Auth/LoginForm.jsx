import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form className="flex flex-col items-center justify-center w-full mb-16 gap-6 " onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('Mail', { required: true })}
        />
        {errors.username && <span>This field is required</span>}
      </div>

      <div>
        <input
          id="password"
          type="password"
          {...register('password', { required: true })}
        />
        {errors.password && <span>This field is required</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;