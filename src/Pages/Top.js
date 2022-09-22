import React, { useState } from 'react'
import { BrowserRouter as Router,Link } from "react-router-dom";
import {Input} from 'antd'
import 'antd/dist/antd.css'
import { Orbis } from "@orbisclub/orbis-sdk"


const{Search}=Input;

let orbis = new Orbis();

export default function Top() {

	/** The user object returned by the connect function can be stored in state */
	const [user, setUser] = useState()
    const[ensName,setEnsName]=useState()


	/** Calls the Orbis SDK and handle the results */
	async function connect() {
        let res = await orbis.connect();

		/** Check if connection is successful or not */
		if(res.status == 200) {
            console.log("连接成功")
            console.log(res)
            setUser(res.details.profile.username)
            setEnsName(res.details.metadata.ensName);		
		} else {
			console.log("Error connecting to Ceramic: ", res);
			alert("Error connecting to Ceramic.");
		}
	}
    async function logout(){
        let res = await orbis.logout()
        console.log(res)
    }

	return(
            <div className="head" >
            <div  className="logo" style={{width:"14%",marginLeft:"1%"}}>
                    <Link to="/" style={{fontSize:18,color:"#d5d5d5",fontWeight:"bold"}}>
                        LESSREADS  </Link>
                    </div>
            <div className="write" style={{width:"70%",display:"flex",fontWeight:"bold",color:"#d5d5d5"}}> 
                <Link style={{width:"24%",color:"white"}} to="/Write">Write</Link>
                <Link style={{width:"24%",color:"white"}} to="/community">Community</Link>
                <Link style={{width:"24%",color:"white"}} >Information</Link>
            </div>
           

            <div  className="wallet " style={{width:"14%",marginRight:"1%",textAlign:"right"}}>
                <div>
                {user ?
                    <p> <Link to="/Personal"> {user} &nbsp;</Link> <button>{ensName}</button><button onClick={()=>logout()} style={{border:"none",background:"none"}}>logout</button>
                    </p> 
                :
                    <button onClick={() => connect()}>Connect</button>
                }
            </div>
                    </div>
                    </div>


	)

}



