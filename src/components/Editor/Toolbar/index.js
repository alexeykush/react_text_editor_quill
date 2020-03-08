import React, {Component} from 'react';

import "./extend";
import { toolbarConfig } from "./statics";
import UndoIcon from "../../icons/Undo";
import RedoIcon from "../../icons/Redo";

class Toolbar extends Component {
    renderGroup = (item, key) => {
        return (
            <span
                key={item.label + key}
                className="ql-formats"
            >
                {item.items.map(this.renderItem)}
            </span>
        );
    };

    renderChoiceItem = (item, key) => (
        <option value={item.value} key={item.label || item.value || key}>
            {item.label}
        </option>
    );

    renderChoices = (item, key) => {
        const choiceItems = item.items.map(this.renderChoiceItem);
        const selected = item.items.find(item => item.selected);
        const attrs = {
            className: 'ql-' + item.type,
            defaultValue: selected ? selected.value : "",
            key: item.label || key,
            title: item.label
        };
        return (
            <select {...attrs}>
                {choiceItems}
            </select>
        )
    };

    renderButton = (item, key) => (
        <button
            type="button"
            className={`ql-${item.type}`}
            value={item.value}
            title={item.label}
            key={item.label || item.value || key}
        >
            {item.children}
        </button>
    );

    renderAction = (item, key) => (
        <button
            className={`ql-${item.type}`}title={item.label}
            key={item.label || item.value || key}
        >
            {item.children}
        </button>
    );

    renderHistoryPrevious = (item, key) => {
        const { handleUndo, getHistoryStack } = this.props;
        const stack = getHistoryStack();
        return (
            <button
                title="historyPrev"
                key={item.label || item.value || key}
                onClick={handleUndo}
            >
                <UndoIcon isActive={stack && stack.undo.length}/>
            </button>
        );
    };

    renderHistoryNext = (item, key) => {
        const { handleRedo, getHistoryStack } = this.props;
        const stack = getHistoryStack();
        return (
            <button
                onClick={handleRedo}
                title="historyNext"
                key={item.label || item.value || key}
            >
                <RedoIcon isActive={stack && stack.redo.length}/>
            </button>
        );
    };

    renderItem = (item, key) => {
        switch (item.type) {
            case 'group':
                return this.renderGroup(item, key);
            case 'font':
            case 'header':
            case 'align':
            case 'size':
            case 'color':
            case 'background':
                return this.renderChoices(item, key);
            case 'bold':
            case 'italic':
            case 'underline':
            case 'strike':
            case 'link':
            case 'list':
            case 'bullet':
            case 'ordered':
            case 'video':
            case 'image':
            case 'blockquote':
            case 'indent':
                return this.renderButton(item, key);
            case "historyPrev":
                return this.renderHistoryPrevious(item, key);
            case "historyNext":
                return this.renderHistoryNext(item, key);
            default:
                return this.renderAction(item, key);
        }
    };

    render() {
        return (
            <div id="editor-toolbar" className="quill-toolbar">
                {toolbarConfig.map(this.renderItem)}
            </div>
        );
    }
}

export default Toolbar;