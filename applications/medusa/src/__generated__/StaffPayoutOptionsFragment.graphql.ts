/**
 * @generated SignedSource<<88bdeb5d02ab3956656fdc1b0ceb8d01>>
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
  readonly coverFeeAmount: number;
  readonly currency: Currency;
  readonly depositDate: any;
  readonly status: ClubPayoutStatus;
  readonly " $fragmentSpreads": FragmentRefs<"StaffCancelClubPayoutButtonFragment" | "StaffRetryClubPayoutButtonFragment" | "UpdateClubPayoutDepositDateFormFragment">;
  readonly " $fragmentType": "StaffPayoutOptionsFragment";
};
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
      "name": "coverFeeAmount",
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

(node as any).hash = "849a54a29ea7501e155cdbe6435ca305";

export default node;
