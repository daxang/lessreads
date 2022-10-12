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
    const [status, setStatus] = useState();
    
    const[loading,setLoading]=useState(false)
    const[noAccess,setNoAccess]=useState(false)

    const[contract, setContract]=useState()
    const[explorerLink,setExplorerLink]=useState()

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
            setTitle(data.content.title)
            setDate(time001)
            setChannel(data.context)
            setChannelname(data.context_details.channel_details.name)
            getCataLog(data.context)
            if(data.content?.body){
                setPost(data.content.body)
                setNoAccess(false)
        
            }
            else if(data.content?.encrypteBody?.encryptedString != {}){
                let res = await orbis.decryptPost(data.content);
                console.log(res)
                setLoading(true)
                let _access = JSON.parse(data.content.encryptedBody.accessControlConditions);
                if(_access && _access.length > 0) {
                let contract = _access[0].contractAddress;
                setContract(contract);
                setExplorerLink("https://etherscan.io/address/" + contract);
                }
            
                /** Save in state */
                if(res.status == 300) {
                setStatus(300)
                setLoading(false)
                setNoAccess(true)

                } else {
                setPost(res.result)
                setLoading(false)
                setNoAccess(false)
                }
            } else {
                return null;
            }

          }
            
        }
    
    async function getCataLog(channelid){
        let { data, error } = await orbis.getPosts({
            context: channelid
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
            
            console.log(prepost)
            console.log(laterpost)

        }else(
            console.log("wrong")
        )}

    useEffect(()=>{
        getUserData()
        getChapter()
      //  getCataLog()
        },[postId])

      
          return (
                  <div style={{background:"white",paddingLeft:"12px",border:"1px solid lightgray"}} >  
                    <div style={{background:"#F3F9F1",height:"40px",lineHeight:"40px",paddingLeft:"12px",marginLeft:"-12px"}}>
                        <Link to={"/oneworld/"+channel} style={{fontSize:"14px",color:"gray"}}>Back to <span style={{color:"purple",fontWeight:"bold"}}>{channelname}</span></Link>
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

                    <div style={{marginTop:"20px",minHeight:"1000px",paddingBottom:"30px"}}>
                        <div style={{fontSize:"24px",fontWeight:"bold",textAlign:"center"}}>{title} </div>
                        <div style={{textAlign:"center"}}>{date} </div>
                        {loading ? <div>decrypting the content</div>:<div></div>}
                        {noAccess ?<p>sorry, the content is token-gated by contract:<a href={explorerLink}>{contract}</a>,you have no tokens to decrypt it</p>:<p></p>}
                        <div  dangerouslySetInnerHTML={{__html: post}} style={{marginTop:"30px",paddingRight:"12px"}}></div>
                    </div>
                 
                  </div>  
  
               
          )
}





