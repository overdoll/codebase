/**
 * @generated SignedSource<<af72f35b2057cc852409c0b47d3ac59c>>
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
export type StaffAccountTransactionOptionsFragment$data = {
  readonly type: AccountTransactionType;
  readonly billedAtDate: any;
  readonly amount: number;
  readonly currency: Currency;
  readonly ccbillTransaction: {
    readonly ccbillTransactionId: string | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"StaffRefundAccountTransactionButtonFragment">;
  readonly " $fragmentType": "StaffAccountTransactionOptionsFragment";
};
export type StaffAccountTransactionOptionsFragment = StaffAccountTransactionOptionsFragment$data;
export type StaffAccountTransactionOptionsFragment$key = {
  readonly " $data"?: StaffAccountTransactionOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountTransactionOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAccountTransactionOptionsFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CCBillTransaction",
      "kind": "LinkedField",
      "name": "ccbillTransaction",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ccbillTransactionId",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffRefundAccountTransactionButtonFragment"
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};

(node as any).hash = "11837bd6c6609de288749e0da791c86e";

export default node;
