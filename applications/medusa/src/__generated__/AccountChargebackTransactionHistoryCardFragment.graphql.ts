/**
 * @generated SignedSource<<2a14526131b0c30d1e3e135bc2c5f252>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AccountChargebackTransactionHistoryCardFragment$data = {
  readonly timestamp: any;
  readonly supportedClub: {
    readonly name: string;
  } | null;
  readonly amount: number;
  readonly currency: Currency;
  readonly " $fragmentType": "AccountChargebackTransactionHistoryCardFragment";
};
export type AccountChargebackTransactionHistoryCardFragment = AccountChargebackTransactionHistoryCardFragment$data;
export type AccountChargebackTransactionHistoryCardFragment$key = {
  readonly " $data"?: AccountChargebackTransactionHistoryCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountChargebackTransactionHistoryCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountChargebackTransactionHistoryCardFragment",
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
  "type": "AccountChargebackTransactionHistory",
  "abstractKey": null
};

(node as any).hash = "496e6b6613043f63227e4fe0b9068e55";

export default node;
