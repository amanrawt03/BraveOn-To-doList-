import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; // Ensure you're importing the useNavigate hook
import { useMutation, useQueryClient } from '@tanstack/react-query';
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "", gender: "" });
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async ({ username, password, gender }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, username ,gender}),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    mutate(formData);
  };

  return (
    <div className="relative hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="ml-12">
          <div className="flex w-60">
            <h1 className="text-6xl font-bold">BRAVE</h1>
            <h1 className="text-6xl font-bold text-yellow-600">ON</h1>
          </div>
          <p className="py-6 font-semibold font-serif text-lg">
            Create new beginnings.
          </p>
        </div>
        <div className="absolute left-7 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSignUp}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="input input-bordered"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Gender</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    className="radio radio-primary"
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    required
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    className="radio radio-primary"
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    required
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    className="radio radio-primary"
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    required
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                {isPending? "Loading...": "Sign Up"}
                </button>
                {isError && <p className="text-red-500">{error.message}</p>}
            </div>
            <label className="label">
              <p className="label-text-alt text-lg">Already have an account?</p>
            </label>
            <div className="form-control mt-2">
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
