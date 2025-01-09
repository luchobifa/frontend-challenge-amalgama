import { LoginForm } from "../components/LoginForm";
import { TextBanner } from "../components/TextBanner";

export const LoginPage = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-center items-center">
      <div className="lg:w-2/4 w-full flex justify-center items-center bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950 shadow-lg text-white lg:h-screen lg:p-0 px-10 py-40">
        <TextBanner
          title="Bienvenido a Amalgama!"
          description="Si ya tienes una cuenta, inicia sesion!"
        />
      </div>
      <div className="lg:w-2/4 w-full lg:p-0 py-10">
        <LoginForm />
      </div>
    </div>
  );
};
