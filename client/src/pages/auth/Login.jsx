import { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "../../components/comman/Form";
import { loginFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginUser } from "@/store/auth-slice";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((action) => {
      console.log("login result", action);
      if (action.meta.requestStatus === "fulfilled") {
        toast.success("Login successful", {
          description: "You are now logged in",
        });
        navigate("/shop/home");
      } else {
        toast.error("Login failed", {
          description:
            action.payload?.message || "Please try again",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login to your account
        </h1>

        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={loginFormControls}
        buttonText="Login"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
