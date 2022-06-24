/**
 * @generated SignedSource<<26121d43a8cb5bb4177fd1d8e6c48b8e>>
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
    readonly " $fragmentSpreads": FragmentRefs<"ClubPageButtonFragment" | "ClubStaffButtonFragment" | "LargeClubHeaderFragment">;
  };
  readonly " $fragmentType": "StaffPayoutClubFragment";
};
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
