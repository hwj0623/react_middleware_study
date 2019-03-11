import React from 'react';
import EditorTemplate from '../components/editor/EditorTemplate';
import EditorHeader from "../components/editor/EditorHeader/EditorHeader";
import EditorPaneContainer from "../components/editor/EditorPane/EditorPaneContainer";
import PreviewPane from "../components/editor/PreviewPane/PreviewPane";

const EditorPage = () => {
    return(
        <EditorTemplate
            header={<EditorHeader/>}
            editor={<EditorPaneContainer/>}
            preview={<PreviewPane/>}
        />

    );
};

export default EditorPage;
