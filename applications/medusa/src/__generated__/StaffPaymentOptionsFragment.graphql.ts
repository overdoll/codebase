/**
 * @generated SignedSource<<6dd7c671ea5b289b06e62a24a51dc298>>
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
export type StaffPaymentOptionsFragment$data = {
  readonly baseAmount: number;
  readonly platformFeeAmount: number;
  readonly finalAmount: number;
  readonly currency: Currency;
  readonly status: ClubPaymentStatus;
  readonly isDeduction: boolean;
  readonly " $fragmentType": "StaffPaymentOptionsFragment";
};
export type StaffPaymentOptionsFragment = StaffPaymentOptionsFragment$data;
export type StaffPaymentOptionsFragment$key = {
  readonly " $data"?: StaffPaymentOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffPaymentOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffPaymentOptionsFragment",
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
      "name": "platformFeeAmount",
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

(node as any).hash = "35f9d95f6e7a1aeb8b664f2c4fe2c8a7";

export default node;
