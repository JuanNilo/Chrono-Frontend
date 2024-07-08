import Link from "next/link";

export default function Return ({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="container mx-auto p-4">
            <Link href="/secretary">
            <button
                    className="bg-primaryColor text-white py-2 px-4 rounded mb-4"
                >
                    Volver
            </button>
            </Link>
        {children}
        </div>
    );
}