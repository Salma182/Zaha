import React from "react"
import style from "./TopNav.module.css"

export default function TopNav (){
    return <>

    <div className="container topnav">
    <ul className={style.NavLinks}>
            <li className={style.nav_link}>home</li>
            <li className={style.nav_link}>shop</li>
            <li className={style.nav_link}>dress</li>
            <li className={style.nav_link}>sets</li>
            <li className={style.nav_link}>coats</li>
          </ul>

    </div>
    </>
}