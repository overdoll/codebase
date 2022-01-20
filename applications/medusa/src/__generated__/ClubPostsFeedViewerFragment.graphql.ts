/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ClubPostsFeedViewerFragment = {
    readonly " $fragmentRefs": FragmentRefs<"PostsInfiniteScrollViewerFragment">;
    readonly " $refType": "ClubPostsFeedViewerFragment";
};
export type ClubPostsFeedViewerFragment$data = ClubPostsFeedViewerFragment;
export type ClubPostsFeedViewerFragment$key = {
    readonly " $data"?: ClubPostsFeedViewerFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ClubPostsFeedViewerFragment">;
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
(node as any).hash = '69bfc04d2f406b4830a0e9b56d8a21f1';
export default node;
