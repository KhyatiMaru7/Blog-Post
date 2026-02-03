import { Outlet } from "react-router-dom";
import { Navbar } from "../component/Navbar";
import Snowfall from "react-snowfall";
import { Footer } from "../component/Footer";
const snowflake1 = document.createElement('img')
snowflake1.src = '/assets/p.jpg'
const snowflake2 = document.createElement('img')
snowflake2.src = '/assets/p1.jpg'
const images = [snowflake1, snowflake2]

export default function RootLayout(){
    return(
        <>
        <div className="app-wapper">
        <Navbar/>
        <main className="content">
        <Outlet/>
        </main>
        <Footer/>
       </div>
        
     
        
        {/* <Snowfall 
        color="#5d88fc" 
        snowflakeCount={200}
        images={images} />  
         */}
         </>
    ); 
   

}