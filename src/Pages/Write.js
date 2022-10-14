import React, { useState,useEffect } from 'react'
import { Layout,Collapse,Input,Button,Form  } from 'antd'
import { BrowserRouter as Router, useLocation,Link  } from "react-router-dom";
import 'antd/dist/antd.css'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { DomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Orbis } from "@orbisclub/orbis-sdk"
import { i18nChangeLanguage } from '@wangeditor/editor'




let orbis = new Orbis();
export default function Write() {
  const[user,setUser]=useState()
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const [html, setHtml] = useState('<p>input your article here</p>')

  const location=useLocation()
  const channelid=location.pathname.slice(7)
  const [channelname,setChannelname]=useState()

  async function getUserData(){
      let res = await orbis.isConnected()
      setUser(res.did)
      console.log("获取成功")
  }
// 切换语言 - 'en' 或者 'zh-CN'
i18nChangeLanguage('en')
  useEffect(()=>{
      getUserData()
  })

const toolbarConfig = { }
toolbarConfig.excludeKeys = [
  'headerSelect',
  "blockquote",
  "lineHeight",
  "emotion",
  "insertTable",
  "todo",
  "group-video",
  "group-image",
  'group-more-style' // 排除菜单组，写菜单组 key 的值即可
]
const editorConfig = {
    placeholder: '请输入内容...',
}

useEffect(() => {
  console.log(channelid)
  getchannelname()
  return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
  }
}, [editor])

  async function getchannelname(){
    let { data, error } = await orbis.getChannel(channelid)
    console.log(data)
    if(data){
      setChannelname(data.content.name)
    }

  }
  async function createPosts(){
    console.log("start to post")
    const title=document.getElementsByTagName("input")[0].value
    const token=document.getElementById("tokengate").value
    if(token){
      console.log(token)
      console.log(typeof token)
    let res=  await orbis.createPost({
      body:html,
      title:title,
      context:"kjzl6cwe1jw148fg1h9lbi0kseyif24zzegoipd3k9ra7vdk7otfz6iqc3awba0"
    },
    {
      type: "token-gated",
      chain: "ethereum",
      contractType: "ERC721",
      contractAddress: token,
      minTokenBalance: "1"
    })
  console.log(res)}
    else{
      console.log("no contract address")
      let res= await orbis.createPost({
        body:html,
        title:title,
        context:channelid
      })
      console.log(res)

    }
  
  }


  const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator' ]

        return (
            
                <div >                                      
                 <div>POST A NEW CHAPTER!</div>

                  <div className='input'>
                    <div className='title'>
                    {channelname}
                    </div>

                    <div className='chapterTitle'>
                    <Input className="title"  placeholder="chapter title" />
                    </div>

                  


                  <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px'}}>
                    <Toolbar
                        editor={editor}
                        defaultConfig={toolbarConfig}
                        mode="default"
                        style={{ borderBottom: '1px solid #ccc' }}
                    />
                    <Editor
                        defaultConfig={editorConfig}
                        value={html}
                        onCreated={setEditor}
                        onChange={editor => setHtml(editor.getHtml())}
                        mode="default"
                        style={{ height: '500px' }}
                    />
                  </div>

              <div style={{ marginTop: '15px' }}>
                 <span>token-gate this chapter</span> <Input placeholder='Input contract address' id="tokengate" /> <span>only support ERC 721 & minTokenBalance is setted 1 by default</span>
              </div>

              <div>
                        <Button onClick={()=>createPosts()}>submit</Button>
                    </div>
                  </div>

                </div>  

             
        )
    }

