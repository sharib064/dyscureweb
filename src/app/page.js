import Image from "next/image";
import bg from "./../../public/background.png";

export default function Home() {
  return (

    <>
      <div
        className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <main className="flex flex-col gap-[32px] row-start-2 items-center">
          <Image
            src="/1026.png"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <p className=" text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-xl text-black">
            A gamified e-learning platform for Dyslexic children
          </p>

          <div className="flex gap-4 items-center justify-center  sm:flex-row ">
            <a
              className=" rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black  text-white gap-2 hover:bg-[#ffcd59] cursor-pointer hover:text-black font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="/login"
            >
              Get start
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
