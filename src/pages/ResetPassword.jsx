import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useResetPasswordMutation } from "../redux/slices/api/authApiSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword({ token, data }).unwrap();
      toast.success(res?.message || "Password reset successful");
      navigate("/log-in");
    } catch (err) {
      console.log(err);
      toast.error(
        err?.data?.message || err.error || "Failed to reset password"
      );
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded"
      >
        <h2 className="text-lg font-bold mb-4">Reset Password</h2>
        <Textbox
          placeholder="New password"
          type="password"
          name="password"
          label="New Password"
          className="w-full rounded-full"
          register={register("password", { required: "Password is required!" })}
          error={errors.password ? errors.password.message : ""}
        />

        {isLoading ? (
          <Loading />
        ) : (
          <Button type="submit" label="Reset Password" className="mt-4" />
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
