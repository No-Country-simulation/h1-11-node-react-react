import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select'


export default function AppointmentsForm() {
    const [isPresential, setIsPresential] = useState(true);

    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            especiality: { value: 1, label: 'Cardiología' },
            doctor: { value: 1, label: 'María García' },
            description: "",
            date: "",
            startTime: "",
            endTime: "",

        },
        mode: "onSubmit"
    });
    function agendarCita(params) {
        console.log("se agendo con exito la siguiente cita:");
        console.log(params);
    }
    const onSubmit = handleSubmit((data) => {
        //mando los datos al back para que confirmen la cita
        console.log(data);
        agendarCita({
            patientId: "1",
            doctorId: data.doctor.value,
            description: "",
            date: "",
            startTime: "",
            endTime: "",
            especiality: data.especiality.value,
            state: "",
        })
    });

    const especialidadesMedicas = [
        { id: 1, nombre: 'Cardiología' },
        { id: 2, nombre: 'Dermatología' },
        { id: 3, nombre: 'Gastroenterología' },
        { id: 4, nombre: 'Neurología' },
        { id: 5, nombre: 'Oftalmología' },
        { id: 6, nombre: 'Pediatría' },
        { id: 7, nombre: 'Psiquiatría' },
        { id: 8, nombre: 'Traumatología' },
        { id: 9, nombre: 'Urología' },
        // Puedes agregar más especialidades médicas según sea necesario
    ].map((opciones) => ({ value: opciones.id, label: opciones.nombre }));

    /**
     * const especialidadesMedicas = [
  { value: 1, label: 'Cardiología' },
  { value: 2, label: 'Dermatología' },
  { value: 3, label: 'Gastroenterología' },
  { value: 4, label: 'Neurología' },
  { value: 5, label: 'Oftalmología' },
  { value: 6, label: 'Pediatría' },
  { value: 7, label: 'Psiquiatría' },
  { value: 8, label: 'Traumatología' },
  { value: 9, label: 'Urología' },
  // Puedes agregar más especialidades médicas según sea necesario
];
     * 
     */


    const medicos = [
        { value: 1, label: 'María García' },
        { value: 2, label: 'Juan Pérez' },
        { value: 3, label: 'Laura Martínez' },
        { value: 4, label: 'Carlos Rodríguez' },
        { value: 5, label: 'Ana López' },
        { value: 6, label: 'Pedro Sánchez' },
        { value: 7, label: 'Sofía Fernández' },
        { value: 8, label: 'Diego González' },
        { value: 9, label: 'Elena Ramírez' },
        // Puedes agregar más nombres inventados según sea necesario
    ];

    const handlePresentialChange = () => {
        setIsPresential(!isPresential);
    }


    return (
        <form onSubmit={onSubmit} className="min-h-screen h-auto w-auto max-w-96 pl-4 p-5">

            <label > 1. Seleccione la especialidad</label>
            <div className="py-5">
                <Controller
                    name="especiality"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={especialidadesMedicas}
                        />
                    )}
                />

            </div>

            <label> 2. Seleccione al médico</label>
            <div className="py-5">
                <Controller
                    name="doctor"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={medicos}
                        />
                    )}
                />
            </div>

            <label> 3. Seleccione el tipo de cita</label>
            <div className="flex flex-col items-center p-4 justify-start gap-4">
                <div className="flex flex-row justify-start w-full">

                    <input
                        className="h-auto flex bg-white min-w-6 "
                        type="checkbox"
                        checked={isPresential}
                        onChange={handlePresentialChange}
                    />

                    <label >
                        Presencial
                    </label>
                </div>
                <div className="flex flex-row justify-start w-full">
                    <input
                        className="h-auto flex bg-white min-w-6 "
                        type="checkbox"
                        checked={!isPresential}
                        onChange={handlePresentialChange}
                    />
                    <label>
                        Virtual
                    </label>
                </div>
            </div>

            <label> 4. Preguntas pre-cita </label>
            <div className="py-5">
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <input placeholder="¿Cuales son tus síntomas?" {...field} />}
                />
            </div>

            <label > 5. Días disponibles</label>
            <div className="py-5">Aca va el calendario</div>

            <button className="w-full"> Reservar</button>

        </form>
    );
}