/**
 * @generated SignedSource<<d48feb4dc618e1179d8ec6e3b5ded22f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StaffRefundAccountTransactionFormFragment$data = {
  readonly id: string;
  readonly currency: Currency;
  readonly " $fragmentSpreads": FragmentRefs<"StaffGenerateRefundAmountForAccountTransactionInputFragment">;
  readonly " $fragmentType": "StaffRefundAccountTransactionFormFragment";
};
export type StaffRefundAccountTransactionFormFragment = StaffRefundAccountTransactionFormFragment$data;
export type StaffRefundAccountTransactionFormFragment$key = {
  readonly " $data"?: StaffRefundAccountTransactionFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffRefundAccountTransactionFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffRefundAccountTransactionFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffGenerateRefundAmountForAccountTransactionInputFragment"
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};

(node as any).hash = "446037a80804c73677918fa9950e34f2";

export default node;
