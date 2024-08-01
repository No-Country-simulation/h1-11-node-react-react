import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function HomePage() {

    return (
        <div className="flex flex-col flex-wrap items-center h-auto min-h-screen w-full">
            <div className="bg-white lg:w-96 m-4 w-80 min-h-56 rounded-xl flex items-center justify-center">

                <img className="rounded-xl" src="./images/RectangleFondo.jpg" alt="" />

                <Link to={"/profile"} className="absolute ">Perfil</Link>
            </div>
            <div className="bg-white m-4 lg:w-96 w-80 h-auto rounded-xl flex flex-col items-center gap-6">
                <img className="mt-6" src="./images/calendar.png" alt="Calendario" />
                <span>Citas medicas</span>
                <span>Aquí podrás agendar tus citas medicas.</span>
                <Button className="w-full" variant="primary" size="lg">
                    <Link to={"/appointments"}>
                        Agendar cita
                    </Link>
                </Button>
            </div>
            <div className="bg-white lg:w-96 m-4 w-80 h-auto rounded-xl flex flex-col items-center gap-6">
                <img className="mt-6" src="./images/Tests.png" alt="Historial" />
                <span>Historial</span>
                <p className="pl-2">Aquí podrás ver el registro de tus recetas medicas</p>
                <Button className="w-full" variant="primary" size="lg">
                    <Link to={"/recipes"}>
                        Ver historial
                    </Link>
                </Button>
            </div>
        </div>
    )
}