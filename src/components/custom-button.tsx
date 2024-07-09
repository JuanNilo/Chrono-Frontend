

export default function CustomButton({ location, text, children }: { location: any, text: any, children: any }) {
    return (
        <div className={`flex items-center justify-center h-12 w-50 rounded-lg m-2 `} >
            <div className="flex flex-row items-center">
                <div className="block md:hidden">
                    {children}
                </div>
                <div className=" hover:border-b-2 transition-all hover:border-black hidden md:block mx-2 text-lg font-semibold text-black">{text}</div>
            </div>
        </div>
    )
}