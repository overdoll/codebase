/**
 * @generated SignedSource<<5fa71c17831c4b2e49e472580ba48b2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
export type PayoutMethod = "PAXUM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StaffDepositRequestCardFragment$data = {
  readonly currency: Currency;
  readonly lastDateForDeposit: any;
  readonly payoutMethod: PayoutMethod;
  readonly totalAmount: number;
  readonly " $fragmentType": "StaffDepositRequestCardFragment";
};
export type StaffDepositRequestCardFragment$key = {
  readonly " $data"?: StaffDepositRequestCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffDepositRequestCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffDepositRequestCardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalAmount",
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
      "name": "lastDateForDeposit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "payoutMethod",
      "storageKey": null
    }
  ],
  "type": "DepositRequest",
  "abstractKey": null
};

(node as any).hash = "a799ab3ff1078c20b8a77564e5f6232f";

export default node;
