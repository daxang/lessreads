import React, { useEffect, useState,createContext,useContext } from 'react'
import { BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";



import 'antd/dist/antd.css'
import { Orbis } from "@orbisclub/orbis-sdk"
import { shortAddress } from './Pages/utils/index';
import App from "./Pages/App"
import Write from './Pages/Write'
import OneWorld from  './Pages/OneWorld'
import Chapter from  './Pages/Chapter'
import Personal from  './Pages/personal'
import Worlds from  './Pages/worlds'
import Community from  './Pages/Community'
import Edit from  './Pages/Edit'
import {Col, Layout, Row} from 'antd'
import 'antd/dist/antd.css'
import './App.css'

let orbis = new Orbis();


const { Footer} = Layout;

export const Userinfo=createContext()
export const Userinfos=()=>useContext(Userinfo)

export default function AppRouter() {
   // const [user, setUser] = useState()
   // const[ensName,setEnsName]=useState()
   // const[address,setAddress]=useState()
    const[userinfos,setUserinfos]=useState({})
    const[showusername,setShowusername]=useState()

	/** Calls the Orbis SDK and handle the results */
	async function connect() {
        let res = await orbis.connect();

		/** Check if connection is successful or not */
		if(res.status === 200) {
            console.log("连接成功")
            console.log(res)
            let add=res.did.slice(17,59)
            console.log(add)
            let add_=shortAddress(add)
           // setAddress(add_)
           if(res.details.profile)
           {
            setUserinfos({username:res.details.profile.username,userid:res.did,userens:res.details.metadata.ensName,userdes:res.details.profile.description,useradd:add,usershortadd:add_})
            setShowusername(true)
	}
           else{
            setUserinfos({userid:res.did,userens:res.details.metadata.ensName,useradd:add,usershortadd:add_})
            setShowusername(false)
           }
           
		} else {
			console.log("Error connecting to Ceramic: ", res);
		}
	}
   async function getUserData(){
        let res = await orbis.isConnected()
        if(res.status === 200) {
            console.log("连接成功")
            console.log(res)
            let add=res.did.slice(17,59)
            console.log(add)
            let add_=shortAddress(add)
           // setAddress(add_)
           if(res.details.profile)
           {
            setUserinfos({username:res.details.profile.username,userid:res.did,userens:res.details.metadata.ensName,userdes:res.details.profile.description,useradd:add,usershortadd:add_})
            setShowusername(true)
	}
           else{
            setUserinfos({userid:res.did,userens:res.details.metadata.ensName,useradd:add,usershortadd:add_})
            setShowusername(false)
           }
           
		} else {
			console.log("Error connecting to Ceramic: ", res);
            setUserinfos(false)

		}
       

    }
    useEffect(()=>{
        getUserData()},[]
  )
    async function leave(){
        let res = await orbis.logout()
        console.log(res)
        getUserData()
      
    }

        return (
            <Router>
                <Userinfo.Provider value={userinfos}>     
                     <div className="head" >
                        <div  className="logo" style={{width:"14%",marginLeft:"1%"}}>
                                <Link to="/" style={{fontSize:18,color:"#d5d5d5",fontWeight:"bold"}}>
                                    LESSREADS  </Link>
                                </div>
                        <div className="write" style={{width:"70%",display:"flex",fontWeight:"bold",color:"black"}}> 
                            <Link style={{width:"24%",color:"black"}} to="/community">Community</Link>
                            <Link style={{width:"24%",color:"black"}} >Information</Link>
                        </div>
                    

                        <div  className="wallet " style={{width:"14%",marginRight:"1%",textAlign:"right"}}>
                            <div>
                                {showusername?<p> <Link to="/Personal"> {userinfos.username} &nbsp;</Link> <button onClick={()=>leave()} style={{border:"none",background:"none"}}>logout1 </button>
                                </p>: <span></span>}
                                {userinfos&&!userinfos.username?<p>  <Link to="/Personal">{userinfos.usershortadd}</Link ><button onClick={()=>leave()} style={{border:"none",background:"none"}}>logout2</button>
                                </p>:<span></span>}
                            
                            {!userinfos?  <button onClick={() => connect()}>Connect</button>:<span></span>
                            }
                        </div>
                                </div>
                                </div>
                    <main style={{width:"70%",marginLeft:"15%",background:"#EDF4EC"}}>
                        <div className="booklist " style={{width:"100%"}}>
                            <Routes>
                            <Route path="/" exact element={<App/>}></Route>
                            <Route path="/write/:channel_id" element={<Write />} />
                            <Route path="/worlds/:world_id" element={<OneWorld />} />
                            <Route path="/Chapter/:post_id" element={<Chapter />} />
                            <Route path="/Personal" element={<Personal />} />
                            <Route path="/Worlds" element={<Worlds />} />
                            <Route path="/Community" element={<Community />} />
                            <Route path="/Edit/:post_id" element={<Edit />} />
                            </Routes>

                        </div>
                    </main>
                    <footer  style={{ textAlign: 'center',fontWeight:"bold",fontSize:"10px",marginTop:"30px",paddingTop:"30px",paddingBottom:"30px",background:"#545652",color:"gray"}}>
                      <p style={{fontSize:"14px"}}>quillink.eth@mail3.me  </p>
                      <p>ANYTHING & ANYTIME</p>      
                      <p >WE LOVE STORIES & STORY TELLERS</p>    
                        </footer>
                        </Userinfo.Provider>  
            </Router>
        )
    
}


