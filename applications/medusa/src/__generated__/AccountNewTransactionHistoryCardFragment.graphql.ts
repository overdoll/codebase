/**
 * @generated SignedSource<<8ace9bf0ce9703f8efb465b0f1264ee0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AccountNewTransactionHistoryCardFragment$data = {
  readonly timestamp: any;
  readonly supportedClub: {
    readonly name: string;
  } | null;
  readonly amount: number;
  readonly currency: Currency;
  readonly " $fragmentType": "AccountNewTransactionHistoryCardFragment";
};
export type AccountNewTransactionHistoryCardFragment = AccountNewTransactionHistoryCardFragment$data;
export type AccountNewTransactionHistoryCardFragment$key = {
  readonly " $data"?: AccountNewTransactionHistoryCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountNewTransactionHistoryCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountNewTransactionHistoryCardFragment",
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
  "type": "AccountNewTransactionHistory",
  "abstractKey": null
};

(node as any).hash = "2b81cf6f87b7f9a44e1dfcf611ed0822";

export default node;
