/**
 * @generated SignedSource<<79710e49f83265adfd29d559d5b6fc56>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountCancelledTransactionHistoryCardFragment$data = {
  readonly timestamp: any;
  readonly supportedClub: {
    readonly name: string;
  } | null;
  readonly ccbillReason: string | null;
  readonly " $fragmentType": "AccountCancelledTransactionHistoryCardFragment";
};
export type AccountCancelledTransactionHistoryCardFragment = AccountCancelledTransactionHistoryCardFragment$data;
export type AccountCancelledTransactionHistoryCardFragment$key = {
  readonly " $data"?: AccountCancelledTransactionHistoryCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountCancelledTransactionHistoryCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountCancelledTransactionHistoryCardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timestamp",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "supportedClub",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ccbillReason",
      "storageKey": null
    }
  ],
  "type": "AccountCancelledTransactionHistory",
  "abstractKey": null
};

(node as any).hash = "372966db9475b17798dbe7f8c4bb06ed";

export default node;
