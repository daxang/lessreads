import React, { useState, useEffect,createContext,useContext } from 'react'
import { BrowserRouter as Router, Route,Redirect,Link,withRouter,useLocation  } from "react-router-dom";
import {
    DeleteOutlined ,
    EditOutlined
  } from '@ant-design/icons';
import {Col, Layout, Row,Input,List,Card,Divider,Tag,Space,Modal,Button  } from 'antd'
import 'antd/dist/antd.css'
import { Orbis } from "@orbisclub/orbis-sdk"
import moment from "moment"
import{Userinfo}from "../AppRouter"

let orbis = new Orbis();
const { TextArea } = Input
export default function OneWorld() {
    const location=useLocation()
    const worldId=location.pathname.slice(8)
    const [catalog,setCatalog]=useState()
 //   const localinfo=localStorage.getItem("ceramic-session")
    const postInfos =[]
    const [showedit,setShowedit]=useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

   // const[userid,setUserid]=useState(null)
    const userinfos=useContext(Userinfo)
    console.log("userinfos是"+userinfos)
    console.log(userinfos)
    const [worldname,setWorldname]=useState()
    const [worlddes,setWorlddes]=useState()
    const [universeid,setUniverseid]=useState()
    const [creator,setCreator] =useState()

    const[showCatalog,setShowCatalog]=useState()

    async function getUserData(){
        let res = await orbis.isConnected()
        if(res){
            setShowCatalog(true)
            console.log("获取成功")
        }else{
            setShowCatalog(false)
        }

    }
    useEffect(()=>{
        getThisChannel()
        getCatalog()
        getUserData()
      
       // console.log(Userinfos())
        console.log("userid是"+userinfos)
        console.log("先执行我么")
    },[userinfos])

    async function getThisChannel(){
        let { data, error } = await orbis.getChannel(worldId)
        if(data){
            console.log("看看creator的信息")
            console.log(data)
            setShowedit(data.creator==userinfos.userid)
            getcreator(data.creator)
            setWorldname(data.content.name)
            setWorlddes(data.content.description)
            setUniverseid(data.content.group_id)
        }
    }
    async function getcreator(creatorid){
        let { data, error } = await orbis.getProfile(creatorid)
        console.log("getcreator")
        if(data){
            console.log(data)
            if(data.username)
            {setCreator(data.username)}
            else{
                setCreator(data.did.slice(17,59))
            }
        }
    }
    async function getCatalog(){
            let { data, error } = await orbis.getPosts({
                context: worldId
            })
            if(data){
                console.log("data数据是:"+data)
                console.log(data)
                console.log(data[0].timestamp)
                setCreator(data[0].creator)
                for(var i=0;i<data.length;i++){
                    var time=data[i].timestamp
                    var time001 =moment(time*1000).format("yyyy-mm-dd hh:mm:ss")

                    var id=data[i].stream_id
                    var title=data[i].content.title
                    var post =data[i].content.body
                    var creator =data[i].creator
                    //var time01=new Date(time)
                    postInfos.push({id:id,title:title,post:post,date:time001})
                }
                console.log("开始剪掉")
                console.log(postInfos)
                if(postInfos.length>data.length){
                    console.log("剪掉")
                  var list= postInfos.slice(0,data.length)
                  setCatalog(list)
                    console.log(list)
                }else{
                    setCatalog(postInfos)
                }

              //let time03 =time02.toLocaleDateString().replace(/\//g, "-") + " " + time01.toTimeString().substr(0, 8)
               // setCatalog(data)
    
            }else(
                console.log("wrong")
            )
        }
 
     const  isShowModal=()=>{
            setIsModalOpen(true)
        }

    const handleCancel = () => {
    setIsModalOpen(false);
    };

    async function submiteditworld(){
        console.log("开始提交世界更新")
        var editworldname = document.getElementById("editworldname").value
        var editworldinfo=document.getElementById("editworldinfo").value
        if(!editworldinfo&&!editworldname){
            alert("all are void")
        }else{
            console.log(universeid)
            let res = await orbis.updateChannel(
                worldId,
                {
                    group_id:universeid,
                  name: editworldname,
                  description: editworldinfo
                }
              )
            if(res){
                console.log(res)
                setIsModalOpen(false)
            }
        }




    }

    async function deletepost(postid){
        let res = await orbis.deletePost(postid)
        console.log(res)
    }

	return(
            <div className="oneworld" style={{boxShadow:"0 0 10px #000",background:"white",paddingTop:"40PX"}}>
                    <h2 style={{fontSize:"24px",fontWeight:"bold",textAlign:"center",width:"100%"}}>
                            {worldname}
                            
                        </h2>
                        <div style={{textAlign:"right",paddingRight:"20px",marginTop:"-30PX"}}>
                        {showedit? <div><Button type="link" shape="round" onClick={isShowModal} >edit</Button></div>:<div></div>}
                        </div>
                        
                        <Modal title={"edit  "+worldname} open={isModalOpen} onOk={submiteditworld} onCancel={handleCancel}>
                            <Input defaultValue={worldname} style={{marginBottom:"10px"}} id="editworldname"></Input>
                            <TextArea defaultValue={worlddes} id="editworldinfo" ></TextArea>
                        </Modal>
                    <div
                        style={{
                            paddingLeft:"10px",paddingRight:"10px", textAlign: 'center',marginTop:"40px",marginBottom:"40px",color:"#ff9e2c"}}
                        >
                        <p  style={{ textAlign: 'center',fontSize:12,marginTop:"10px",marginBottom:"30PX"}}>
                            <a style={{fontSize:"16px",fontWeight:"bold",color:"purple"}}>{creator}</a>
                        </p>
                        <p style={{textAlign:"center",color:"darkGray",fontSize:12,marginTop:"15px"}}>
                        {worlddes}
                        </p>
                            
                   
                    </div>
                    <div style={{textAlign:"center"}}>
                        <Tag color="#f50">fiction</Tag>
                        <Tag color="#2db7f5">fantasy</Tag>
                        <Tag color="#87d068">conspiracy</Tag>
                        <Tag color="#108ee9">offical</Tag>
                    </div>

                <div style={{minHeight:1000,background:"white",marginTop:"30px"}}> 
                   <div style={{height:"30px",lineHeight:"30px",background:"lightgray",paddingLeft:"10px",fontSize:"14px",fontWeight:"BOLD"}} >Catalog
                 </div>
                 {userinfos?<List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={catalog}
                        renderItem={item => (
                            <List.Item >
                                <div className="content-list">
                                     <div className="source">
                                        <a >
                                            <Link to={ '/chapter/'+item.id} style={{color:"black"}}>{item.title}</Link> 
                                            </a>
                                      
                                    </div>
                                    <div style={{width:"100%",display:"flex",justifyItems:"flex-start"}}>
                                    <div style={{width:"95%",fontSize:"10px",paddingLeft:"15px",paddingRight:"12px",marginTop:"5px"}}>
                                        <a style={{lineHeight:"15px",fontSize:"11px",fontWeight:"light",color:"black"}} dangerouslySetInnerHTML={{__html:item.post.slice(0,200).replace(/s/g,"")}}></a>
                                        <span style={{marginTop:"-7px"}}>.........</span>
                                        <p style={{color:"gray"}}>posted at :&nbsp;&nbsp;{item.date}</p>
                                    </div>
                                  {showedit?<div style={{width:"3%",fontSize:"10px",textAlign:"right",marginLeft:"2%",color:"gray"}}>
                                            <Link style={{width:"100%",textAlign:"right"}} to={"/edit/"+item.id}  >
                                                <Space style={{width:"100%",textAlign:"right",color:"gray"}} >
                                                <EditOutlined />
                                                </Space></Link>
                                            <br></br>
                                            <Link style={{width:"100%",textAlign:"right"}} onClick={()=>deletepost(item.id)}>
                                                <Space  style={{width:"100%",textAlign:"right",color:"gray"}}>
                                                <DeleteOutlined />
                                                </Space></Link>
                                        </div>:<div></div> }  
                                    </div>
                                    
                                </div>
                            
                            </List.Item>
                        )}
                    />:<div style={{width:"30%",height:"30px",lineHeight:"30px",margin:"10px auto",background:"red",textAlign:"center",borderRadius:"3PX"}}>
                       CONNECT YOUR WALLET</div>}
               
                </div>
                    
                    </div>
	)

}

