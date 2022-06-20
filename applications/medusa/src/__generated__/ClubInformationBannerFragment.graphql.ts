/**
 * @generated SignedSource<<5847096a856310c55e6a2ec09c098240>>
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
  readonly " $fragmentSpreads": FragmentRefs<"SuspendedClubBannerFragment">;
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
      "name": "SuspendedClubBannerFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "eb7601f8cc09038e4fe8bf8ca23bb2cb";

export default node;
