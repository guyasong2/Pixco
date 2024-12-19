"use client";
import { AiFillGithub, AiFillYoutube, AiOutlineDownload, AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  AiOutlineLoading,
  AiFillInstagram,
  AiOutlineX,
  AiFillLinkedin,
} from "react-icons/ai";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";

interface PexelsImage {
  id: number;
  src: {
    medium: string;
    original: string;
  };
  photographer: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [page, setPage] = useState<number>(1);

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const { isSignedIn } = useAuth();

  const fetchImages = async (
    newQuery: string = query,
    newPage: number = page
  ) => {
    if (!newQuery) return;
    setLoading(true);

    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        params: { query: newQuery, per_page: 12, page: newPage },
        headers: {
          Authorization:
            process.env.NEXT_PUBLIC_PEXELS_API_KEY ||
            "ysHnBIDye8MHbksZ4Vd4QORNIxs8mnkaUuNabmnz0cPhsyycKMKilotc",
        },
      });

      if (newPage === 1) {
        setImages(response.data.photos);
      } else {
        setImages((prevImages) => [...prevImages, ...response.data.photos]);
      }

      setHasMore(response.data.photos.length > 0);
    } catch (error) {
      console.error("Error Fetching images: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchImages();
    setPage(1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  if (!isSignedIn) {
    return (
      <>
        <div className="text-center mt-5 bg-slate-300 p-10">
          <h3 className="text-xl font-bold mb-4">
            Please sign in to get started
          </h3>
          <span className="bg-black text-white font-bold py-2 px-2">
            <SignInButton />
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <nav className="pb-2">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex justify-center items-center sticky bg-white">
            <ul className="flex flex-row font-medium mt-0 space-x-4 sm:space-x-8 pr-4 rtl:space-x-reverse text-sm items-center">
              <Link className="text-lg" href="/">Home</Link>
              <Link className="text-lg" href="/about">About</Link>
              <p>|</p>
              <Link href="https://www.instagram.com/guy.asong?igsh=MXNobmNxZmM4c3lzMw%3D%3D&utm_source=qr">
                <AiFillInstagram className="w-5 h-5"/>
              </Link>
              <Link href="https://x.com/@guy_asong">
                <AiOutlineX className="w-5 h-5"/>
              </Link>
              <Link href="https://www.linkedin.com/in/guy-asong-b8b1441b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
                <AiFillLinkedin className="w-5 h-5"/>
              </Link>
              <Link href="https://youtube.com/@codeguru3204?si=fsOIJ42QLqLAsX1a"><AiFillYoutube className="w-5 h-5"/></Link>
              <Link href="https://github.com/guyasong2/"><AiFillGithub className="w-5 h-5"/></Link>
            </ul>
          </div>
        </div>
      </nav>
      <section className="bg-bannerImg bg-repeat bg-cover w-full h-72">
        <div className="w-[90%] sm:w-[50%] mx-auto pt-8">
          <h2 className="text-5xl font-bold text-white text-center">
            Search Images
          </h2>
          <p className="text-center font-light text-bold text-2xl text-white  pb-4">
            Search and download high quality images with
            <span className="font-bold"> Pixco</span>
          </p>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <AiOutlineSearch className="w-5 h-5 font-bold" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              className="block w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Search Image"
              required
            />
          </div>
          <p className="text-white text-center italic">
            After typing hit enter
          </p>
        </div>
      </section>

      <section className="pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {images.map((image) => (
            <div key={image.id} className="relative group drop-shadow-xl">
              <img
                src={image.src.medium}
                alt={`Photo by ${image.photographer}`}
                className="w-full h-64 object-cover rounded-sm shadow-2xl hover:shadow-2xl"
              />

              <button
                onClick={() => {
                  try {
                    const link = document.createElement("a");
                    link.href = image.src.original;
                    link.download = `Pixco-${image.id}.jpg`;
                    document.body.appendChild(link);
                    link.click();

                    document.body.removeChild(link);
                  } catch (error) {
                    console.log("Failed to download image", error);
                  }
                }}
                className="absolute bg-black inset-0 bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-end items-end text-white font-bold transition-opacity"
              >
                <AiOutlineDownload className="text-white w-14 h-14 bg-black p-4" />
              </button>
            </div>
          ))}
        </div>

        {hasMore && !loading && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-black text-white hover:bg-slate-600 font-bold"
            >
              Load More
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center">
            <AiOutlineLoading className="text-gray-500 w-11 h-11 text-center" />
          </div>
        )}
      </section>
    </>
  );
}
