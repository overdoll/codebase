/**
 * @generated SignedSource<<fbc7a8e779634ec9b6d8aa564e2789d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RejectedPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostModerateButtonFragment">;
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
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "703af2776f6819d7e50375c7968f80e6";

export default node;
