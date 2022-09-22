import React, { useState, useEffect} from 'react'
import { BrowserRouter as Router, useLocation,Link  } from "react-router-dom";
import {Col, Layout, Row,Input} from 'antd'
import 'antd/dist/antd.css'
import { Orbis } from "@orbisclub/orbis-sdk"
import moment from "moment"
let orbis = new Orbis();


export default function Chapter () {
    const[user,setUser]=useState()
    const[post,setPost]=useState()
    const[title,setTitle]=useState()
    const[date,setDate]=useState()
    const[channel,setChannel]=useState()
    const[channelname,setChannelname]=useState()
    const[prepost,setPrepost]=useState()
    const[prelink,setPrelink]=useState()
    const[laterpost,setLaterpost]=useState()
    const[laterlink,setLaterlink]=useState()


    const location=useLocation()
    const postId=location.pathname.slice(9)


    const postInfos =[]

    async function getUserData(){
        let res = await orbis.isConnected()
        setUser(res.did)
        console.log("获取成功")
    }
    async function getChapter(){
        let {data,error}= await orbis.getPost(postId)
        if(data){
            console.log("这是本篇的数据"+data)
            console.log(data)
            var time=data.timestamp
            var time001 =moment(time*1000).format("yyyy-mm-dd hh:mm:ss")
            setPost(data.content.body)
            setTitle(data.content.title)
            setChannel(data.context)
            setDate(time001)
            setChannelname(data.context_details.channel_details.name)
            
        }
    }
    async function getCataLog(){
        let { data, error } = await orbis.getPosts({
            context: channel
        })
        if(data){
            console.log("拿到的文章列表数据是:"+data)
            console.log(data)
            for(var i=0;i<data.length;i++){
                var id=data[i].stream_id
                var title1=data[i].content.title

                //var time01=new Date(time)
                postInfos.push({id:id,title:title1})
            }
            var keys=postInfos.findIndex((v)=>{
                return v.id == postId
            })

            if(keys!=0){
                setPrepost(postInfos[keys-1].title)
                setPrelink(postInfos[keys-1].id)
            }else{
                console.log("hi")
                setPrepost(null)
            }

            if(keys!=postInfos.length-1){
                setLaterpost(postInfos[keys+1].title)
                setLaterlink(postInfos[keys+1].id)
            }else{
                setLaterpost(null)
            }
            

            console.log("事实是事实四")
            
            console.log(prepost)
            console.log(laterpost)

        }else(
            console.log("wrong")
        )}

    useEffect(()=>{
        getUserData()
        getChapter()
        getCataLog()
        })

      
          return (
                  <div style={{background:"white",paddingLeft:"12px"}} >  
                    <div style={{background:"#F3F9F1",height:"40px",lineHeight:"40px",paddingLeft:"12px",marginLeft:"-12px"}}>
                        <Link to={"/oneworld/"} style={{fontSize:"14px",color:"gray"}}>Back to <span style={{color:"purple",fontWeight:"bold"}}>{channelname}</span></Link>
                        </div>     


                   <div style={{display:"flex",justifyContent: "space-between",marginTop:"20px",paddingRight:"12px"}}>
                    {laterpost ?
                        <Link style={{color:"#778087"}} to={ '/chapter/'+laterlink}>{laterpost}</Link>
                        : <span></span>
                        }
                    
                    {prepost ?
                    <Link to={ '/chapter/'+prelink}>{prepost}</Link>
                    : <span></span>
                    }
                    </div>

                    <div style={{marginTop:"20px"}}>
                        <div style={{fontSize:"24px",fontWeight:"bold",textAlign:"center"}}>{title} </div>
                        <div style={{textAlign:"center"}}>{date} </div>
                        <div  dangerouslySetInnerHTML={{__html: post}} style={{marginTop:"30px",paddingRight:"12px"}}></div>
                    </div>
                 
                  </div>  
  
               
          )
}





