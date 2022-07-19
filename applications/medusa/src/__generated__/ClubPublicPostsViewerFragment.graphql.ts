/**
 * @generated SignedSource<<ba798f8d30927a0a87b3bc9b4ef9442d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubPostsPreviewViewerFragment">;
  readonly " $fragmentType": "ClubPublicPostsViewerFragment";
};
export type ClubPublicPostsViewerFragment$key = {
  readonly " $data"?: ClubPublicPostsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPublicPostsViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubPostsPreviewViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "f4f3609e333727d04516461ad40782db";

export default node;
