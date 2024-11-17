import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import Url from "../../components/Url/Url.jsx";

const HomePage = () => {
    const [name, setName] = useState("");
    const [originalUrl, setOriginalUrl] = useState("");

    const queryClient = useQueryClient();

    const {
        mutate: createURL,
        isError,
        error,
    } = useMutation({
        mutationFn: async ({ name, originalUrl }) => {
            try {
                const res = await fetch("/u/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, originalUrl }),
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },

        onSuccess: () => {
            setName("");
            setOriginalUrl("");
            toast.success("URL created successfully");
            queryClient.invalidateQueries({ queryKey: ["urls"] });
        },
    });

    const { mutate:Logout } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("/u/logout", {
                    method: "POST",
                });

                const data = await res.json();
                if(!res.ok) throw new Error(data.error || "Failed to logout.");
                console.log(data);
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: () => {
            toast.error("Logout failed.");
        }
    });

    const URL_ENDPOINT = "u/urls/all";

    const { data: urls } = useQuery({
        queryKey: ["urls"],
        queryFn: async () => {
            try {
                const res = await fetch(URL_ENDPOINT);
                const data = res.json();

                //if(!res.ok) throw new Error(data.error || "Something Went Wrong.");
                console.log("Urls are here:", data)
                console.log(data);
                return data;
            } catch (error) {
                throw new Error(error);
            }
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        createURL({ name, originalUrl });
    };

    return (
        <div className="flex flex-col gap-2">
            {urls?.map((url) => (
                <Url key={url._id} url={url} />
            ))}
            <div>
                <button onClick={(e) => {
                    e.preventDefault();
                    Logout();
                }}>Logout</button>
                <button onClick={() => document.getElementById('my_modal_3').showModal()}>Add URL</button>
                <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-semibold text-xl mb-4">Add URL</h3>
                        <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
                            <div className='flex flex-col justify-between py-2'>
                                <input type="text" placeholder="Type Name" value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       className="input input-bordered w-full mb-4"/>
                                <input type="url" placeholder="Type Original URL" value={originalUrl}
                                       onChange={(e) => setOriginalUrl(e.target.value)}
                                       className="input input-bordered w-full mb-4"/>
                                <div className="flex justify-between">
                                    <button className='btn btn-primary rounded-full btn-sm text-white px-3'>Add URL</button>
                                </div>
                            </div>
                            {isError && <div className='text-red-500'>Something went wrong</div>}
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default HomePage;