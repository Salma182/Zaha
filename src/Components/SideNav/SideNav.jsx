// import React from "react";
// import style from "./SideNav.module.css";
// import "animate.css";

// export default function SideNav({ isOpen, setIsOpen }) {
//   function remove(e) {
//     if (e.target.classList.contains("side")) {
//       setIsOpen(false);
//     }
//   }

//   return (
//     <>
//       <div
//         onClick={(e) => remove(e)}
//         className={`${style.side} ${
//           isOpen ? "visible opacity-1" : "invisible opacity-0"
//         } side`}
//       >
//         <div
//           className={`${style.links} animate__animated ${
//             isOpen
//               ? "animate__fadeInLeft delay-2s"
//               : "animate__fadeOutLeft delay-2s"
//           }`}
//         >
//           <h1 className="text-center text-uppercase">Zaha</h1>
//           <ul className="list-unstyled">
//             <li>home</li>
//             <li>shop</li>
//             <li>dress</li>
//             <li>sets</li>
//             <li>coats</li>
//           </ul>
//           <div
//             className={`${style.toggle} test`}
//             onClick={() => {
//               setIsOpen(false);
//             }}
//           >
//             <i className="fa-solid fa-angle-left test"></i>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
