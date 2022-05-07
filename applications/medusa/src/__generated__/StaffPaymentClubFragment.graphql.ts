/**
 * @generated SignedSource<<cfaf5e6d09e187e114c24a80dfedfab5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffPaymentClubFragment$data = {
  readonly destinationClub: {
    readonly " $fragmentSpreads": FragmentRefs<"LargeClubHeaderFragment" | "ClubPageButtonFragment" | "ClubStaffButtonFragment">;
  };
  readonly " $fragmentType": "StaffPaymentClubFragment";
};
export type StaffPaymentClubFragment = StaffPaymentClubFragment$data;
export type StaffPaymentClubFragment$key = {
  readonly " $data"?: StaffPaymentClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffPaymentClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffPaymentClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "destinationClub",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LargeClubHeaderFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubPageButtonFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubStaffButtonFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ClubPayment",
  "abstractKey": null
};

(node as any).hash = "b7bc08b0b48a0d1dc26965cb80caf510";

export default node;
