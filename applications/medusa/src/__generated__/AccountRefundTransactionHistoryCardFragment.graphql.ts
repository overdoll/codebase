/**
 * @generated SignedSource<<1ddfad759e759846c56e698aaffa480e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AccountRefundTransactionHistoryCardFragment$data = {
  readonly timestamp: any;
  readonly supportedClub: {
    readonly name: string;
  } | null;
  readonly amount: number;
  readonly currency: Currency;
  readonly " $fragmentType": "AccountRefundTransactionHistoryCardFragment";
};
export type AccountRefundTransactionHistoryCardFragment = AccountRefundTransactionHistoryCardFragment$data;
export type AccountRefundTransactionHistoryCardFragment$key = {
  readonly " $data"?: AccountRefundTransactionHistoryCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountRefundTransactionHistoryCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountRefundTransactionHistoryCardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timestamp",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "supportedClub",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
    }
  ],
  "type": "AccountRefundTransactionHistory",
  "abstractKey": null
};

(node as any).hash = "90b04893e769e2de1ce422cab0e5edd9";

export default node;
