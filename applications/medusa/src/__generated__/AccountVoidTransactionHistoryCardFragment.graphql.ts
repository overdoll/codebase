/**
 * @generated SignedSource<<5ecd820fe44444bc11afadbbbaf3782a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AccountVoidTransactionHistoryCardFragment$data = {
  readonly timestamp: any;
  readonly supportedClub: {
    readonly name: string;
  } | null;
  readonly amount: number;
  readonly currency: Currency;
  readonly " $fragmentType": "AccountVoidTransactionHistoryCardFragment";
};
export type AccountVoidTransactionHistoryCardFragment = AccountVoidTransactionHistoryCardFragment$data;
export type AccountVoidTransactionHistoryCardFragment$key = {
  readonly " $data"?: AccountVoidTransactionHistoryCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountVoidTransactionHistoryCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountVoidTransactionHistoryCardFragment",
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
  "type": "AccountVoidTransactionHistory",
  "abstractKey": null
};

(node as any).hash = "0e5be1cf6996097a1434b3d1fbc79386";

export default node;
