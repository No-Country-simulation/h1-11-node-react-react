import FormRegister from '../components/Register/FormRegister.jsx'
import LoginLayout from '../layouts/LoginLayout.jsx'

const RegisterPage = () => {
  return (
    <main className='flex flex-col items-center justify-center w-screen h-auto mt-10'>
      <LoginLayout />
      <section className='min-h-screen'>
        <div className='px-4 pt-8 mx-auto lg:w-3/5'>
          <FormRegister />
        </div>
      </section>
    </main>
  )
}
export default RegisterPage