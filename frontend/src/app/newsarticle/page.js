"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import axios from "axios";
import NavBar from "@/components/NavBar";

export default function Page({ searchParams }) {
    const [allNews, setAllNews] = useState();
    const params = useSearchParams()
    const newsId = params.get("id")
    const fetchAllNews = async () => {
        try {
            const res = await axios.get(`http://localhost:7001/homepageNews/${newsId}`);
            console.log(res.data);
            setAllNews(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (newsId) {
            fetchAllNews();
        }
    }, [newsId]);

    return (
        <div>
            <NavBar />
            <div className="h-screen w-screen">
                <img src={allNews?.imageUrl} alt="mostViewedPic" className="h-[50%] w-screen mb-[8px] absolute z-0" />
                <div className="z-10 absolute text-[white] right-[20%] top-[40%] ">
                    <h1 className="flex text-wrap text-[50px]">{allNews?.title}</h1>
                    <div className="flex gap-[50px]">
                    <h2>{allNews?.author}</h2>
                    <h2>{allNews?.publishedDate}</h2>
                    </div>
                </div>
                <h1 className="w-[25%] z-20 absolute bottom-[10%] right-[40%]">{allNews?.summary}</h1>
            </div>
        </div>
    )
}
