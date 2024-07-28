import AppointmentsForm from "../../components/AppointmentForm/AppointmentForm";


export default function AppointmentsPage() {
    return (
        <main className="gap-4 min-h-screen">
            <div className="flex flex-row p-4 h-14">
                <img src="./images/Icon.svg" alt="" />
                <span className="pl-4">Agendar citas</span>
            </div>
            <div className="min-h-screen">
                <AppointmentsForm />
            </div>
        </main>
    )
}