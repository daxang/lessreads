import React, { useState,useEffect } from 'react'
import { Layout,Collapse,Input,Button,Modal, Divider} from 'antd'
import 'antd/dist/antd.css'
import { Orbis } from "@orbisclub/orbis-sdk";
import { Link } from 'react-router-dom';

/** Initialize the Orbis class object */
let orbis = new Orbis()

function Personal(){

    const[user,setUser]=useState()

    const[show,setShow]=useState(false)
    //const[showno,setShowno]=useState(true)

    const[showCreateWorld,setShowCreateWorld]=useState(false)
    //const[showNoCreateWorld,setShowNoCreateWorld]=useState(true)

    const[channels,setChannels]=useState()
    const channels0=[]
    async function getUserData(){
        let res = await orbis.isConnected()
        if(res.status == 200) {
            console.log("连接成功")
            console.log(res)
            if(res.details.profile.username){
                setUser(res.details.profile.username)
            }else{
                setUser(res.details.metadata.ensName);
            }
			
		} else {
			console.log("Error connecting to Ceramic: ", res);
			alert("Error connecting to Ceramic.");
		}
    }

    useEffect(()=>{
        getUserData()
        getGroup()
    })

    async function createUni(){
        let res = await orbis.createGroup({
            pfp: "",
            name: "Universe"
        });
        if(res.status==200){
            console.log(res)
        }else{
            console.log("failed")
        }
    }

        
    async function createWorlds(){
        console.log("开始创造世界")
        const name = document.getElementsByTagName("input")[0].value
        console.log(name)
        let res = await orbis.createChannel(
            "kjzl6cwe1jw146k66vx5m39yxwp0i12gdifop9cq43e2h29psfxpip6qt2lurdy",
            {
              group_id:"kjzl6cwe1jw146k66vx5m39yxwp0i12gdifop9cq43e2h29psfxpip6qt2lurdy",
              pfp: "",
              name: name,
              description: "Official place to discuss Orbis related stuff."
            }
          );
        if(res.status==200){
            console.log(res)
        }else{
            console.log("failed")
        }
    }

    async function getGroup(){
        console.log("开始获取group")
        let { data, error } = await orbis.getGroup("kjzl6cwe1jw146k66vx5m39yxwp0i12gdifop9cq43e2h29psfxpip6qt2lurdy")
        if(data){
            const channels00=data.channels
            console.log(channels00)
           for(var i=0;i<channels00.length;i++){
               channels0.push(channels00[i].stream_id)
         }

         for(var a=0;a<channels0.length;a++){
            let { data1, error1 } = await orbis.getChannel(channels0[a])
            if(data){
                console.log("正在挨个获取channel")
                console.log(data)
            }
         }
        }
        console.log({data,error})
    }
  /*   async function getUni(){
        let { data, error } = await orbis.getGroup(group_id)

    }     */
    function showModal(){
        setShow(true)
    }
    function showNoModal(){
        setShow(false)
    }

    function showCreate(){
        setShowCreateWorld(!showCreateWorld)
    }



    return(
        <div style={{background:"white",minHeight:"1200px",paddingLeft:"12px"}}>
            <div className='personalInfo' style={{marginBottom:"20PX"}}>
                <h2>Profile</h2>
                <div>
                    <span></span>
                    {user}
                </div>
                <div> {show ? <p>
                    <Input className="input" placeholder='username'></Input>
                    <Input className="input" placeholder='bio'></Input>
                    <button >submit</button>
                    <button onClick={()=>showNoModal()}>cancel</button>
                </p>:<button onClick={()=>showModal()} >edit</button>}</div>
            </div>
            <Divider></Divider>
            <div className='personalWorlds' style={{marginTop:"20px"}}>
                <h2>Worlds</h2>
                <div>
                    <h3>My Worlds</h3>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div style={{width:"30%",display:"flex",justifyContent:"space-between",background:"white"}} >
                        <div style={{width:"35%"}}>
                            <img src='http://i.miaosu.bid/data/f_28005676.jpg' style={{width:"100%"}}  /> 
                        </div>
                        <div style={{width:"65%",paddingLeft:10,color:"#778087"}}>
                            <header><Link to="/oneworld/" style={{color:"#778087",fontSize:"10px"}}>赊刀人之宝藏现身</Link></header> 
                            <div style={{marginTop:"50px"}}><Link to="/write" >去创作</Link></div>
                        </div>
                    </div>
                       <div style={{width:"50%"}}>
                        <div>{showCreateWorld ? <p>
                            <Input className="input" placeholder='new world' style={{width:"50%"}}></Input>
                            <div style={{marginTop:"10px"}}>  
                                <Button onClick={()=>showCreate()}>cancel</Button>&nbsp; &nbsp;
                                <Button onClick={()=>createWorlds()}>submit</Button></div>
                        </p>:<Button type="primary" shape="round" onClick={()=>showCreate()} >create a new world</Button>}</div>
                       </div>
                       
                    </div>
                </div>

            </div>

            <div>

            </div>

        </div>
    )
}

export default Personal;