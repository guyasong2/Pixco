import Link from "next/link"

export default function about() {
  return (
    <>
    <div className="sm:w-[50%] w-[80%] mx-auto mt-10 bg-gray-300 p-4">
    <h2 className="font-bold text-xl">About Pixco</h2>
    <p className="text-lg">Welcome to, your ultimate destination for discovering, exploring and downloading stunning visuals. At Pixco we are paassionate about empowering creativity by providing high-quality images to creators, proffessionals and those looking to use the pictures as background images.</p>

    <div className="flex space-x-2 items-center">
    <p className="text-lg">Go back</p>
    <Link className="text-blue-600 text-lg" href="/">Home</Link>
    </div>
    </div>
    
    </>
  )
}
