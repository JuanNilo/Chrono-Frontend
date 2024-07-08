
export default function Container({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <div className="bg-white w-[80%] h-[80vh] mt-5 p-12 mx-auto my-auto rounded-lg drop-shadow-lg">
            {children}
        </div>
    )
}