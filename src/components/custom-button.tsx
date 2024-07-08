

export default function CustomButton({location, text, children}: {location: any, text: any, children: any}){
    return(
        <div className={`flex items-center justify-center h-12 w-50 ${location == 'main' ? 'bg-red-400 absolute  bottom-0 ' : 'bg-primaryColor p-2 '} rounded-lg m-2`} >
        <div className="flex flex-row">
            {children}
            <div className="mx-2 text-lg font-semibold text-white">{text}</div>
        </div>
    </div>
    )
}