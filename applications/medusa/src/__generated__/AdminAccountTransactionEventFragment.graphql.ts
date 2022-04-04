/**
 * @generated SignedSource<<74c80c4ea63ed1816851bf8bd3651561>>
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
  readonly currency: Currency;
  readonly reason: string;
  readonly timestamp: any;
  readonly " $fragmentType": "StaffAccountTransactionEventFragment";
};
export type StaffAccountTransactionEventFragment = StaffAccountTransactionEventFragment$data;
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
      "name": "timestamp",
      "storageKey": null
    }
  ],
  "type": "AccountTransactionEvent",
  "abstractKey": null
};

(node as any).hash = "eb178cbd82ee136cf52baab4288d4b0c";

export default node;
