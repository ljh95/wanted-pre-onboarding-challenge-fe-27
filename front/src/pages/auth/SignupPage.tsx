import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "./hooks/useAuth";

interface SignupForm {
  email: string;
  password: string;
}

const schema = z.object({
  email: z
    .string()
    .includes("@", { message: "이메일 형식이 올바르지 않습니다." })
    .includes(".", { message: "이메일 형식이 올바르지 않습니다." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상 입력해주세요." }),
});

export const SignupPage = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignupForm>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const { authController } = useAuth();

  const onSubmit = handleSubmit(async (e) => {
    await authController.handleSignup(e);
  });

  return (
    <div>
      <h2 className="mb-[40px]">SignupPage</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-[20px]">
        <div>
          <label htmlFor="email">
            email:
            <input
              type="email"
              {...register("email")}
              placeholder="email@aaa.com"
            />
          </label>
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">
            password:
            <input
              type="password"
              {...register("password")}
              placeholder="password"
            />
          </label>
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <button
            type="submit"
            disabled={isValid === false}
            className="mt-[30px] disabled:bg-[rgba(0,0,0,0.1)] disabled:border-0 disabled:text-[white] "
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};
