/**
 * @generated SignedSource<<f9c0d56c37be27aac054acc4c08aaa81>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuggestedPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostsInfiniteScrollViewerFragment">;
  readonly " $fragmentType": "SuggestedPostsViewerFragment";
};
export type SuggestedPostsViewerFragment$key = {
  readonly " $data"?: SuggestedPostsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SuggestedPostsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SuggestedPostsViewerFragment",
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

(node as any).hash = "6bcd49c8f80445cfc80f978eb6149594";

export default node;
