/**
 * @generated SignedSource<<b24d39b3f6f25114bf97207ff8a5f68b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StaffAccountTransactionEventFragment$data = {
  readonly amount: number;
  readonly createdAt: any;
  readonly currency: Currency;
  readonly reason: string;
  readonly " $fragmentType": "StaffAccountTransactionEventFragment";
};
export type StaffAccountTransactionEventFragment$key = {
  readonly " $data"?: StaffAccountTransactionEventFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountTransactionEventFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAccountTransactionEventFragment",
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
      "name": "reason",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "AccountTransactionEvent",
  "abstractKey": null
};

(node as any).hash = "5a5c1377660d6ecb55e0d509c6e59b5f";

export default node;
