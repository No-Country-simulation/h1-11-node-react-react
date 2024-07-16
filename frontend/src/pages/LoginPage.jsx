import LoginForm from "../components/Auth/LoginForm"
import '../styles/FormRegister.css'

const LoginPage = () => {

    return (
        <main className='flex flex-row items-center justify-center bg-purple'>
            <section className='container min-h-screen'>
                <div className='px-4 pt-8 mx-auto lg:w-3/5'>
                    <h1 className='text-left title'>Iniciar Sesion</h1>
                    <LoginForm />
                </div>
            </section>
        </main>
    )

}

export default LoginPage