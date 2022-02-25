/**
 * @generated SignedSource<<6a3550206d85f5003dc02edcb755fbe2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RejectedPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostMenuFragment">;
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
      "name": "PostMenuFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "00ab900c233bd9e65099a9267df98b50";

export default node;
