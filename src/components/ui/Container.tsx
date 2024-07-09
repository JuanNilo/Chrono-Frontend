
export default function Container({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <div className="bg-white w-[100%] h-[100%] md:w-[80%] md:h-[80vh] mt-5 md:p-12 mx-auto my-auto rounded-lg drop-shadow-lg">
            {children}
        </div>
    )
}