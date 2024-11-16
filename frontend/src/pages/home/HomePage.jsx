import {useState} from "react";

const HomePage = () => {
    const [name, setName] = useState("");
    const [originalUrl, setOriginalUrl] = useState("");

    const urls = [
        {
            name: "Longest Domain",
            originalUrl: "https://thelongestdomainnameintheworldandthensome.com/",
            shortUrl: "https://localhost:5000/uh4u",
            date: "now",
            clickCount: 3,
            analytics: [
                {
                    ip: "ip",
                    referer: "direct",
                    userAgent: "Google",
                    timestamp: "sdrhg"
                },
                {
                    ip: "ip",
                    referer: "direct",
                    userAgent: "Google",
                    timestamp: "sdrhg"
                },
                {
                    ip: "ip",
                    referer: "direct",
                    userAgent: "Google",
                    timestamp: "sdrhg"
                }
            ]
        },
        {
            name: "Longest Domain",
            originalUrl: "https://thelongestdomainnameintheworldandthensomeandthensomemoreandmore.com/",
            shortUrl: "https://localhost:5000/uh4u",
            date: "yesterday",
            clickCount: 3,
            analytics: [
                {
                    ip: "ip",
                    referer: "direct",
                    userAgent: "Google",
                    timestamp: "sdrhg"
                },
                {
                    ip: "ip",
                    referer: "direct",
                    userAgent: "Google",
                    timestamp: "sdrhg"
                },
                {
                    ip: "ip",
                    referer: "direct",
                    userAgent: "Google",
                    timestamp: "sdrhg"
                }
            ]
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("URL added successfully");
        setName("");
        setOriginalUrl("");
    };

    const isError = false;
    const isPending = false;

    return (
        <div className="flex flex-col gap-2">
            {urls.map(item => (
                <div className="collapse collapse-arrow bg-base-200 w-full">
                    <input type="radio" name="my-accordion-2"/>
                    <div className="collapse-title text-xl font-medium">{item.name}</div>
                    <div className="collapse-content">
                        <div className="flex gap-1">
                            <p>Original Url :</p>
                            <a href={item.originalUrl}>{item.originalUrl}</a>
                        </div>
                        <div className="flex gap-1">
                            <p>Short Url :</p>
                            <a href={item.shortUrl}>{item.shortUrl}</a>
                        </div>
                        <div className="flex gap-1">
                            <p>Created At :</p>
                            <p>{item.date}</p>
                        </div>
                        <div className="flex gap-1">
                            <p>Used Amount :</p>
                            <p>{item.clickCount}</p>
                        </div>
                        {item.clickCount > 0 &&
                            <table className="table table-zebra">
                                <thead>
                                <tr>
                                    <th>ip</th>
                                    <th>referer</th>
                                    <th>userAgent</th>
                                    <th>timestamp</th>
                                </tr>
                                </thead>
                                <tbody>
                                {item.analytics.map((data) => (
                                    <tr className="border-b-2 border-b-gray-50">
                                        <td>{data.ip}</td>
                                        <td>{data.referer}</td>
                                        <td>{data.userAgent}</td>
                                        <td>{data.timestamp}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        }
                        <button>Delete Added URL</button>
                    </div>
                </div>
            ))}
            <div>
                <button>Logout</button>
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
                                    <button className='btn btn-primary rounded-full btn-sm text-white px-3'>
                                        {isPending ? "Adding..." : "Add"}
                                    </button>
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