import { createBrowserRouter } from "react-router-dom";
import {CreatePostPage} from "../Pages/CreatePostPage";
import {Home} from '../Pages/Home'
import { LoginPage } from "../Pages/LoginPage";
import { Children } from "react";
import RootLayout from "../Pages/RootLayout";
import PostDetail from "./PostDetail";
import AuthGuard from "../guard/AuthGuard";
import NotFound from "./NotFound";
import Explore from "../Pages/ExplorePostPage";
import  Pagegnation  from "./Pagegnation";
import { Footer } from "./Footer";
export const router= createBrowserRouter([
    {
        path:"/login",
        element:<LoginPage/>
    },
   
    {
        path:"/",
        element:<AuthGuard/>,//for navbar common view in page
        
    
   children:[
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/new-post",
        element:<CreatePostPage/>
    },
    {
        path:"/explore",
        element:<Explore/>
    },

    //use for post detail page
    {
        path:"/posts/:postId",//dynamic id
        element:<PostDetail/>
    },
    {
        path:"page",//dynamic id
        element:<Pagegnation/>
    },
    {
        path:"Footer",//dynamic id
        element:<Footer/>
    },

],

},
{
    path: "*",
    element:
    <NotFound/>,
}
    
])