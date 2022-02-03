/**
 * @generated SignedSource<<b77c609b36e77baf51cb9f374d648ff6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsInfiniteScrollViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "PostsInfiniteScrollViewerFragment";
};
export type PostsInfiniteScrollViewerFragment = PostsInfiniteScrollViewerFragment$data;
export type PostsInfiniteScrollViewerFragment$key = {
  readonly " $data"?: PostsInfiniteScrollViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostsInfiniteScrollViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostsInfiniteScrollViewerFragment",
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

(node as any).hash = "a8af6c78b8e9480832d6288668014535";

export default node;
