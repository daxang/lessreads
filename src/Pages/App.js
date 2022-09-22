import React from 'react'
import {  Route, Link,Redirect  } from "react-router-dom";
import { Divider,  Layout,  Button,Card, Col, Row} from 'antd'


import 'antd/dist/antd.css'
const { Header, Footer, Sider, Content } = Layout
const { Meta } = Card;

class App extends React.Component {

state = {
   
    thisistrue:true,
    thisisfalse:false
};


thistrue01(){

    this.thisistrue=true;
    this.thisisfalse=!this.thisistrue
}
thistrue02(){
    this.thisisfalse=true;
    this.thisistrue=!this.thisisfalse
}

/*<Button type="link" className={this.thisistrue?"primary":"gray"} onClick={()=>this.thistrue01()} >
<Link to="/book/alpha/page:1" >阿尔法    </Link></Button>
<Button  type="link"  className={this.thisisfalse?"primary":"gray"} onClick={()=>this.thistrue02()}>
    <Link to="/book/beta/page:1" >贝塔</Link></Button> 
    */
    render() {
        const {initLoading,loading,list,thisistrue,thisisfalse}=this.state;
        return (
                   <div  className="content-col" style={{width:"100%",postion:"absolute"}}>
                    <div className="worlds" style={{width:"100%",marginBottom:"10px"}}>
                        <div>
                            <h2 className='headers' style={{fontWeight:"bold"}}>Worlds</h2></div>
                        <div className='flex' style={{height:150,width:"100%",display:"flex",justifyContent:"space-between"}}  >
                           <div style={{height:"100%",width:"49.75%",display:"flex",justifyContent:"space-between",background:"white",border:"solid 1px lightgray"}} >
                                <div style={{width:"25%"}}>
                                    <img src='http://i.miaosu.bid/data/f_28005676.jpg' style={{height:"100%"}}  /> 
                                </div>
                                <div style={{width:"75%",paddingLeft:10}}>
                                    <header><Link to="/oneworld/kjzl6cwe1jw148fg1h9lbi0kseyif24zzegoipd3k9ra7vdk7otfz6iqc3awba0">赊刀人之宝藏现身</Link></header>
                                    <header style={{fontSize:12,fontWeight:"bold", color:"darkgray"}}>马后课&航师</header>
                                    <p style={{marginTop:10,fontSize:12,color:"darkgray"}}>大理三塔寺段氏皇陵地宫被人打开，主角历史学家高达被神秘人追杀，他在逃亡过程中追查真相，发现自己的家 族
                                        命运居然与世界最大的阴谋组织”赊刀人”有关......</p>
                                    <p style={{marginTop:15,fontSize:12,color:"darkgray"}}>阴谋论 幻想</p>
                                </div>
                           </div>

                           <div style={{height:"100%",width:"49.75%",display:"flex",justifyContent:"space-between",background:"white",border:"solid 1px lightgray"}} >
                                <div style={{width:"25%"}}>
                                    <img src='http://i.miaosu.bid/data/f_86248100.jpg' style={{height:"100%"}}  /> 
                                </div>
                                <div style={{width:"75%",paddingLeft:10}}>
                                    <header>赊刀人之宝藏现身</header>
                                    <header style={{fontSize:12,fontWeight:"bold", color:"darkgray"}}>马后课&航师</header>
                                    <p style={{marginTop:10,fontSize:12,color:"darkgray"}}>大理三塔寺段氏皇陵地宫被人打开，主角历史学家高达被神秘人追杀，他在逃亡过程中追查真相，发现自己的家 族
                                        命运居然与世界最大的阴谋组织”赊刀人”有关......</p>
                                    <p style={{marginTop:15,fontSize:12,color:"darkgray"}}>阴谋论 幻想</p>
                                </div>
                           </div>

                        </div>
                        <div className='flex' style={{height:150,width:"100%",display:"flex",justifyContent:"space-between",marginTop:5}}  >
                           <div style={{height:"100%",width:"49.75%",display:"flex",justifyContent:"space-between",background:"white",border:"solid 1px lightgray"}} >
                                <div style={{width:"25%"}}>
                                    <img src='http://i.miaosu.bid/data/f_40189706.jpg' style={{height:"100%"}}  /> 
                                </div>
                                <div style={{width:"75%",paddingLeft:10}}>
                                    <header>赊刀人之宝藏现身</header>
                                    <header style={{fontSize:12,fontWeight:"bold", color:"darkgray"}}>马后课&航师</header>
                                    <p style={{marginTop:10,fontSize:12,color:"darkgray"}}>大理三塔寺段氏皇陵地宫被人打开，主角历史学家高达被神秘人追杀，他在逃亡过程中追查真相，发现自己的家 族
                                        命运居然与世界最大的阴谋组织”赊刀人”有关......</p>
                                    <p style={{marginTop:15,fontSize:12,color:"darkgray"}}>阴谋论 幻想</p>
                                </div>
                           </div>

                           <div style={{height:"100%",width:"49.75%",display:"flex",justifyContent:"space-between",background:"white",border:"solid 1px lightgray"}} >
                                <div style={{width:"25%"}}>
                                    <img src='http://i.miaosu.bid/data/f_27475848.jpg' style={{height:"100%"}}  /> 
                                </div>
                                <div style={{width:"75%",paddingLeft:10,paddingTop:5}}>
                                    <header>赊刀人之宝藏现身</header>
                                    <header style={{fontSize:12,fontWeight:"bold", color:"darkgray"}}>马后课&航师</header>
                                    <p style={{marginTop:10,fontSize:12,color:"darkgray"}}>大理三塔寺段氏皇陵地宫被人打开，主角历史学家高达被神秘人追杀，他在逃亡过程中追查真相，发现自己的家 族
                                        命运居然与世界最大的阴谋组织”赊刀人”有关......</p>
                                    <p style={{marginTop:15,fontSize:12,color:"darkgray"}}>阴谋论 幻想</p>
                                </div>
                           </div>
                        </div>
                    </div>

                    <div className="news" style={{width:"100%",marginTop:"40px"}}>
                        <div>
                            <h2 className='headers' style={{fontWeight:"bold"}}>Infos</h2>
                        </div>
                        <Row style={{width:"100%",height:"40px",backgroundColor:"white",overflow:"hidden",padding:"4px",lineHeight:"40px"}}>
                            <Col flex={4} >Welcome to Quillink !</Col>
                            <Col flex={1} style={{textAlign:"right"}} >2022.08.09</Col>
                            </Row>
                        <Row style={{width:"100%",height:"40px",backgroundColor:"white",overflow:"hidden",padding:"4px",marginTop:"3px",lineHeight:"40px"}}>
                         <Col flex={4} >Write something , anytime, in here!</Col>
                         <Col flex={1} style={{textAlign:"right"}} >2022.08.09</Col>
                        </Row>
                        <Row style={{width:"100%",height:"40px",backgroundColor:"white",overflow:"hidden",padding:"4px",marginTop:"3px",lineHeight:"40px"}}>
                         <Col flex={4} >Coming, Quillink NFT! </Col>
                         <Col flex={1} style={{textAlign:"right"}} >2022.08.09</Col>
                        </Row>
                        <Row style={{width:"100%",height:"40px",backgroundColor:"white",overflow:"hidden",padding:"4px",marginTop:"3px",lineHeight:"40px"}}>
                         <Col flex={4} >Read and co-work with authors, then you will be creators!</Col>
                         <Col flex={1} style={{textAlign:"right"}} >2022.08.09</Col>
                        </Row>

                    </div>
                    

                    <div className="community" style={{marginTop:"40px"}}>
                        <h2 className='headers' style={{fontWeight:"bold"}}> Community</h2>
                        <div    style={{width:"100%",display:"flex",flexFlow:"row wrap",alignContent: "flex-start",boxShadow:"0 0 10px #000",borderCollapse:"collapse" }}  >
                         <div   style={{width:"50%",backgroundColor:"white",overflow:"hidden",border:"1px solid lightgray",borderCollapse:"collapse"}}>
                                <Card
                                type="inner"
                                title="pegpig#9867"
                                bordered={false}
                                style={{borderCollapse:"collapse"}}
                                >
                                <p style={{fontSize:11}}>So for those first seasons, the story/content didn't change, the only thing thatNetflix ordered additional seasons, and now they're some of
                                     the most watched TV shows ever. So for those first seasons, the story/content didn't change, the only thing that changed
                                      was distribution.t</p>
                                </Card>
                        </div>
                        <div  style={{width:"50%",backgroundColor:"white",overflow:"hidden",border:"1px solid lightgray",borderCollapse:"collapse"}}>
                                <Card
                                type="inner"
                                title="donnut#0988"
                                bordered={false}
                                style={{borderCollapse:"collapse"}}
                                >
                                <p style={{fontSize:11}}>Netflix ordered additional seasons, and now they're some of
                                     the most watched TV shows ever. So for those first seasons, the story/content didn't change, the only thing that changed
                                      was distribution.t</p>
                                </Card>

                        </div>
                      
                      

                         <div  style={{width:"50%",backgroundColor:"white",overflow:"hidden",border:"1px solid lightgray",borderCollapse:"collapse"}}>
                                <Card
                                type="inner"
                                title="Sarah#0988"
                                bordered={false}
                                >
                                <p style={{fontSize:11}}>.......Netflix essentially acquired them as "Originals," re-distributed the first season(s) via streaming, the shows 
                                    went viral, Netflix ordered additional seasons, and now they're some of
                                     the most watched TV shows ever. So for those first seasons, the story/content didn't change, the only thing that changed
                                      was distribution.</p>
                                </Card>
                        </div>
                        <div style={{width:"50%",backgroundColor:"white",overflow:"hidden",border:"1px solid lightgray"}}>
                                <Card
                                type="inner"
                                title="fisher#8976"
                                bordered={false}
                                >
                                <p style={{fontSize:11}}>I know the business a little from the European and Latam regions. The analytics most OTPS use are very similar. 
                                    Another thing they all have in common is they never release any other data than subs. We do not get to know real audiences 
                                    for any feature, what they tell you at most is how many subs have “seen” a feature, but the criteria for watching may be as 
                                    short as 30 seconds or one minute. </p>
                                </Card>
                        </div>

                         <div style={{width:"50%",backgroundColor:"white",overflow:"hidden",border:"1px solid lightgray"}}>
                                <Card
                                type="inner"
                                title="joe#3456"
                                bordered={false}
                                >
                                <p style={{fontSize:11}}>We agree about library content. My point is how many people subscribe to any streamer for a single original film that can’t be licensed elsewhere on SVOD? Squid Game was
                                     incredible. And Bridgerton was a phenom too. Are the  action features generating the same subs and revenue? I would assume not but data isn’t available</p>
                                </Card>
                        </div>
                        <div style={{width:"50%",backgroundColor:"white",overflow:"hidden",border:"1px solid lightgray"}}>
                                <Card
                                type="inner"
                                title="flyingcat#976"
                                bordered={false}
                                >
                                <p style={{fontSize:11}}>nt is how many people subscribe to any streamer for a single original film that can’t be licensed elsewhere on SVOD? Squid Game was
                                     incredible. And Bridgerton was a phenom too. </p>

                                </Card>

                        </div>
                      
                        </div>
       

                    </div>
                
                
                    
            
                    </div>

                      
             
        )
    }
}

export default App
