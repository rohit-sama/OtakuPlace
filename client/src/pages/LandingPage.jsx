export default function LandingPage() {
  return (
    <div className="h-[90vh] flex items-end -m-4 flex-col justify-center bg-custom-background">
      <div className="backdrop-blur-3xl rounded-3xl m-20 p-10">
        <h1 className="text-3xl text-red-300 p-3">
          The only place you OTAKUS will ever need for travelling !!
        </h1>
        <div className="flex justify-end gap-2 text-red-200">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        <h2 className="text-xl p-1 -mt-2 ">
          
          A Place where weebs can visit when they are finding places to travel
          !!
        </h2> 
        </div>
      </div>
    </div>
  );
}
