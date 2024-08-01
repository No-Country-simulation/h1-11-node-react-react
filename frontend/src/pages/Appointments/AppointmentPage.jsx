import { useNavigate } from "react-router-dom";
import AppointmentsForm from "../../components/AppointmentForm/AppointmentForm";


export default function AppointmentsPage() {
    const navigate = useNavigate();

    const handlerEvent = () => {
        navigate("/home")
    }

    return (
        <main className="gap-4 min-h-screen">
            <div onClick={handlerEvent} className="flex flex-row p-4 h-14">
                <img src="./images/Icon.svg" alt="" />
                <span className="pl-4">Agendar citas</span>
            </div>
            <div className="min-h-screen min-w-max flex justify-center items-center">
                <AppointmentsForm />
            </div>
        </main>
    )
}