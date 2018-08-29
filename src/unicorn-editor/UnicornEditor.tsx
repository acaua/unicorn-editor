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
import createVideoPlugin from "draft-js-video-plugin";
import * as React from "react";

import createCustomSideToolbarPlugin from "./customSideToolbarPlugin";

import "draft-js/dist/Draft.css";

import "draft-js-alignment-plugin/lib/plugin.css";
import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js-focus-plugin/lib/plugin.css";
import "draft-js-image-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-linkify-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import "draft-js-video-plugin/lib/plugin.css";

const linkifyPlugin = createLinkifyPlugin();

const emojiPlugin = createEmojiPlugin();
// const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const { EmojiSuggestions } = emojiPlugin;
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

const sideToolbarPlugin = createCustomSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const videoPlugin = createVideoPlugin({ decorator });

const plugins = [
  linkifyPlugin,
  emojiPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  videoPlugin,
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

  public render() {
    const { editorState, onChange, readOnly } = this.props;
    return (
      <div
        onClick={this.focus}
        style={{ width: "100%", alignItems: "stretch" }}
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
      // <EmojiSelect />
    );
  }

  private focus = () => {
    if (this.editor) {
      this.editor.focus();
    }
  };
}
