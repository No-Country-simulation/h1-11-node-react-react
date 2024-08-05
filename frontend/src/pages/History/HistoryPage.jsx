import Previous from "../../components/ui/previous";
import { StickyNote } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../../components/ui/button";

export default function HistoryPage() {

    const TitleArchive = (props) => {
        const { title } = props;
        return (
            <div className="flex w-full px-5 gap-5">
                <StickyNote size={30} />
                <h1 className="w-full text-xl font-bold">{title}</h1>
            </div>
        )
    }

    return (
        <main className="min-h-screen min-w-screen">
            <Previous />
            <div className="flex justify-center min-w-screen min-h-screen">
                <div className="flex flex-col items-center h-auto w-full md:max-w-md gap-10 py-5 px-5">
                    <div className="w-full py-5 gap-5 flex flex-col justify-center items-center h-64">
                        <Avatar className="w-48 h-auto">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1>Nombre</h1>
                    </div>
                    <div className="w-full py-5 px-5 bg-slate-100 rounded-xl flex flex-col items-center h-80">
                        <TitleArchive title={"Mi expediente"} />
                        <div className="w-full py-5 gap-5 flex flex-col border-b-4">
                            <span>Tipo de sangre</span>
                            <span className=" font-bold">0 -</span>
                        </div>
                        <div className="w-full py-5 gap-5 flex flex-col border-b-4">
                            <span>Prepaga/obra social</span>
                            <span className=" font-bold">Hospital Alemán</span>
                        </div>
                        <div className=" flex justify-center py-5">
                            <Button >Ver mas</Button>
                        </div>

                    </div>
                    <div className="w-full py-5 px-5  bg-slate-100 rounded-xl flex flex-col items-center h-80">
                        <TitleArchive title={"Tratamiento"} />
                        <div className="w-full py-5 gap-5 flex flex-col border-b-4">
                            <span>Medicación</span>
                            <span>...</span>
                        </div>
                        <div className="w-full py-5 gap-5 flex flex-col border-b-4">
                            <span>Nutrición</span>
                            <span className=" font-bold">...</span>
                        </div>
                        <div className=" flex justify-center py-5">
                            <Button>Ver mas</Button>
                        </div>
                    </div>
                    <div className="w-full py-5 px-5  bg-slate-100 rounded-xl flex flex-col items-center h-80">
                        <TitleArchive title={"Recetas medicas"} />
                        <div className="w-full py-5 gap-5 flex flex-col border-b-4">
                            <span>Médico</span>
                            <span>...</span>
                        </div>
                        <div className="w-full py-5 gap-5 flex flex-col border-b-4">
                            <span>Diagnostico</span>
                            <span className=" font-bold">...</span>
                        </div>
                        <div className=" flex justify-center py-5">
                            <Button>Ver mas</Button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
{/* <div>
    <h1>Aca va el historial medico</h1>
    <h1>lista de alergias y enfermedades</h1>
    <h1>lista de operaciones y detalles</h1>
</div> */}