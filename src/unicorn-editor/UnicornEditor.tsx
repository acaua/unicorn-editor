import { EditorState } from "draft-js";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createImagePlugin from "draft-js-image-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import Editor, { composeDecorators } from "draft-js-plugins-editor";
import createResizeablePlugin from "draft-js-resizeable-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import * as React from "react";

import "draft-js/dist/Draft.css";

import "draft-js-alignment-plugin/lib/plugin.css";
import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js-focus-plugin/lib/plugin.css";
import "draft-js-image-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-linkify-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";

import ImageButton from "./ImageButton";
import ImportRawButton from "./ImportRawButton";

const linkifyPlugin = createLinkifyPlugin();

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const plugins = [
  linkifyPlugin,
  emojiPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  sideToolbarPlugin,
  inlineToolbarPlugin
];

interface UnicornEditorProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
  readOnly?: boolean;
}

export default class UnicornEditor extends React.Component<
  UnicornEditorProps,
  {}
> {
  private editor: any;

  // constructor(props: UnicornEditorProps) {
  //   super(props);
  // }

  public render() {
    const { editorState, onChange, readOnly } = this.props;
    return (
      <div style={{ padding: 56 }}>
        <div
          style={{ border: "1px solid black", margin: 40, minHeight: 200 }}
          onClick={this.focus}
        >
          <Editor
            ref={(c: any) => {
              this.editor = c;
            }}
            plugins={plugins}
            editorState={editorState}
            onChange={onChange}
            readOnly={!!readOnly}
          />
          {!readOnly && (
            <>
              <SideToolbar />
              <AlignmentTool />
              <InlineToolbar />
              <EmojiSuggestions />
            </>
          )}
        </div>
        <EmojiSelect />
        <ImageButton
          editorState={editorState}
          setEditorState={onChange}
          addImage={imagePlugin.addImage}
        />
        <ImportRawButton editorState={editorState} setEditorState={onChange} />
      </div>
    );
  }

  private focus = () => {
    if (this.editor) {
      this.editor.focus();
    }
  };
}
