import { useNavigate } from "react-router-dom";
import RecipesForm from "../../components/RecipesForm/RecipesForm";

export default function RecipesPage() {

    const navigate = useNavigate();

    const handlerEvent = () => {
        navigate("/home")
    }

    return (
        <main className="gap-4 min-h-screen">
            <div onClick={handlerEvent} className="flex flex-row p-4 h-14">
                <img src="./images/Icon.svg" alt="" />
                <span className="pl-4">Atrás</span>
            </div>
            <div className="min-h-screen min-w-max flex justify-center items-center">
                <RecipesForm />
            </div>
        </main>
    )
}