/**
 * @generated SignedSource<<270a8d5c9f4a5cf4761cdbeff48df8d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubFromPageViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BecomeMemberButtonViewerFragment">;
  readonly " $fragmentType": "JoinClubFromPageViewerFragment";
};
export type JoinClubFromPageViewerFragment = JoinClubFromPageViewerFragment$data;
export type JoinClubFromPageViewerFragment$key = {
  readonly " $data"?: JoinClubFromPageViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromPageViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubFromPageViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BecomeMemberButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "0239a2ec84151ba82e22e6e6696fad53";

export default node;
