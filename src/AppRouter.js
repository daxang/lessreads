import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import App from "./Pages/App"
import Top from "./Pages/Top"
import Write from './Pages/Write'
import OneWorld from  './Pages/OneWorld'
import Chapter from  './Pages/Chapter'
import Personal from  './Pages/personal'
import Worlds from  './Pages/worlds'
import Community from  './Pages/Community'
import {Col, Layout, Row} from 'antd'
import 'antd/dist/antd.css'
import './App.css'




const { Footer} = Layout;


class AppRouter extends React.Component {
    
    render() {
        return (
            <Router>            
                   <Top></Top>
                    <main style={{width:"70%",marginLeft:"15%"}}>
                        <div className="booklist " style={{width:"100%"}}>
                            <Routes>
                            <Route path="/" exact element={<App/>}></Route>
                            <Route path="/write" element={<Write />} />
                            <Route path="/OneWorld/:world_id" element={<OneWorld />} />
                            <Route path="/Chapter/:post_id" element={<Chapter />} />
                            <Route path="/Personal" element={<Personal />} />
                            <Route path="/Worlds" element={<Worlds />} />
                            <Route path="/Community" element={<Community />} />
                            </Routes>

                        </div>
                    </main>
                    <footer  style={{ textAlign: 'center' ,fontWeight:"light",fontSize:"10px",marginTop:"30px"}}>
                        <p>这是 Version 0.1.0，但希望你能喜欢</p>    
                        </footer>
    
            </Router>
        )
    }
}

export default AppRouter;
