import { useState } from "react";
import Broilers from "./Reports/Broilers";
import Layers from "./Reports/Layers";
import Hatchlings from "./Reports/Hatchlings";
import Common from "./Reports/Common";

export default function Report() {
    const [selectedTab, setSelectedTab] = useState("broilers");

    return (
        <>
            <Common />
        </>
    );
}