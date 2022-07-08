/**
 * @generated SignedSource<<890968b28f3fd4ea255ad9d2e0c2fdc1>>
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
export type StaffClubPayoutCardFragment$data = {
  readonly amount: number;
  readonly currency: Currency;
  readonly depositDate: any;
  readonly status: ClubPayoutStatus;
  readonly " $fragmentType": "StaffClubPayoutCardFragment";
};
export type StaffClubPayoutCardFragment$key = {
  readonly " $data"?: StaffClubPayoutCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubPayoutCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubPayoutCardFragment",
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
      "name": "depositDate",
      "storageKey": null
    }
  ],
  "type": "ClubPayout",
  "abstractKey": null
};

(node as any).hash = "c22f9772ea0c99cc90745e643c121e32";

export default node;
