/**
 * @generated SignedSource<<866ea6b69bb34c9d182584171237f661>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TagsPublicPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewCategoriesFragment" | "PostPreviewCharactersFragment">;
  readonly " $fragmentType": "TagsPublicPostFragment";
};
export type TagsPublicPostFragment$key = {
  readonly " $data"?: TagsPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TagsPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TagsPublicPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPreviewCharactersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPreviewCategoriesFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "b47ea5c4498cc533204e6ae08d99707f";

export default node;
