import Navbar from "./Navbar.js"

import { FaSearch } from "react-icons/fa";

import { LuSparkles } from "react-icons/lu";

interface HomeHeroProps {
    search: string
    setSearch: (value: string) => void      ////????
    loading: boolean
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void     ////????
}


export default function HomeHero({ search, setSearch, handleSubmit, loading }: HomeHeroProps) {


    return (

        <div
            className="relative bg-contain bg-no-repeat bg-top"
            style={{ backgroundImage: "url('/images/background-image-2.png')" }}
        >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

            <div className="relative mx-auto max-w-6xl px-4 text-white">
                <div className="relative mx-auto max-w-6xl px-6 pb-16 text-white">
                    <Navbar />

                    <div>
                        <h1 className="text-4xl font-bold">
                            Descubre lugares únicos <br /> para tu próxima aventura
                        </h1>

                        <p className="mt-4 text-lg leading-relaxed mb-6">
                            Encuentra áreas de pernocta, campings y lugares
                            especiales <br /> para camper y autocaravana. Con mapas, filtros y la ayuda <br />
                            IA para encontrar justo lo que buscas
                        </p>

                        <form className="flex max-w-2xl gap-3" onSubmit={handleSubmit}>

                            <div className="relative flex-1">
                                <LuSparkles className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-lg" />

                                <input
                                    className="w-full bg-amber-50 border-2 border-gray-300 rounded-xl py-3 pl-10 pr-3 text-gray-700 font-semibold"
                                    value={search}
                                    placeholder="Ask to the AI"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className=" flex items-center gap-2 bg-[#1E7A4B] rounded-2xl px-6 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <FaSearch />
                                {loading ? "Buscando..." : "Buscar con la IA"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}