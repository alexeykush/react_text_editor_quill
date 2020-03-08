import React, {Component} from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {filesToArray, isImage, processFiles} from "../../utils";
import Toolbar from "./Toolbar";

class Editor extends Component {
    static formats = ["header", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "video", "color", "background", "align", "font", "image"];

    editor = React.createRef();

    handleImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;
        input.click();
        input.onchange = () => {
            const finish = () => input.remove();
            const { files } = input;
            const images = filesToArray(files).filter(isImage);
            if(!images.length) return finish();
            this.processImages(images).finally(finish);
        };
    };

    state = {
        html: "",
        modules: {
            toolbar: {
                container: "#editor-toolbar",
                handlers: {
                    image: this.handleImage
                }
            },
            clipboard: {
                matchVisual: false
            }
        }
    };

    componentDidMount() {
        const editingArea = this.getEditingArea();
        editingArea.addEventListener("drop", this.onDrop);
        editingArea.addEventListener("paste", this.onPaste);
    }

    onDrop = e => {
        e.preventDefault();
        const data = this.processTransferredFiles(e.dataTransfer.items);
        if(data.length) this.processImages(data);
    };

    onPaste = e => {
        const data = this.processTransferredFiles((e.clipboardData || window.clipboardData).items);
        if(data.length) this.processImages(data);
    };

    handleChange = html => {
        this.setState({ html });
    };

    handleUndo = () => {
        this.getQuill().history.undo();
    };

    handleRedo = () => {
        this.getQuill().history.redo();
    };

    getHistoryStack = () => {
        return this.getQuill() && this.getQuill().history.stack;
    };

    getQuill() {
        return this.editor.current && this.editor.current.getEditor();
    }

    getEditingArea() {
        return this.editor.current.editingArea;
    }

    processTransferredFiles(data) {
        return filesToArray(data)
            .filter(item => isImage(item, "type"))
            .map(item => item.getAsFile());
    }

    processImages = images => {
         return processFiles(images)
             .then(urls => urls.forEach(this.insertImage))
             .catch(console.log);
    };

    insertImage = src => {
        const quill = this.getQuill();
        const { index } = quill.getSelection() || { index: 0 };
        quill.insertEmbed(index, 'image', src, "user");
        quill.setSelection(index + 1, index + 1);
    };

    render() {
        const { modules, html } = this.state;

        return (
            <div className="editor-wrapper">
                <Toolbar
                    getHistoryStack={this.getHistoryStack}
                    handleUndo={this.handleUndo}
                    handleRedo={this.handleRedo}
                />
                <ReactQuill
                    ref={this.editor}
                    value={html}
                    onChange={this.handleChange}
                    modules={modules}
                    formats={Editor.formats}
                />
            </div>
        );
    }
}

export default Editor;