import { useState } from "react";
import Broilers from "./Reports/Broilers";
import Layers from "./Reports/Layers";
import Hatchlings from "./Reports/Hatchlings";

export default function Report() {
    const [selectedTab, setSelectedTab] = useState("broilers");

    return (
        <>

            <div className="mx-10 ">
                <div className="flex gap-8 text-gray-400 mt-8 mb-1">
                    <button
                        className={`hover:underline ${selectedTab === "broilers" ? "text-black" : "text-gray-400"}`}
                        onClick={() => setSelectedTab("broilers")}
                    >
                        Broilers
                    </button>
                    <button
                        className={`hover:underline ${selectedTab === "layers" ? "text-black" : "text-gray-400"}`}
                        onClick={() => setSelectedTab("layers")}
                    >
                        Layers
                    </button>
                    <button
                        className={`hover:underline ${selectedTab === "hatchlings" ? "text-black" : "text-gray-400"}`}
                        onClick={() => setSelectedTab("hatchlings")}
                    >
                        Hatchlings
                    </button>
                </div>

                <hr className="w-full text-black bg-black" />

                {selectedTab === "broilers" && <Broilers />}
                {selectedTab === "layers" && <Layers />}
                {selectedTab === "hatchlings" && <Hatchlings />}
            </div>
        </>
    );
}