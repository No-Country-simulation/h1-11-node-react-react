import { useForm } from "react-hook-form";
import { useAuthStore } from "../../hooks/useAuthStore";
import { DateInputRegister } from "./dateInputRegister";
import { useState } from "react";

export default function FormRegister() {
  const [currentGroup, setCurrentGroup] = useState(0);
  const isDisabled = currentGroup === 0;
  // const [selected, setSelected] = useState('')
  const { startRegister } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    //reset,
  } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      address: "",
      email: "",
      dni: "",
      phone: "",
      province: "",
      location: "",
      license: "",
      sex: "",
      especiality: "",
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
    //reset();
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center w-full mb-16 gap-6"
    >
      {
        DateInputRegister[currentGroup] && DateInputRegister[currentGroup]?.map((inputName) => {
          return (
            <div key={inputName.name} className="flex flex-col">
              <input
                placeholder={inputName.placeholder}
                id={inputName.name}
                {...register(inputName.name, {
                  ...inputName.validate
                })}
              />
              {errors[inputName.name] && <p className='text-red-600'>{errors[inputName.name].message}</p>}
            </div>
          )
        })
      }
      {currentGroup < DateInputRegister.length - 1 ?
        <div className="flex flex-row">
          <button type="submit" className="w- mt-8" disabled={isDisabled} onClick={() => setCurrentGroup(currentGroup - 1)}>
            Atrás
          </button>
          <button type="submit" className="w- mt-8" onClick={() => setCurrentGroup(currentGroup + 1)}>
            Continuar
          </button>
        </div>
        :
        <div className="flex flex-col">
          <button type="submit" className="w- mt-8">
            Registrarme
          </button>
        </div>
      }
    </form>
  );
}
