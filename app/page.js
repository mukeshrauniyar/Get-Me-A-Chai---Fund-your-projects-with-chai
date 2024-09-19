import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex justify-center flex-col gap-4 items-center text-white h-[35vh] mb-10 p-5 md:p-0 text-xs md:text-base ">
      <div className="font-bold md:text-5xl text-3xl flex gap-1 md:gap-2 justify-center items-center ">
        Buy Me a Chai <span className="mb-5 md:mb-0"><img className="invertImg" src="/tea.gif" width={65} alt="" /></span></div>
      <p className="tetx-center md:text-left">A crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p> 
      <p className="tetx-center md:text-left">A place where your fans can buy you a Chai, Unleash the power of your fans and get your projects funded.</p> 
      <div>
        <Link href={'/login'}>
      <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
      </Link>
      <Link href={'/about'}>
      <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
      </Link>
      </div>
    </div>

    <div className="bg-white h-1 opacity-10"></div>

    <div className="text-white container mx-auto pb-16 pt-10 px-8">
      <h2 className="text-3xl font-bold text-center mb-10">Your Fans can buy you a Chai</h2>
      <div className="flex gap-5 justify-around">
        <div className="item space-y-3 flex flex-col items-center justify-center">
          <img className="bg-slate-300 rounded-full p-2 text-black " width={88} src="/man.png" alt="" />
          <p className="font-bold text-center">Fans want to help</p>
          <p className="text-center">Your fans are available for you to help you</p>
        </div>

        <div className="item space-y-3 flex flex-col items-center justify-center">
          <img className="bg-slate-300 rounded-full p-2 text-black " width={88} src="/coin.png" alt="" />
          <p className="font-bold text-center">Fans want to help</p>
          <p className="text-center">Your fans are available for you to help you</p>
        </div>

        <div className="item space-y-3 flex flex-col items-center justify-center">
          <img className="bg-slate-300 rounded-full p-2 text-black " width={88} src="/group.png" alt="" />
          <p className="font-bold text-center">Fans want to help</p>
          <p className="text-center">Your fans are available for you to help you</p>
        </div>

      </div>
    </div>

    <div className="bg-white h-1 opacity-10"></div>

    <div className="text-white container mx-auto pb-16 pt-10 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center mb-10">Learn more about us</h2>
      <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">

      
      <iframe className="w-full h-full" src="https://www.youtube.com/embed/Apj8kBUwPLg?si=C9sbjyP3E2kw0LmV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </div>

    </>
  );
}
