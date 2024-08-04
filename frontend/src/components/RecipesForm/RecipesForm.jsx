import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { especialidadesMedicas, medicamentosMasRecetados, medicos, obraSocial } from "../../utils/select";
import Select from 'react-select';

export default function RecipesForm() {

    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            prepaga: { value: 0, label: 'Otras' },
            doctor: { value: 1, label: 'María García' },
            especiality: { value: 1, label: 'Cardiología' },
            medicamento: { value: 1, label: 'Paracetamol' },
        },
        mode: "onSubmit"
    });

    function prescription(params) {
        console.log("se solicito con éxito la siguiente receta:");
        console.log(params);
    }

    const onSubmit = handleSubmit((data) => {
        //mando los datos al back para que confirmen la cita
        console.log(data);
        prescription({
            prepaga: data.prepaga.value,
            doctorId: data.doctor.value,
            especiality: data.especiality.value,
            medicamento: data.medicamento.value,
        })
    });

    return (
        <form onSubmit={onSubmit} className="flex flex-col items-center min-w-screen min-h-screen h-auto w-auto max-w-96 py-5">
            <h1>Solicitud de receta</h1>

            <label className="w-full" > 1. Seleccione la obra social</label>
            <div className="py-5 w-full">
                <Controller
                    name="prepagas"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={obraSocial}
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

            <label className="w-full" > 3. Seleccione la especialidad</label>
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
            <label className="w-full" > 4. Seleccione la especialidad</label>
            <div className="py-5 w-full">
                <Controller
                    name="medicamentos"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={medicamentosMasRecetados}
                        />
                    )}
                />

            </div>

            <Button className="w-full text-white" variant="default" size="lg"> Confirmar solicitud</Button>

        </form>
    );
}