/**
 * @generated SignedSource<<c6981ef4dff7e4ae9fa6420ba9c37ee0>>
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
export type StaffDepositRequestOptionsFragment$data = {
  readonly baseAmount: number;
  readonly currency: Currency;
  readonly estimatedFeeAmount: number;
  readonly payoutMethod: PayoutMethod;
  readonly lastDateForDeposit: any;
  readonly createdAt: any;
  readonly totalAmount: number;
  readonly " $fragmentType": "StaffDepositRequestOptionsFragment";
};
export type StaffDepositRequestOptionsFragment = StaffDepositRequestOptionsFragment$data;
export type StaffDepositRequestOptionsFragment$key = {
  readonly " $data"?: StaffDepositRequestOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffDepositRequestOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffDepositRequestOptionsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "baseAmount",
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
      "name": "estimatedFeeAmount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "payoutMethod",
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
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalAmount",
      "storageKey": null
    }
  ],
  "type": "DepositRequest",
  "abstractKey": null
};

(node as any).hash = "a9e007d0fe834aa4ae831bd4276652d4";

export default node;
