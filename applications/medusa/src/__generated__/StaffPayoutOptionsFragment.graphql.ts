/**
 * @generated SignedSource<<41b43ff71a5ac7f714a1c2b573fa9794>>
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
export type StaffPayoutOptionsFragment$data = {
  readonly amount: number;
  readonly currency: Currency;
  readonly status: ClubPayoutStatus;
  readonly depositDate: any;
  readonly " $fragmentSpreads": FragmentRefs<"UpdateClubPayoutDepositDateFormFragment" | "StaffCancelClubPayoutButtonFragment" | "StaffRetryClubPayoutButtonFragment">;
  readonly " $fragmentType": "StaffPayoutOptionsFragment";
};
export type StaffPayoutOptionsFragment = StaffPayoutOptionsFragment$data;
export type StaffPayoutOptionsFragment$key = {
  readonly " $data"?: StaffPayoutOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffPayoutOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffPayoutOptionsFragment",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateClubPayoutDepositDateFormFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffCancelClubPayoutButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffRetryClubPayoutButtonFragment"
    }
  ],
  "type": "ClubPayout",
  "abstractKey": null
};

(node as any).hash = "0bb57d1ba10b146a2e758b6ef00243f0";

export default node;
