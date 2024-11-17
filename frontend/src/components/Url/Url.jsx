import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {formatUrlDate} from "../../utils/index.js";

const Url = ({ url }) => {
    const formattedDate = formatUrlDate(url.date);

    const queryClient = useQueryClient();

    const { mutate: deleteUrl  } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/u/delete/${url._id}`, {
                    method: "DELETE",
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
            toast.success("Post deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["urls"] });
        },
    });

    const handleDeleteUrl = () => {
        deleteUrl();
    }

    return (
        <div className="collapse collapse-arrow bg-base-200 w-full">
            <input type="radio" name="my-accordion-2"/>
            <div className="collapse-title text-xl font-medium">{url.name}</div>
            <div className="collapse-content">
                <div className="flex gap-1">
                    <p>Original Url :</p>
                    <a href={url.originalUrl}>{url.originalUrl}</a>
                </div>
                <div className="flex gap-1">
                    <p>Short Url :</p>
                    <a href={`u/${url.shortUrl}`}>{`http://localhost:5000/u/${url.shortUrl}`}</a>
                </div>
                <div className="flex gap-1">
                    <p>Created At :</p>
                    <p>{formattedDate + " ago"}</p>
                </div>
                <div className="flex gap-1">
                    <p>Used Amount :</p>
                    <p>{url.clickCount}</p>
                </div>
                {url.clickCount > 0 &&
                    <table className="table table-zebra">
                        <thead>
                        <tr>
                            <th>ip</th>
                            <th>referrer</th>
                            <th>userAgent</th>
                            <th>timestamp</th>
                        </tr>
                        </thead>
                        <tbody>
                        {url.analytics.map((data) => (
                            <tr className="border-b-2 border-b-gray-50">
                                <td>{data.ip}</td>
                                <td>{data.referrer}</td>
                                <td>{data.userAgent}</td>
                                <td>{data.timestamp}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
                <button onClick={handleDeleteUrl}>Delete URL</button>
            </div>
        </div>
    );
}

export default Url;