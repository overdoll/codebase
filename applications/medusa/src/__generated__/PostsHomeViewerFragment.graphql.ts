/**
 * @generated SignedSource<<f6552cc88fed23978e4179d7baa5bfdd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsHomeViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "PostsHomeViewerFragment";
};
export type PostsHomeViewerFragment$key = {
  readonly " $data"?: PostsHomeViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostsHomeViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostsHomeViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullSimplePostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "c9215a70c716623e90f00079d391d0bb";

export default node;
