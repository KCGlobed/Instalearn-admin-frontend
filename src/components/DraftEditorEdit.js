import React, { useEffect, useState } from "react";
import {
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";

const DraftEditorEdit = ({ value = "", onChange }) => {
  const [editorState, setEditorState] = useState(() =>
    value
      ? EditorState.createWithContent(stateFromHTML(value))
      : EditorState.createEmpty()
  );

  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    const currentHtml = stateToHTML(currentContent);

    if (value && value !== currentHtml) {
      const contentState = stateFromHTML(value);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value]);

  const handleChange = (state) => {
    setEditorState(state);
    const content = state.getCurrentContent();
    const html = stateToHTML(content);
    onChange?.(html);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "2px", minHeight: "200px" }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleChange}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbar={{
          options: ["inline", "list", "textAlign", "link", "history"],
          inline: { options: ["bold", "italic", "underline"] },
          list: { options: ["unordered", "ordered"] },
        }}
      />
    </div>
  );
};

export default DraftEditorEdit;
