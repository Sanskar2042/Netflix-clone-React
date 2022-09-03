import React, { useEffect, useState } from 'react'
import './Nav.css'

const Nav = () => {

    const [showNav, setShowNav] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 100) {
                setShowNav(true);
            }else{
                setShowNav(false);
            }
        });
        
        return ()=> {
            window.removeEventListener("scroll", ()=>{});
        }
    },[]);

    return (
        <div className={`nav ${showNav && 'nav__black__show'}`}>
            <img className="nav__logo" src="https://pngimg.com/uploads/netflix/small/netflix_PNG32.png" alt=""/>
            <img className="nav__avatar" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png" alt="" />
        </div>
    )
}

export default Nav;
