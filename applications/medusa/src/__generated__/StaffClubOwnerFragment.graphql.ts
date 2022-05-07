/**
 * @generated SignedSource<<2834c53ee15755782286d8f232621b15>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubOwnerFragment$data = {
  readonly owner: {
    readonly payoutMethod: {
      readonly " $fragmentSpreads": FragmentRefs<"PayoutMethodFragment">;
    } | null;
    readonly details: {
      readonly " $fragmentSpreads": FragmentRefs<"AccountDetailsFragment">;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"LargeAccountHeaderFragment" | "ProfilePageButtonFragment" | "ProfileStaffButtonFragment">;
  };
  readonly " $fragmentType": "StaffClubOwnerFragment";
};
export type StaffClubOwnerFragment = StaffClubOwnerFragment$data;
export type StaffClubOwnerFragment$key = {
  readonly " $data"?: StaffClubOwnerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubOwnerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubOwnerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LargeAccountHeaderFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProfilePageButtonFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProfileStaffButtonFragment"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "payoutMethod",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PayoutMethodFragment"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountDetails",
          "kind": "LinkedField",
          "name": "details",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "AccountDetailsFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "9106608ffcf186d3d61e72fe50ed0b44";

export default node;
