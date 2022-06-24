/**
 * @generated SignedSource<<31d2684b6769c21c6af31305d78bb9f0>>
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
export type StaffClubPaymentCardFragment$data = {
  readonly currency: Currency;
  readonly finalAmount: number;
  readonly settlementDate: any;
  readonly status: ClubPaymentStatus;
  readonly " $fragmentType": "StaffClubPaymentCardFragment";
};
export type StaffClubPaymentCardFragment$key = {
  readonly " $data"?: StaffClubPaymentCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubPaymentCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubPaymentCardFragment",
  "selections": [
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
      "name": "currency",
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
      "name": "settlementDate",
      "storageKey": null
    }
  ],
  "type": "ClubPayment",
  "abstractKey": null
};

(node as any).hash = "f1c22919e11507b6b3fe27853af8e1e5";

export default node;
