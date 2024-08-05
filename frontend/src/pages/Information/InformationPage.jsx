import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function InformationPage() {

    return (
        <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
            <div className="w-80 flex flex-col item-center">
                <img src="/images/Espera.png" alt="espera" />
                <p className="py-5 font-bold text-xl">Por favor espere a que le llegue un mail con la contraseña y presione continuar para acceder con su correo y contraseña</p>
                <Button className="flex justify-center w-full">
                    <Link to={"/"}>Ingresar</Link>
                </Button>

            </div>
        </div>
    )
}