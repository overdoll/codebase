/**
 * @generated SignedSource<<564a809286b48b2d19788c40ba9afda1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavePublicPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostLikeButtonFragment">;
  readonly " $fragmentType": "SavePublicPostFragment";
};
export type SavePublicPostFragment$key = {
  readonly " $data"?: SavePublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavePublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavePublicPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLikeButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "21e6e318545ebf6a6f47783ec973229d";

export default node;
