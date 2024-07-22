import { useForm } from "react-hook-form";
import { useAuthStore } from "../../hooks/useAuthStore";
import { DateInputRegister } from "./dateInputRegister";
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
    formState: { errors },
    // watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      address: "",
      email: "",
      dni: "",
      sex: "",
    },
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    startRegister({
      name: data.name,
      lastName: data.lastName,
      address: data.address,
      email: data.email,
      dni: data.dni,
      phone: data.phone,
      province: data.province,
      location: data.location,
      license: data.license,
      sex: data.sex,
      especiality: data.especiality,
    });
    reset();
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center w-full mb-16 gap-6"
    >
      {/* Name{-----------------------------------------------------------------------------------------------------------} */}
      <div className="w-full">
        <input
          placeholder={DateInputRegister[0].placeholder}
          id={DateInputRegister[0].name}
          {...register(DateInputRegister[0].name, {
            ...DateInputRegister[0].validate
          })}
        />
        {errors[DateInputRegister[0].name] && <p className='text-red-600'>{errors[DateInputRegister[0].name].message}</p>}
      </div>

      {/* lastName{-----------------------------------------------------------------------------------------------------------} */}
      <div className="w-full">
        <input
          placeholder={DateInputRegister[1].placeholder}
          {...register(DateInputRegister[1].name, {
            ...DateInputRegister[1].validate
          })}
          id={DateInputRegister[1].name} />
        {errors[DateInputRegister[1].name] && <p className='text-red-600'>{errors[DateInputRegister[1].name].message}</p>}
      </div>


      {/* address{-----------------------------------------------------------------------------------------------------------} */}
      <div className="w-full ">
        <input
          placeholder="Domicilio completo"
          {...register('address', {
            required: {
              value: true,
              message: 'Debe ser un dirección valida'
            },
          })}

          type="text"
          id="address"
          name="address"
        />
        {errors.address && <p className='text-red-600'>{errors.address.message}</p>}
      </div>

      {/* email{-----------------------------------------------------------------------------------------------------------} */}

      <div className="flex flex-col w-full">
        <input
          placeholder='Correo electrónico'
          {...register('email', {
            required: {
              value: true,
              message: 'El correo electrónico es obligatorio'
            }
          })}
          type="email"
          id="email"
          name="email"
        />
        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}

      </div>

      {/* DNI{-----------------------------------------------------------------------------------------------------------} */}

      <div className="flex flex-col w-full ">
        <input
          {...register('dni', {
            required: {
              value: true,
              message: 'El DNI es obligatorio'
            }
          })}
          placeholder="DNI"
          type="number"
          id="dni"
          name="dni"
        />
        {errors.dni && <p className='text-red-600'>{errors.dni.message}</p>}
      </div>
      {/* sex{-----------------------------------------------------------------------------------------------------------} */}

      <div className="w-full input-container">
        <input
          {...register('sex', {
            required: {
              value: true,
              message: 'El sexo es obligatorio.'
            }

          })}
          placeholder="SEXO"
          type="text"
          id="sex"
          name="sex"
        />
        {errors.sex && <p className='text-red-600'>{errors.sex.message}</p>}
      </div>

      <button type="submit" className="block w-full mt-8 btn btn-template-1">
        Continuar Registro
      </button>
    </form>
  );
}
