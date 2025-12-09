import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleRegister = async (data) => {
    try {
      const res = await registerUser(data).unwrap();

      dispatch(setCredentials(res));

      toast.success("Registration successful");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black">
      <div className="flex flex-col items-center justify-center w-full gap-0 md:w-auto md:gap-40 md:flex-row">
        <div className="flex flex-col items-center justify-center w-full h-full lg:w-2/3">
          <div className="flex flex-col items-center justify-center w-full gap-5 md:max-w-lg 2xl:max-w-3xl md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-full md:text-base dark:border-gray-700 dark:text-blue-400">
              Create an account to manage tasks
            </span>
            <p className="flex flex-col gap-0 text-4xl font-black text-center text-blue-700 md:gap-4 md:text-6xl 2xl:text-7xl dark:text-gray-400">
              <span>Cloud-based</span>
              <span>Task Manager</span>
            </p>

            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full p-4 md:w-1/3 md:p-1">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white dark:bg-slate-900 px-10 pt-14 pb-14"
          >
            <div>
              <p className="text-3xl font-bold text-center text-blue-600">
                Create account
              </p>
              <p className="text-base text-center text-gray-700 dark:text-gray-500">
                Start managing tasks for your team
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="Full name"
                type="text"
                name="name"
                label="Full Name"
                className="w-full rounded-full"
                register={register("name", {
                  required: "Full name is required!",
                })}
                error={errors.name ? errors.name.message : ""}
              />

              <Textbox
                placeholder="you@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />

              <Textbox
                placeholder="password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password?.message : ""}
              />
              <Textbox
                placeholder="Job title (e.g. Product Manager)"
                type="text"
                name="title"
                label="Title"
                className="w-full rounded-full"
                register={register("title", {
                  required: "Title is required!",
                })}
                error={errors.title ? errors.title.message : ""}
              />

              <Textbox
                placeholder="Role (e.g. Designer, Developer)"
                type="text"
                name="role"
                label="Role"
                className="w-full rounded-full"
                register={register("role", {
                  required: "Role is required!",
                })}
                error={errors.role ? errors.role.message : ""}
              />
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                label="Register"
                className="w-full h-10 text-white bg-blue-700 rounded-full"
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
