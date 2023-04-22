
import { Route, Routes } from 'react-router';
import City from './Pages/City';
import Country from './Pages/Country';
import State from './Pages/state';


export default function MasterCon(){
	return (
		<div>
			<Routes>
				<Route path='/*' element={<City  />} />  
				<Route path='/master/country' element={<Country  />} />  
				<Route path='/master/state' element={<State  />} />  
			</Routes>
		</div>
	)
}
