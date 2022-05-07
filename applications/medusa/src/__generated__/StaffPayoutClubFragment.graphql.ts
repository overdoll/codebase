/**
 * @generated SignedSource<<2c039ea8763db7a4a0ffef6602f5be27>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffPayoutClubFragment$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"LargeClubHeaderFragment" | "ClubPageButtonFragment" | "ClubStaffButtonFragment">;
  };
  readonly " $fragmentType": "StaffPayoutClubFragment";
};
export type StaffPayoutClubFragment = StaffPayoutClubFragment$data;
export type StaffPayoutClubFragment$key = {
  readonly " $data"?: StaffPayoutClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffPayoutClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffPayoutClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
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
  "type": "ClubPayout",
  "abstractKey": null
};

(node as any).hash = "7d72a7f34990f49e30fec8db496a19b6";

export default node;
