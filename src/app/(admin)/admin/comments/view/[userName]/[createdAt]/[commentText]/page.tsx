
const View = ({params}:{params:{userName:string,createdAt:string,commentText:string}})=>{
    const userName = decodeURIComponent(params.userName);
    const createdAt = decodeURIComponent(params.createdAt);
    let decodedCreatedAt;
try {
    decodedCreatedAt = decodeURIComponent(params.createdAt);
} catch (error) {
    console.error("Error decoding createdAt:", error);
    decodedCreatedAt = params.createdAt; // Fallback
}

    const commentText = decodeURIComponent(params.commentText);

    return(
        <div className="flex min-w-full min-h-[10rem] bg-gray-300 rounded-md flex-col p-5">
            <div className="block max-w-full min-h-[5rem] items-center relative text-white">
                <div className="block float-left w-[5rem] h-[5rem] custom-lg:max-w-[2.65rem] custom-lg:mt-[0.33rem] custom-lg:h-[2.65rem] overflow-hidden rounded-md mr-2">
                    <img src={`../../../../../Sweety.jpg`} className="block w-full h-full" alt="" />
                </div>
                {/* TODO: Link that sends the admin to user page view,when it was clicked */}
                <div className="block relative w-full ">
                    <div className="flex flex-col relative">
                        <div className="font-medium  text-[1.25rem] relative">
                            {userName}
                        </div>
                        <div className="flex font-normal rounded-md h-[1.25rem] items-center justify-center relative bg-[#629377] min-w-[5rem] w-[5.5rem] max-w-[6rem] text-[11px] px-1">
                            {createdAt}
                        </div>
                    </div>

                </div>
                <div className="block w-full">
                    <div className="font-light relative max-w-[88%] break-words overflow-hidden">
                        {commentText}
                    </div>

                </div>
            </div>
        </div>
    )
}
export default View;