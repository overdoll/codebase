/**
 * @generated SignedSource<<ff2b24b3edd6a6c5ddd9dd50d8aa84c2>>
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
  readonly amount: number;
  readonly billedAtDate: any;
  readonly ccbillTransaction: {
    readonly ccbillTransactionId: string | null;
  } | null;
  readonly currency: Currency;
  readonly type: AccountTransactionType;
  readonly " $fragmentSpreads": FragmentRefs<"StaffRefundAccountTransactionButtonFragment">;
  readonly " $fragmentType": "StaffAccountTransactionOptionsFragment";
};
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

(node as any).hash = "1334b94d56ae62b9c0abad92e644969c";

export default node;
