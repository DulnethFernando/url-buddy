import {useState} from "react";
import {Link} from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isError = false;

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1 className='text-4xl font-extrabold'>{"Let's"} Go</h1>
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
                    <button>Sign In</button>
                    {isError && <p className='text-red-500'>Something went wrong</p>}
                </form>
                <div className='flex flex-col md:w-full gap-2 mt-4'>
                    <p className='md:text-lg text-center'>{"Don't"} have an account?</p>
                    <Link to='/signup'>
                        <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;