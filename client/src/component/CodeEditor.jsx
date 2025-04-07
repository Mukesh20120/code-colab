import React, { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

function CodeEditor() {

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
    
      //     // console.log("changes", instance ,  changes );
      //     const { origin } = changes;
      //     const code = instance.getValue(); // code has value which we write
      //     onCodeChange(code);
      //     if (origin !== "setValue") {
      //       socketRef.current.emit(ACTIONS.CODE_CHANGE, {
      //         roomId,
      //         code,
      //       });
      //     }
      //   });
    };

    init();
  }, []);


  return <textarea id="realtimeEditor"></textarea>;
}

export default CodeEditor;
