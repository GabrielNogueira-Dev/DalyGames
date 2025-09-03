
interface LabelProps{
    data:string;
}

export function Label ({data}:LabelProps){

    return(
        <div className="flex-grow sm:flex-grow-0 bg-slate-300 py-1 px-3 text-black text-center rounded-lg hover:font-bold duration-200 ">
            {data}
        </div>
    )
}