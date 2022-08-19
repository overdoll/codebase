/**
 * @generated SignedSource<<2ad578ed61826ae9c86537a0a36779d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContentPreviewMemoPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewPostFragment">;
  readonly " $fragmentType": "PostContentPreviewMemoPostFragment";
};
export type PostContentPreviewMemoPostFragment$key = {
  readonly " $data"?: PostContentPreviewMemoPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewMemoPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentPreviewMemoPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostContentPreviewPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "2656b99bd7d24af6e745dc7d037dd4ba";

export default node;
