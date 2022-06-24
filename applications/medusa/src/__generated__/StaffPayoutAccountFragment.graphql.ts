/**
 * @generated SignedSource<<d8b5975a57fa21c0571c2627ff508a48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffPayoutAccountFragment$data = {
  readonly payoutAccount: {
    readonly " $fragmentSpreads": FragmentRefs<"LargeAccountHeaderFragment" | "ProfilePageButtonFragment" | "ProfileStaffButtonFragment">;
  };
  readonly " $fragmentType": "StaffPayoutAccountFragment";
};
export type StaffPayoutAccountFragment$key = {
  readonly " $data"?: StaffPayoutAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffPayoutAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffPayoutAccountFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "payoutAccount",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ClubPayout",
  "abstractKey": null
};

(node as any).hash = "7861df07bae11ff369959a7041aecea9";

export default node;
