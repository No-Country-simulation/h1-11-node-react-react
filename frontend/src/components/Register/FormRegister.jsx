import { useForm } from "react-hook-form";
import { useAuthStore } from "../../hooks/useAuthStore";
// import { useState } from "react";

// {
//   "name":"Diego",
//   "lastName": "Garay",
//   "password": "Abc123",
//   "email": "diegogaraycullaas@gmail.com",
//   "birthdate": "02/10/1987",
//   "dni": "12345675",
//   "sex": "M",
//   "bloodFactor": "O+"
// }

export default function FormRegister() {
  // const [selected, setSelected] = useState('')
  const { startRegister } = useAuthStore();

  const {
    register,
    handleSubmit,
    // formState: { errors },
    // watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      password: "",
      birthdate: "",
      email: "",
      dni: "",
      sex: "",
      bloodFactor: "",
      // confirmPassword: '',
    },
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    startRegister({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      birthdate:data.birthdate,
      dni: data.dni,
      sex: data.sex,
      bloodFactor:data.bloodFactor,
    });
    console.log(data);
    reset();
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center w-full mb-16 text-blue"
    >

       {/* {-----------------------------------------------------------------------------------------------------------} */}
      <label htmlFor="name">Nombres</label>
      <div className="w-full input-container">
        <input
        {...register('name', {
          required: {
            value: true,
            message: 'El nombre de la empresa es obligatorio.'
          },
          minLength: {
            value: 2,
            message: 'El nombre de la empresa no es válido.'
          },
          maxLength: {
            value: 50,
            message: 'El nombre de la empresa no es válido.'
          }
        })}
          // placeholder={selected == 'name' ? '' : 'Nombre de la empresa...'}
        className="w-full textField" type="text" id="name" name="name" />
      </div>

       {/* {-----------------------------------------------------------------------------------------------------------} */}

      <label htmlFor="lastName">Apellidos</label>
      <div className="w-full input-container">
        <input
          {...register('lastName', {
            required: {
              value: true,
              message: 'El nombre de la empresa es obligatorio.'
            },
            minLength: {
              value: 2,
              message: 'El nombre de la empresa no es válido.'
            },
            maxLength: {
              value: 50,
              message: 'El nombre de la empresa no es válido.'
            }
          })}
          className="w-full textField"
          type="text"
          id="lastName"
          name="lastName"
        />
      </div>



      <label htmlFor="sex">sex</label>
      <div className="w-full input-container">
        <input
          {...register('sex', {
            required: {
              value: true,
              message: 'El nombre de la empresa es obligatorio.'
            }
           
          })}
          className="w-full textField"
          type="text"
          id="sex"
          name="sex"
        />
      </div>

       {/* {-----------------------------------------------------------------------------------------------------------} */}

      <label htmlFor="email">Correo electronico</label>
      <div className="w-full input-container">
        <input
           {...register('email', {
            required: {
              value: true,
              message: 'El correo electrónico es obligatorio'
            }
          })}
          className="w-full textField"
          type="email"
          id="email"
          name="email"
        />
      </div>

       {/* {-----------------------------------------------------------------------------------------------------------} */}
 
      <label htmlFor="dni">DNI</label>
      <div className="w-full input-container">
        <input
         {...register('dni', {
          required: {
            value: true,
            message: 'El correo electrónico es obligatorio'
          }
        })}
          className="w-full textField"
          type="number"
          id="dni"
          name="dni"
        />
      </div>

       {/* {-----------------------------------------------------------------------------------------------------------} */}
      <label htmlFor="birthdate">Birthdate</label>
      <div className="w-full input-container">
        <input
         {...register('birthdate', {
          required: {
            value: true,
            message: 'El correo electrónico es obligatorio'
          }
        })}
         className="w-full textField" type="number" id="birthdate" name="birthdate" />
      </div>
       {/* {-----------------------------------------------------------------------------------------------------------} */}
       <label htmlFor="BloodFactor">BloodFactor</label>
      <div className="w-full input-container">
        <input 
          {...register('bloodFactor', {
            required: {
              value: true,
              message: 'El correo electrónico es obligatorio'
            }
          })} 
          className="w-full textField" type="text" id="bloodFactor" name="bloodFactor" />
      </div>
       {/* {-----------------------------------------------------------------------------------------------------------} */}

      <label htmlFor="password">Contraseña</label>
      <div className="w-full input-container">
        <input
       
        
        {...register('password', {
          required: {
            value: true,
            message: 'La contraseña es obligatoria'
          },
         
        })}className="w-full textField" type="password" id="password" />
      </div>

      {/* <label htmlFor="password">Confirmar contraseña</label>
      <div className="w-full input-container">
        <input
          className="w-full textField"
          type="password"
          id="confirmPassword"
        />
      </div> */}

      <button type="submit" className="block w-full mt-8 btn btn-template-1">
        Registrarme
      </button>
      {/* <button className="block w-full mt-4 btn btn-template-1">
        Iniciar Sesión
      </button> */}
    </form>
  );
}
