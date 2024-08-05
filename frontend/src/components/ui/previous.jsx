import { useNavigate } from "react-router-dom";

export default function Previous() {
    const navigate = useNavigate();

    const handlerEvent = () => {
        navigate("/home")
    }

    return (
        <div onClick={handlerEvent} className="flex flex-row p-4 h-14">
            <img src="./images/Icon.svg" alt="" />
            <span className="pl-4">Atrás</span>
        </div>
    )
}