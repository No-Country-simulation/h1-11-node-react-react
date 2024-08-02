import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import { especialidadesMedicas, horarios, medicos } from "../../utils/select";

export default function AppointmentsForm() {
    const [isPresential, setIsPresential] = useState(true);

    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            especiality: { value: 1, label: 'Cardiología' },
            doctor: { value: 1, label: 'María García' },
            description: "",
            date: null,
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
            description: data.description,
            date: format(new Date(data.date), "yyyy-MM-dd"),
            startTime: "",
            endTime: "",
            especiality: data.especiality.value,
            state: "",
        })
    });
    const handlePresentialChange = () => {
        setIsPresential(!isPresential);
    }


    return (
        <form onSubmit={onSubmit} className="flex flex-col items-center min-w-screen min-h-screen h-auto w-auto max-w-96 py-5">

            <label className="w-full" > 1. Seleccione la especialidad</label>
            <div className="py-5 w-full">
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

            <label className="w-full"> 2. Seleccione al médico</label>
            <div className="py-5 w-full">
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

            <label className="w-full"> 3. Seleccione el tipo de cita</label>
            <div className="flex flex-col w-full items-center p-4 justify-start gap-4">
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

            <label className="w-full"> 4. Motivos de la cita </label>
            <div className="py-5">
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <input placeholder="Ej:¿Cuales son tus síntomas?" {...field} />}
                />
            </div>

            <label className="w-full" > 5. Días disponibles</label>

            <div className="flex w-full py-5">
                {/* componente Calendario */}
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "yyyy-MM-dd") : <span>Ingrese una fecha</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">

                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                    minDate={new Date()}
                                />

                            </PopoverContent>
                        </Popover>)}
                />
            </div>

            <label className="w-full"> 6. Seleccione el horario</label>
            <div className="py-5 w-full">
                <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={horarios}
                            placeholder={"Horarios disponibles"}
                        />
                    )}
                />
            </div>

            <Button className="w-full text-white" variant="default" size="lg"> Reservar</Button>

        </form>
    );
}