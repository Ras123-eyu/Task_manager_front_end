import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useForgotPasswordMutation } from "../redux/slices/api/authApiSlice";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await forgotPassword(data).unwrap();

      if (res?.resetUrl) {
        toast.success("Reset link created. Check server response.");

        console.log("Password reset URL:", res.resetUrl);
      } else {
        toast.success(res?.message || "Check your email for reset link");
      }
      navigate("/log-in");
    } catch (err) {
      console.log(err);
      toast.error(
        err?.data?.message || err.error || "Failed to create reset token"
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded"
      >
        <h2 className="mb-4 text-lg font-bold">Forgot Password</h2>
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

        {isLoading ? (
          <Loading />
        ) : (
          <Button type="submit" label="Send Reset Link" className="mt-4" />
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
