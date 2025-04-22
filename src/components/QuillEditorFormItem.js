// components/DraftEditorFormItem.js

import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftEditorFormItem = ({ value = "", onChange }) => {
  const [editorState, setEditorState] = useState(() => {
    if (value) {
      const contentBlock = htmlToDraft(value);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
          contentBlock.entityMap
        );
        return EditorState.createWithContent(contentState);
      }
    }
    return EditorState.createEmpty();
  });

  const handleEditorChange = (state) => {
    setEditorState(state);
    const rawContentState = convertToRaw(state.getCurrentContent());
    const html = draftToHtml(rawContentState);
    onChange?.(html);
  };

  return (
    <div style={{ border: "1px solid #ccc", minHeight: 160 }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        editorStyle={{
          minHeight: 140,
          padding: "10px",
        }}
        toolbar={{
          options: ["inline", "list", "textAlign", "link", "history"],
          inline: { options: ["bold", "italic", "underline"] },
          list: { options: ["unordered", "ordered"] },
        }}
      />
    </div>
  );
};

export default DraftEditorFormItem;
