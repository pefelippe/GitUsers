import { zodResolver } from "@hookform/resolvers/zod";
import { useUserData } from "@hooks/useUserData";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
});

type FormValues = z.infer<typeof schema>;

const UserSearch: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useUserData();

  const onSubmit = async ({ username }: FormValues) => {
    mutate(username);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-1 w-full h-full rounded-xl   mx-auto"
    >
      <div className="flex h-full items-start justify-center gap-4 w-full  mx-auto max-md:flex-col">
        <input
          type="text"
          placeholder="Enter username"
          {...register("username")}
          className={`border-2 border-gray-600 p-3 w-full rounded-md ${
            errors.username ? "border-red-500" : ""
          }`}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-md px-12 font-medium text-lg w-fit hover:bg-blue-500/80 transition-all"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default UserSearch;
