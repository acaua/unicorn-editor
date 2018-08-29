import {
  BlockquoteButton,
  CodeBlockButton,
  HeadlineOneButton,
  HeadlineThreeButton,
  HeadlineTwoButton,
  OrderedListButton,
  UnorderedListButton
} from "draft-js-buttons";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import BlockTypeSelect from "draft-js-side-toolbar-plugin/lib/components/BlockTypeSelect";
import * as React from "react";

import ImageButton from "./ImageButton";
import VideoButton from "./VideoButton";

const DefaultBlockTypeSelect = ({
  getEditorState,
  setEditorState,
  theme
}: any) => (
  <BlockTypeSelect
    getEditorState={getEditorState}
    setEditorState={setEditorState}
    theme={theme}
    structure={[
      HeadlineOneButton,
      HeadlineTwoButton,
      HeadlineThreeButton,
      UnorderedListButton,
      OrderedListButton,
      BlockquoteButton,
      CodeBlockButton,
      ImageButton,
      VideoButton
    ]}
  />
);

const createCustomSideToolbarPlugin = () =>
  createSideToolbarPlugin({
    structure: [DefaultBlockTypeSelect]
  });

export default createCustomSideToolbarPlugin;
