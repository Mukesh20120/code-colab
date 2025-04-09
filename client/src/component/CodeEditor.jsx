import React, { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

function CodeEditor({socketRef, roomId, codeRef}) {
  
  const editorRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      // for sync the code
      editorRef.current = editor;

      editor.setSize(null, "100%");
      
      editorRef.current.on("change",(instance, changes)=>{
        const { origin } = changes;
        const code = instance.getValue();
        codeRef.current = code;
        if(origin !== "setValue"){
          socketRef.current.emit('code-change',{roomId, code})
        }
      })
      
    };

    init();
    
  }, []);

  useEffect(()=>{
    if(socketRef.current){
      socketRef.current.on('code-change',({code})=>{
        if(code != null){
          editorRef.current.setValue(code);
        }
      })
    }
  },[socketRef.current])


  return <textarea id="realtimeEditor"></textarea>;
}

export default CodeEditor;
