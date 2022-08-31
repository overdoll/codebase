/**
 * @generated SignedSource<<32e9f42a41d645245f09a446b782ad6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostLikeButtonFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostLikeLoggedOutButtonFragment" | "PostLikeWrapperFragment">;
  readonly " $fragmentType": "PostLikeButtonFragment";
};
export type PostLikeButtonFragment$key = {
  readonly " $data"?: PostLikeButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostLikeButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostLikeButtonFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLikeWrapperFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLikeLoggedOutButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "569a835b66b4da1f5710b5d44bffdff0";

export default node;
