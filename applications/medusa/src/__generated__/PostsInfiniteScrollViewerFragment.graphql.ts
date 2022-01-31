/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostsInfiniteScrollViewerFragment = {
    readonly " $fragmentRefs": FragmentRefs<"FullSimplePostViewerFragment">;
    readonly " $refType": "PostsInfiniteScrollViewerFragment";
};
export type PostsInfiniteScrollViewerFragment$data = PostsInfiniteScrollViewerFragment;
export type PostsInfiniteScrollViewerFragment$key = {
    readonly " $data"?: PostsInfiniteScrollViewerFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostsInfiniteScrollViewerFragment">;
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
(node as any).hash = 'a8af6c78b8e9480832d6288668014535';
export default node;
