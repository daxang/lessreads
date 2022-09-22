import React, { useState,useEffect } from 'react'
import { Layout,Collapse,Input,Button,Form  } from 'antd'
import 'antd/dist/antd.css'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Orbis } from "@orbisclub/orbis-sdk"


let orbis = new Orbis();
export default function Write() {
  const[user,setUser]=useState()
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const [html, setHtml] = useState('<p>input your article here</p>')
  async function getUserData(){
      let res = await orbis.isConnected()
      setUser(res.did)
      console.log("获取成功")
  }

  useEffect(()=>{
      getUserData()
  })


const toolbarConfig = { }
const editorConfig = {
    placeholder: '请输入内容...',
}

useEffect(() => {
  return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
  }
}, [editor])


  async function createPosts(){
    console.log("start to post")
    const title=document.getElementsByTagName("input")[0].value
    const token=document.getElementById("tokengate").value
    if(token){
      console.log(token)
      console.log(typeof token)
      await orbis.createPost({
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
    })}
    else{
      console.log("no contract address")
       await orbis.createPost({
        body:html,
        title:title,
        context:"kjzl6cwe1jw148fg1h9lbi0kseyif24zzegoipd3k9ra7vdk7otfz6iqc3awba0"
      })

    }
  
  }


  const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator' ]

        return (
            
                <div >                                      
                 <div>let us write</div>

                  <div className='input'>
                    <div className='title'>
                    从快闪之星开始纵横
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

