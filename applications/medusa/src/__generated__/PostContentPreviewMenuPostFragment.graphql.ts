/**
 * @generated SignedSource<<79969223367a82a5481bd28dd26d6cdb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContentPreviewMenuPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeDownPostContentButtonPostFragment" | "ArrangeUpPostContentButtonPostFragment" | "RemovePostContentButtonPostFragment">;
  readonly " $fragmentType": "PostContentPreviewMenuPostFragment";
};
export type PostContentPreviewMenuPostFragment$key = {
  readonly " $data"?: PostContentPreviewMenuPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewMenuPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentPreviewMenuPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeUpPostContentButtonPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RemovePostContentButtonPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeDownPostContentButtonPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ebe25d0bd0b73298155c02384af6c0b5";

export default node;
