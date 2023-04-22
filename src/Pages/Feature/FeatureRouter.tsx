
import { Routes,Route } from "react-router";
import MasterCon from "./Master/masterConfig";



function FeatureConfig(){
    return (
        <>
            <Routes>
                <Route path='/*' element={<MasterCon />} /> 
            </Routes>
        </>
    )
}
export default FeatureConfig;