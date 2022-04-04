/**
 * @generated SignedSource<<040948d5a13b0263bd7ee76749491ab9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RejectedPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostModerateButtonFragment" | "PostDeleteButtonFragment">;
  readonly " $fragmentType": "RejectedPostFragment";
};
export type RejectedPostFragment = RejectedPostFragment$data;
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
