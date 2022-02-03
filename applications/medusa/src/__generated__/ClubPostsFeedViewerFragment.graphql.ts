/**
 * @generated SignedSource<<b1065e1d5e2a801a3e0c720a043fd04f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPostsFeedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostsInfiniteScrollViewerFragment">;
  readonly " $fragmentType": "ClubPostsFeedViewerFragment";
};
export type ClubPostsFeedViewerFragment = ClubPostsFeedViewerFragment$data;
export type ClubPostsFeedViewerFragment$key = {
  readonly " $data"?: ClubPostsFeedViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPostsFeedViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPostsFeedViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostsInfiniteScrollViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "69bfc04d2f406b4830a0e9b56d8a21f1";

export default node;
