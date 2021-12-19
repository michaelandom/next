import Image from "next/image"

export const Follow = ({result}) => {
    return (
        <div  className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center  " >
        <Image alt="" src={result.userImg} width={50} height={50} className="rounded-full" objectFit="cover"/>
        <div className="ml-4 leading-5 group">
            <h4 className="font-bold group-hover:underline">{result.username}</h4>
        <span className="text-gray-500 text-[15px]">{result.tag}</span>
        </div>
        
        <button className="ml-auto font-bold bg-white text-black rounded-full text-sm py-1.5 px-3.5">
            Follow
        </button>
                  </div>
    )
}
