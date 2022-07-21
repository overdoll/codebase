/**
 * @generated SignedSource<<ba9408ddd2de96efe893ae3ef7a94c4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RootClubPostsPreviewViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubPostsPreviewViewerFragment">;
  readonly " $fragmentType": "RootClubPostsPreviewViewerFragment";
};
export type RootClubPostsPreviewViewerFragment$key = {
  readonly " $data"?: RootClubPostsPreviewViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RootClubPostsPreviewViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RootClubPostsPreviewViewerFragment",
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

(node as any).hash = "c0cc75f09d65ffc95be4798db3b19aae";

export default node;
