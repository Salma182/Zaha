import axios from "axios";
import React, { useEffect, useState } from "react"
import Loading from "../Loading/Loading";

export default function Profile() {
    const token = localStorage.getItem('token');
 const userId = localStorage.getItem('userid')
const[userdata, setuserData] =useState('')
const [loading, setLoading] = useState(false)
const[orderData, setOrderData] =useState([])


    async function getUserData(userId){
        setLoading(true)
        try{
            const {data}= await axios.get(`https://zahaback.com/api/user/details/${userId}`,
                {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
            )
            setuserData(data.user)
            // //console.log(data.user)
        }catch(e){}
        finally{
            setLoading(false)
        }
    }

    async function getOrder(){
        setLoading(true)
        try{
            const {data}= await axios.get(`https://zahaback.com/api/user/orders`,
                {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
            )
            setOrderData(data.orders)
            //console.log(data.orders)
        }catch(e){}
        finally{
            setLoading(false)
        }
    }


    useEffect(() => {
        getUserData(userId);
      }, [userId]);

      useEffect(() => {
        getOrder()
    }, []);

    return ( 
        <>
                    
            {loading ? <Loading /> : (
            <div className="h-75 responsive container gold">
                <h1 className="text-center">Profile</h1>

                <div className="border p-4 rounded">
                <h4 className="mb-3">Name: {userdata.name}</h4>
                <h4>Email: {userdata.email}</h4>
                <h4>Phone: {userdata.phone}</h4>
                </div>

                <h1 className="text-center mt-3" >Order Details</h1>
                {orderData && orderData.length >0 ? (
                    orderData.map((order)=> {
                <div className="border p-4 rounded">
                <h4 className="mb-3">First Name: {order.first_name}</h4>
                <h4>Last Name: {order.products.id}</h4>
                <h4>Phone: {orderData.phone}</h4>
                </div>
                    })
                
            ) : ""}
                
          

            </div>
            )}
                
        </>
    )
}
