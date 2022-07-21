/**
 * @generated SignedSource<<4210e07bbe6eac39684fe191a7c407c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostHeaderViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostJoinClubViewerFragment">;
  readonly " $fragmentType": "PostHeaderViewerFragment";
};
export type PostHeaderViewerFragment$key = {
  readonly " $data"?: PostHeaderViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderViewerFragment",
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

(node as any).hash = "0c89caad7af380e9b80bde1b07016fad";

export default node;
