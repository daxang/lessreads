import React, { useState,useEffect } from 'react'
import { BrowserRouter as Router, useLocation,Link  } from "react-router-dom";
import { Layout,Collapse,Input,Button,Form  } from 'antd'
import 'antd/dist/antd.css'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { DomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Orbis } from "@orbisclub/orbis-sdk"
import { i18nChangeLanguage } from '@wangeditor/editor'



let orbis = new Orbis();
export default function Edit() {
  const[user,setUser]=useState()
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const [html, setHtml] = useState()
  const[title,setTitle]=useState()
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

  const location=useLocation()
  const postId=location.pathname.slice(6)
  console.log(postId)

  async function getChapter(){
    let {data,error}= await orbis.getPost(postId)
    if(data){
      console.log(data)
        setTitle(data.content.title)
        if(data.content?.body){
            setHtml(data.content.body)
        }
        else if(data.content?.encrypteBody?.encryptedString != {}){
            let res = await orbis.decryptPost(data.content);
            /** Save in state */
            if(res.status == 300) {
            console.log(res)

            } else {
            setHtml(res.result)
            }
        } else {
            return null;
        }

      }
        
    }
useEffect(()=>{
    getChapter()
},[])
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


useEffect(() => {
  return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
  }
}, [editor])


  async function editPost(){
    console.log("start to post")
    console.log(html)
    console.log(title)
    const title1=document.getElementById("title").value
    let res=  await orbis.editPost(postId,{
      body:html,
      title:title1
    })
  console.log(res)
  
  }
        return (
            
                <div >                                      
                 <div>edit the chapter of {title}</div>
                    <Form name={"edit"+title}>
                    <Input id="title"  defaultValue={title} ></Input>
                    </Form>
                  <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px'}}>
                    <Toolbar
                        editor={editor}
                        defaultConfig={toolbarConfig}
                        mode="default"
                        style={{ borderBottom: '1px solid #ccc' }}
                    />
                    <Editor
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
                        <Button onClick={()=>editPost()}>submit</Button>
                    </div>
                  </div>


             
        )
    }

