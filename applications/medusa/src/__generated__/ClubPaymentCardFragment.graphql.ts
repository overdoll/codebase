/**
 * @generated SignedSource<<bcef072a0c233593ecb81bb0a56de79b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ClubPaymentStatus = "COMPLETE" | "PENDING" | "READY" | "%future added value";
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ClubPaymentCardFragment$data = {
  readonly settlementDate: any;
  readonly reference: string;
  readonly finalAmount: number;
  readonly currency: Currency;
  readonly status: ClubPaymentStatus;
  readonly isDeduction: boolean;
  readonly " $fragmentType": "ClubPaymentCardFragment";
};
export type ClubPaymentCardFragment = ClubPaymentCardFragment$data;
export type ClubPaymentCardFragment$key = {
  readonly " $data"?: ClubPaymentCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPaymentCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPaymentCardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "settlementDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "finalAmount",
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDeduction",
      "storageKey": null
    }
  ],
  "type": "ClubPayment",
  "abstractKey": null
};

(node as any).hash = "5b24637f10b6d0e4934311ade4848528";

export default node;
