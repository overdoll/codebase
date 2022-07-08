/**
 * @generated SignedSource<<fbc061cdc90a1bd2c125c893b4a4050a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RejectedPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostDeleteButtonFragment" | "PostModerateButtonFragment" | "PostPreviewContentFragment">;
  readonly " $fragmentType": "RejectedPostFragment";
};
export type RejectedPostFragment$key = {
  readonly " $data"?: RejectedPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RejectedPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RejectedPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPreviewContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostModerateButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostDeleteButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "814b6a35f35b5d058c376f3dc4f3d346";

export default node;
