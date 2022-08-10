/**
 * @generated SignedSource<<a29347a173eebcd4c489f2c28a1022af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPostsFeedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "ClubPostsFeedViewerFragment";
};
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
      "name": "FullSimplePostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "1600d78573496efeab7b7bf764533c59";

export default node;
