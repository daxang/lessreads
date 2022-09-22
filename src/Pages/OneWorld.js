import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route,Redirect,Link,withRouter,useLocation  } from "react-router-dom";
import {Col, Layout, Row,Input,List,Card,Divider,Tag  } from 'antd'
import 'antd/dist/antd.css'
import { Orbis } from "@orbisclub/orbis-sdk"
import moment from "moment"

let orbis = new Orbis();

export default function OneWorld() {
    const[user,setUser]=useState()

    const location=useLocation()

    const worldId=location.pathname.slice(10)

    async function getUserData(){
        let res = await orbis.isConnected()
        setUser(res.did)
        console.log("获取成功")
    }
   const [catalog,setCatalog]=useState()

   const postInfos =[]

   const [creator,setCreator] =useState()

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
                    postInfos.push({id:id,title:title,post:post,creator:creator,date:time001})
                }
                setCatalog(postInfos)
                console.log("NIHAO"+postInfos)
                console.log(catalog)
              //let time03 =time02.toLocaleDateString().replace(/\//g, "-") + " " + time01.toTimeString().substr(0, 8)
               // setCatalog(data)
    
            }else(
                console.log("wrong")
            )
        }
    useEffect(()=>{
        console.log(location.pathname)
        console.log(worldId)
        getUserData()
        getCatalog()

    })

	return(
            <div className="oneworld" style={{boxShadow:"0 0 10px #000",background:"white",paddingTop:"40PX"}}>
                    <h2 style={{fontSize:"24px",fontWeight:"bold",textAlign:"center"}}>
                        赊刀人之宝藏现身
                    </h2>
                    <div
                        style={{
                            paddingLeft:"10px",paddingRight:"10px", textAlign: 'center',marginTop:"40px",marginBottom:"40px",color:"#ff9e2c"}}
                        >
                        <p  style={{ textAlign: 'center',fontSize:12,marginTop:"10px",marginBottom:"30PX"}}>
                            <a style={{fontSize:"16px",fontWeight:"bold",color:"purple"}}>fisher</a>
                        </p>
                        <p style={{textAlign:"center",color:"darkGray",fontSize:12,marginTop:"15px"}}>
                            “用我无穷无尽的可能，拯救你无所事事的人生。我们这里是一个解脱和治愈的地方——八周年人生挑战：沉浸式体验别人的人生，赢了便从此拥有无限人生卡，拥抱这无穷无尽的可能。”
                        </p>
                            
                        <p style={{textAlign:"center",color:"darkGray",fontSize:12}}>

                            “我...参加吧。”50次绝望边缘打卡时，我坠入了荧光蓝色的无限世界，走入了别人的困境与高光时刻——

                            </p>

                        <p style={{textAlign:"center",color:"darkGray",fontSize:12}}>

                        只是离开的那天，新的故事也继而开始：
                        </p>

                        <p style={{textAlign:"center",color:"darkGray",fontSize:12}}>

                        原来我们碌碌终日、疲于奔命的人生，不过是有些人一掷千金的一场游戏。</p>
                   
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
                 <List
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
                                    <div style={{width:"100%",fontSize:"10px",paddingLeft:"15px",paddingRight:"12px",marginTop:"5px"}}>
                                        <p style={{height:"38px",overflow:"hidden",textOverflow:"ellipsis",fontSize:"13px",fontWeight:"normal"}} dangerouslySetInnerHTML={{__html:item.post}}></p>
                                        <p style={{marginTop:"-10px"}}>.........</p>
                                        <p style={{color:"gray"}}>posted at :&nbsp;&nbsp;{item.date}</p>
                                    </div>
                                </div>
                            
                            </List.Item>
                        )}
                    />
                </div>
                    
                    </div>
	)

}

