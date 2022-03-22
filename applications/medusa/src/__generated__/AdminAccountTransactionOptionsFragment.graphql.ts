/**
 * @generated SignedSource<<8bc07226b5adc78eb267fee669829bec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AccountTransactionType = "CHARGEBACK" | "PAYMENT" | "REFUND" | "VOID" | "%future added value";
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AdminAccountTransactionOptionsFragment$data = {
  readonly type: AccountTransactionType;
  readonly billedAtDate: any;
  readonly amount: number;
  readonly currency: Currency;
  readonly " $fragmentType": "AdminAccountTransactionOptionsFragment";
};
export type AdminAccountTransactionOptionsFragment = AdminAccountTransactionOptionsFragment$data;
export type AdminAccountTransactionOptionsFragment$key = {
  readonly " $data"?: AdminAccountTransactionOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAccountTransactionOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminAccountTransactionOptionsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "billedAtDate",
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
  "type": "AccountTransaction",
  "abstractKey": null
};

(node as any).hash = "34c2981e390145d2a7112d10d98e5c83";

export default node;
