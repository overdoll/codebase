/**
 * @generated SignedSource<<ca449de97f389bc7dd0516bd9c3eace5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubInformationBannerFragment$data = {
  readonly suspension: {
    readonly __typename: string;
  } | null;
  readonly termination: {
    readonly __typename: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"TerminatedClubBannerFragment" | "SuspendedClubBannerFragment">;
  readonly " $fragmentType": "ClubInformationBannerFragment";
};
export type ClubInformationBannerFragment = ClubInformationBannerFragment$data;
export type ClubInformationBannerFragment$key = {
  readonly " $data"?: ClubInformationBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubInformationBannerFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubInformationBannerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubSuspension",
      "kind": "LinkedField",
      "name": "suspension",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubTermination",
      "kind": "LinkedField",
      "name": "termination",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TerminatedClubBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SuspendedClubBannerFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "a0d5c5a26ba9b7d759953c6ae3251bd5";

export default node;
