import React, { useState,useEffect } from 'react'
import { Layout,Collapse,Input,Button,Modal, Divider,List} from 'antd'
import 'antd/dist/antd.css'
import { Orbis } from "@orbisclub/orbis-sdk";
import { Link } from 'react-router-dom';
import { shortAddress } from './utils';
/** Initialize the Orbis class object */
let orbis = new Orbis()
const { TextArea } = Input
function Personal(){
    const firstmen=["0xf940a19af21da9b77a134ddf4aa20453489d96f6","0x6fD008cefF57E1A1E579cCba51735CED0D9430D2","0x985a91d213A29A1377E1626B6d27f30368C1D8bB","0x6d84347Bf42aB41b4F9086B003f425Ea1ead712A","0xae68C01A5b4B964554298d63E0CE8dA7c59E3b42"]
    const[user,setUser]=useState()
    const[address,setAddress]=useState()
    const[show,setShow]=useState(false)
    const[showCreateWorld,setShowCreateWorld]=useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[finalchannels,setFinalchannels]=useState()

    const isShowModal = () => {
    setIsModalOpen(true);
    };

    const handleCancel = () => {
    setIsModalOpen(false);
    };

    const channels=[]
    const channels0=[]
    async function getUserData(){
        let res = await orbis.isConnected()
        if(res.status == 200) {
            console.log("连接成功")
            console.log(res)
            let add=res.did.slice(17,59).toLowerCase()
            
            console.log(add)
            console.log(firstmen.includes(add))
            if(firstmen.includes(add)){
                setShowCreateWorld(true)
            }
            if(res.details.profile){
                setUser(res.details.profile.username)
            }else{
                setUser(add)
            }
        }else{
            setUser()
            setAddress()
        }
    }

    useEffect(()=>{
        getUserData()
        getchannels()
    },[user])

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

    async function updatePersonal(){
        var username=document.getElementById("username").value
        var bio=document.getElementById("bio").value
        if(username||bio){
            let res = await orbis.updateProfile({
                username: username,
                description:bio
              });
              if(res){
                console.log(res)
                setShow(false)
              }else{
                console.log("更新失败")
              }
        }
    }
        
    async function createNewWorld(){
        console.log("开始创造世界")
        var newworldname = document.getElementById("newworldname").value
        var newworldinfo=document.getElementById("newworldinfo").value
       if(newworldname){
        let res = await orbis.createChannel(
            "kjzl6cwe1jw146k66vx5m39yxwp0i12gdifop9cq43e2h29psfxpip6qt2lurdy",
            {
              group_id:"kjzl6cwe1jw146k66vx5m39yxwp0i12gdifop9cq43e2h29psfxpip6qt2lurdy",
              pfp: "",
              name: newworldname,
              description: newworldinfo
            }
          );
        if(res.status==200){
            console.log(res) 
            setIsModalOpen(false)
            console.log("生成成功")
        }else{
            console.log("failed")
        }
       }
       
    }

    async function getchannels(){
        console.log("开始获取group")
        let { data, error } = await orbis.getGroup("kjzl6cwe1jw146k66vx5m39yxwp0i12gdifop9cq43e2h29psfxpip6qt2lurdy")
        if(data){
            const channels00=data.channels.slice(1)
            console.log(channels00)
            setFinalchannels(channels00)}

    }

   /* async function getChannels(channelid){
        let{data,error}=await orbis.getChannel(channelid)
        if(data){
            console.log(data)
            var channelid=data.stream_id
            var channelname=data.content.name
            var channelinfo=data.content.description
            var creator=data.creator.slice(17,59)
        console.log(channels)
        if(channelid!="kjzl6cwe1jw14b7pqvj2bg9zce3gkb57bfpi9i1vublq57eix4jap8w0ndm62bh"){
            if(firstmen.includes(creator)){
                channels.push({channelid:channelid,chanchannelname:channelname,channelinfo:channelinfo,creator:creator})
            }
        }
           
        }
    }*/
  /*   async function getUni(){
        let { data, error } = await orbis.getGroup(group_id)

    }     */
    
    const showModal = () => {
        setShow(true);
        };
    const showNoModal=()=>{
        setShow(false)
    }

    return (
        <div style={{background:"white",minHeight:"1200px",paddingLeft:"12px"}}>
            <div className='personalInfo' style={{marginBottom:"20PX"}}>
                <h2>Profile</h2>
                <div>
                    <span></span>
                    {user}
                </div>
                <div> {show ? <p>
                    <Input className="input" id="username" placeholder='username'></Input>
                    <Input className="input" id="bio" placeholder='bio'></Input>
                    <button onClick={()=>updatePersonal()}>submit</button>
                    <button onClick={()=>showNoModal()}>cancel</button>
                </p>:<button onClick={()=>showModal()} >edit</button>}</div>
            </div>
            <Divider></Divider>
            <div className='personalWorlds' style={{marginTop:"20px"}}>
                <h2>Worlds</h2>
                <div style={{width:"50%"}}>
                    {finalchannels?<List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={finalchannels}
                        renderItem={item => (
                            <List.Item >
                                     <div className="source">
                                        <a >
                                            <Link to={ '/oneworld/'+item.stream_id} style={{color:"black"}}>{item.content.name}</Link> 
                                            </a>
                                      
                                    </div>
                                
                                 <div style={{width:"3%",fontSize:"10px",textAlign:"right",marginLeft:"2%",color:"gray"}}>
                                        
                                            <Link style={{width:"100%",textAlign:"right"}} to={"/write/"+item.stream_id}>
                                                write</Link>
                                    </div>
                                    
                            
                            </List.Item>
                        )}
                    />:<div ></div>}
                        <div style={{width:"50%"}}>
                        {showCreateWorld? <div><Button type="primary" shape="round" onClick={isShowModal} >create a new world</Button></div>:<div></div>}
                        <Modal title="Your new world" open={isModalOpen} onOk={createNewWorld} onCancel={handleCancel}>
                            <Input placeholder='name of the new world' style={{marginBottom:"10px"}} id="newworldname"></Input>
                            <TextArea placeholder='some info about this new world' id="newworldinfo" ></TextArea>
                        </Modal>
                       </div>
                    </div>
                </div>

            </div>




    )
}

export default Personal;