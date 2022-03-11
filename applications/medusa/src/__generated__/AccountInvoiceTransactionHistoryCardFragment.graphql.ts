/**
 * @generated SignedSource<<551fa0f086e81d8931048d1a304e34f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AccountInvoiceTransactionHistoryCardFragment$data = {
  readonly timestamp: any;
  readonly supportedClub: {
    readonly name: string;
  } | null;
  readonly amount: number;
  readonly currency: Currency;
  readonly " $fragmentType": "AccountInvoiceTransactionHistoryCardFragment";
};
export type AccountInvoiceTransactionHistoryCardFragment = AccountInvoiceTransactionHistoryCardFragment$data;
export type AccountInvoiceTransactionHistoryCardFragment$key = {
  readonly " $data"?: AccountInvoiceTransactionHistoryCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountInvoiceTransactionHistoryCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountInvoiceTransactionHistoryCardFragment",
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
  "type": "AccountInvoiceTransactionHistory",
  "abstractKey": null
};

(node as any).hash = "5a5d1833b784bfc00f3b88073ca9f7d8";

export default node;
