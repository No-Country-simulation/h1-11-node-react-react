import LoginForm from "../components/Auth/LoginForm"
import LoginLayout from "../layouts/LoginLayout"

const LoginPage = () => {

    return (
        <main className='flex flex-col items-center justify-center w-screen h-auto mt-10'>
            <LoginLayout />
            <section className='min-h-screen'>
                <div className='px-4 pt-8 mx-auto lg:w-3/5'>
                    <h1 className='text-left'>Iniciar Sesion</h1>
                    <LoginForm />
                </div>
            </section>
        </main>
    )

}

export default LoginPage