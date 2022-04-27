/**
 * @generated SignedSource<<b5ff824953c732f75519cde98316e622>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ClubPayoutStatus = "CANCELLED" | "DEPOSITED" | "FAILED" | "PROCESSING" | "QUEUED" | "%future added value";
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StaffPayoutOptionsFragment$data = {
  readonly amount: number;
  readonly currency: Currency;
  readonly status: ClubPayoutStatus;
  readonly depositDate: any;
  readonly payoutAccount: {
    readonly " $fragmentSpreads": FragmentRefs<"LargeAccountHeaderFragment" | "ProfilePageButtonFragment" | "ProfileStaffButtonFragment">;
  };
  readonly " $fragmentType": "StaffPayoutOptionsFragment";
};
export type StaffPayoutOptionsFragment = StaffPayoutOptionsFragment$data;
export type StaffPayoutOptionsFragment$key = {
  readonly " $data"?: StaffPayoutOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffPayoutOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffPayoutOptionsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": null
    },
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "depositDate",
      "storageKey": null
    },
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

(node as any).hash = "1b3fd07419fcbe71d2818a5cd627011b";

export default node;
