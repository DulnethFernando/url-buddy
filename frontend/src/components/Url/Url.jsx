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
            toast.success("URL deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["urls"] });
        },
    });

    const handleDeleteUrl = () => {
        deleteUrl();
    }

    const truncateString = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.slice(0, maxLength - 3) + '...';
        }
        return str;
    }

    return (
        <div className="collapse collapse-arrow bg-base-200 w-full">
            <input type="radio" name="my-accordion-2"/>
            <div className="collapse-title text-xl font-medium">{url.name}</div>
            <div className="collapse-content">
                <div className="flex gap-2 mb-1">
                    <p>Original Url :</p>
                    <a href={url.originalUrl} className="text-primary underline">{url.originalUrl}</a>
                </div>
                <div className="flex gap-2 mb-1">
                    <p>Short Url :</p>
                    <a href={`u/${url.shortUrl}`} className="text-primary underline">{`http://localhost:5000/u/${url.shortUrl}`}</a>
                </div>
                <div className="flex gap-2 mb-1">
                    <p>Created At :</p>
                    <p>{formattedDate}</p>
                </div>
                <div className="flex gap-2 mb-4">
                    <p>Used Amount :</p>
                    <p>{url.clickCount}</p>
                </div>
                {url.clickCount > 0 &&
                    <table className="text-sm min-w-56 border-collapse mb-4 rounded-xl overflow-hidden">
                        <thead>
                        <tr className="bg-primary text-secondary font-bold text-left">
                            <th className="py-[12px] px-[15px]">ip</th>
                            <th className="py-[12px] px-[15px]">referrer</th>
                            <th className="py-[12px] px-[15px]">userAgent</th>
                            <th className="py-[12px] px-[15px]">timestamp</th>
                        </tr>
                        </thead>
                        <tbody className="font-semibold [&>*:nth-child(even)]:bg-gray-50 [&>*:nth-child(even)]:text-primary [&>*:last-of-type]:border-b-primary [&>*:last-of-type]:border-b-4">
                        {url.analytics.map((data) => (
                            <tr className="border-b-2 border-b-[#dddddd]">
                                <td className="py-[12px] px-[15px]">{data.ip}</td>
                                <td className="py-[12px] px-[15px]">{data.referrer}</td>
                                <td className="py-[12px] px-[15px]">{truncateString(data.userAgent, 100)}</td>
                                <td className="py-[12px] px-[15px]">{data.timestamp}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
                <button onClick={handleDeleteUrl} className="btn rounded-full bg-red-500  hover:bg-red-500 text-secondary">Delete URL</button>
            </div>
        </div>
    );
}

export default Url;