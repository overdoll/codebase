/**
 * @generated SignedSource<<5fdbc13d0c0cf1e4c3aaa1e586480b45>>
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
    readonly details: {
      readonly " $fragmentSpreads": FragmentRefs<"AccountDetailsFragment">;
    } | null;
    readonly payoutMethod: {
      readonly " $fragmentSpreads": FragmentRefs<"PayoutMethodFragment">;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"LargeAccountHeaderFragment" | "ProfilePageButtonFragment" | "ProfileStaffButtonFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubTransferOwnershipFragment">;
  readonly " $fragmentType": "StaffClubOwnerFragment";
};
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffClubTransferOwnershipFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "f06178b606bdd276551bd15df6467873";

export default node;
