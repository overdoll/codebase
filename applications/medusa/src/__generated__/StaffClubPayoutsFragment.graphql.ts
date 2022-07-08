/**
 * @generated SignedSource<<2a6b1429bae2fa0950c2033af50daa63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StaffClubPayoutsFragment$data = {
  readonly pendingBalance: {
    readonly amount: number;
    readonly currency: Currency;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ClubBalanceFragment" | "InitiateClubPayoutFormFragment" | "StaffClubPayoutsListFragment" | "UpdateClubPlatformFeeFormFragment">;
  readonly " $fragmentType": "StaffClubPayoutsFragment";
};
export type StaffClubPayoutsFragment$key = {
  readonly " $data"?: StaffClubPayoutsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubPayoutsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubPayoutsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Balance",
      "kind": "LinkedField",
      "name": "pendingBalance",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "currency",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "amount",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubBalanceFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateClubPlatformFeeFormFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InitiateClubPayoutFormFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffClubPayoutsListFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "e818517f4ee58202fca0ddfc0693587a";

export default node;
