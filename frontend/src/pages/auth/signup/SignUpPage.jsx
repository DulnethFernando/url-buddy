import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const { mutate:SignUpMutation, isError, isPending, error } = useMutation({
        mutationFn: async ({ username, password }) => {
            try {
                const res = await fetch("/u/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await res.json();
                if(!res.ok) throw new Error(data.error || "Failed to create account.");
                console.log(data);
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Account created successfully.");
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        SignUpMutation(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1 className='text-4xl font-extrabold'>Join today.</h1>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <input
                            type='text'
                            className='grow'
                            placeholder='Username'
                            name='username'
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                    </label>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <input
                            type='password'
                            className='grow '
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    <button>{isPending ? "Loading..." : "Sign Up"}</button>
                    {isError && <p className='text-red-500'>{error.message}</p>}
                </form>
                <div className='flex flex-col md:w-full gap-2 mt-4'>
                    <p className='md:text-lg text-center'>Already have an account?</p>
                    <Link to='/login'>
                        <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign in</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;