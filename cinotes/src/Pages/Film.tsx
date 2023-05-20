import {HomeHeader} from "../Components/HomeHeader";
import Not from "../Img/Not_Found.png"

export function Film() {
    return (
        <div className={"min-h-screen flex flex-col text-white bg-neutral-700"}>
            <HomeHeader/>
            <div className={"flex md:w-4/5 my-2 self-center flex-row"}>
                <div className={"flex w-full flex-col"}>
                    <div className={"flex flex-row m-5"}>
                        <div className={"text-4xl bg-black mr-5 w-full"}>
                            Название
                        </div>
                        <div className={"w-48 flex bg-black"}>
                            <button className={"grow"}>
                                Add to playlist
                            </button>
                        </div>
                    </div>
                    <div className={" flex flex-row"}>
                        <div className={"bg-black"}>
                            <img className={"object-cover h-72"} src={Not}/>
                        </div>
                        <div className={"mx-5 w-full bg-black"}>
                            Информация
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex md:w-4/5 my-2 self-center flex-row"}>
                Актерs
            </div>
            <div className={"flex md:w-4/5 my-2 self-center flex-row"}>
                Скриншотs
            </div>
            <div className={"flex md:w-4/5 my-2 self-center flex-col"}>
                <div className={"divide-y divide-black bg-white"}>
                    <button className={"w-20 bg-black"}>
                        Rewiews
                    </button>
                    <button className={"w-20 bg-black"}>
                        My notes
                    </button>
                </div>
            </div>
        </div>
    )
}