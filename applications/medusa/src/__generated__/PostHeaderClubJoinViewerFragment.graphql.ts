/**
 * @generated SignedSource<<861438c0fc1d89c58c7f9438a2d23805>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostHeaderClubJoinViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostJoinClubViewerFragment">;
  readonly " $fragmentType": "PostHeaderClubJoinViewerFragment";
};
export type PostHeaderClubJoinViewerFragment$key = {
  readonly " $data"?: PostHeaderClubJoinViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderClubJoinViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderClubJoinViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostJoinClubViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "94356060e924b91026f863460d8ee036";

export default node;
