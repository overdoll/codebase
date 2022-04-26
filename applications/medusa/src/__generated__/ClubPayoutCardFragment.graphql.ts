/**
 * @generated SignedSource<<dbfd99bdc90be03cfd3ce4446c8a5e03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ClubPayoutStatus = "CANCELLED" | "DEPOSITED" | "FAILED" | "PROCESSING" | "QUEUED" | "%future added value";
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ClubPayoutCardFragment$data = {
  readonly amount: number;
  readonly currency: Currency;
  readonly status: ClubPayoutStatus;
  readonly depositDate: any;
  readonly " $fragmentType": "ClubPayoutCardFragment";
};
export type ClubPayoutCardFragment = ClubPayoutCardFragment$data;
export type ClubPayoutCardFragment$key = {
  readonly " $data"?: ClubPayoutCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPayoutCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPayoutCardFragment",
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "depositDate",
      "storageKey": null
    }
  ],
  "type": "ClubPayout",
  "abstractKey": null
};

(node as any).hash = "c5d4962852688b313f9854cda5dcf275";

export default node;
