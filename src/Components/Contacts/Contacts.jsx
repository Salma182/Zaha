import React, { useEffect, useState } from "react";
import style from "./Contacts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Contacts() {
  
  const[links, setLinks] =useState([])
  const token = localStorage.getItem('token');

async function getLinks(){
  const {data} = await axios.get(`https://zahaback.com/api/allSocialLink`,
  {  
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  )
  setLinks(data.allSocialLink)
  console.log(data.allSocialLink)
}

useEffect(() => {
  getLinks();
}, []);

// const link = links.map(link => link)
const renderLink = (link) => {
  if (link.name && link.name.toLowerCase() === "instagram") {
    return (
      <Link to={link.link} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fs-4 pointer mx-2 text-danger fa-instagram"></i>
      </Link>
    );
  } else if (link.name && link.name.toLowerCase() === "facebook") {  
    return (
      <Link to={link.link} target="_blank" rel="noopener noreferrer">
     <i className="fa-brands fs-4 pointer text-primary mx-2 fa-facebook"></i> 
      </Link>
    );
  } else if (link.name && link.name.toLowerCase() === "linkedin" ){
    return (
    <Link to={link.link} target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fs-4 pointer mx-2 text-info fa-linkedin"></i>
    </Link>
    )
  }
  else if (link.name && link.name.toLowerCase() === "tiktok"){
    return (
     <Link to={link.link} target="_blank" rel="noopener noreferrer">
   <i className="fa-brands fs-4 pointer mx-2 text-warning fa-tiktok"></i>
   </Link>
    )
  }else if(link.name && link.name.toLowerCase() === "whatsapp"){
    return (
    <Link to={link.link} target="_blank" rel="noopener noreferrer">
   <i className="fa-brands fs-4 pointer mx-2 text-success fa-whatsapp"></i>
   </Link>
    )
  }
};

  return <>
   <div className="container mt-5">
      <div className="row">
        <div className="col-lg-3 col-md-4 mb-3 gold">
          <h4 className="mb-4 fw-bold">
          Contact Zaha On:
          </h4>
          <p className="small my-1">(+20) 521 - 249 - 976</p>
          <p className="small my-1">info@zahacarves.com</p>
          <span className="smal">Zaha.com</span>
        </div>
        <div className="col-lg-9 col-md-8 space-bottom bg-light p-3 shadow shadow-md">
      <div className="d-flex flex-row justify-content-start">
        {links.map((link, index) => (
          <div key={index} className="me-2">
            {renderLink(link)}
          </div>
        ))}
      </div>
    </div>

      </div>
    </div>
  </>   


}






{/* <>
 <div className="container mt-5">
     <div className="row">
       <div className="col-lg-3 col-md-4 mb-3">
         <h4 className="mb-4">
           Contact <span className={`${style.color} fw-bold`}>Zaha</span> On:
         </h4>
         <p className="small my-1">(+20) 521 - 249 - 976</p>
         <p className="small my-1">info@zahacarves.com</p>
         <span className="smal">Zaha.com</span>
       </div> 
      {links.map((link, index) => {
 <div className="col-lg-9 col-md-8 space-bottom bg-light p-3 shadow shadow-md">
        const renderLink = () => {
          if (link.name === "instagram") {
            return (
              <Link to={link.link} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fs-4 pointer mx-2 text-danger fa-instagram"></i>
              </Link>
            );
          } else if (link.name === "facebook") {  
            return (
              <Link to={link.link}>
             <i className="fa-brands fs-4 pointer text-primary me-2 fa-facebook"></i> 
              </Link>
            );
          } else if (link.name === "linkedin" ){
            <i className="fa-brands fs-4 pointer mx-2 text-info fa-linkedin"></i>
          }
          else if (link.name === "tiktok"){
           <i className="fa-brands fs-4 pointer mx-2 text-warning fa-tiktok"></i>
          }else if(link.name === "whatsapp"){
           <i className="fa-brands fs-4 pointer mx-2 text-success fa-whatsapp"></i>
          }
        };
 
        return <div key={index}>{renderLink()}</div>;
        </div>
      })}
   
  
       </div>
   </div>
  );
  </> */}

// <p className="mt-3 ">
// {/* <span>Visa Payment is avilable</span> */}
// {/* <i className="fa-brands pointer mx-3 text-primary fa-cc-visa"></i> */}
// </p>
// </div>
// ) 
// ):""}
          

        
//     </>
  





// {links && links.length > 0 ? (
// links.map((link)=> 
//   <div className="col-lg-9 col-md-8 space-bottom bg-light p-3 shadow shadow-md">
// <Link>  
//  <i className="fa-brands fs-4 pointer text-primary me-2 fa-facebook"></i> 
//  </Link>

//   <Link> 
//   <i className="fa-brands fs-4 pointer mx-2 text-secondary fa-twitter"></i>
//   </Link>

//   <Link target="_blank" {link.name === "instagram" ? to={link.link} : ""}> 
//   <i className="fa-brands fs-4 pointer mx-2 text-danger fa-instagram"></i>
//   </Link>

//   <Link>
//   <i className="fa-brands fs-4 pointer mx-2 text-info fa-linkedin"></i>
//   </Link>

//   <Link>
//   </Link>

//   <Link target="_blank" to={link.name === "whatsapp" ? link.link : ""}>
//   <i className="fa-brands fs-4 pointer mx-2 text-success fa-whatsapp"></i>
//   </Link> 