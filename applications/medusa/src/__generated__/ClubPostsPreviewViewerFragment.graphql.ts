/**
 * @generated SignedSource<<24153cfb2a7d30efaf9cfe4408a6cdff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPostsPreviewViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostsInfiniteScrollViewerFragment">;
  readonly " $fragmentType": "ClubPostsPreviewViewerFragment";
};
export type ClubPostsPreviewViewerFragment$key = {
  readonly " $data"?: ClubPostsPreviewViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPostsPreviewViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPostsPreviewViewerFragment",
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

(node as any).hash = "81d712879995964d39cba8f733d92b11";

export default node;
