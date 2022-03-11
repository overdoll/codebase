/**
 * @generated SignedSource<<3708e795a6e541200497fcfffff2907a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountFailedTransactionHistoryCardFragment$data = {
  readonly timestamp: any;
  readonly supportedClub: {
    readonly name: string;
  } | null;
  readonly ccbillErrorCode: string | null;
  readonly " $fragmentType": "AccountFailedTransactionHistoryCardFragment";
};
export type AccountFailedTransactionHistoryCardFragment = AccountFailedTransactionHistoryCardFragment$data;
export type AccountFailedTransactionHistoryCardFragment$key = {
  readonly " $data"?: AccountFailedTransactionHistoryCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountFailedTransactionHistoryCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountFailedTransactionHistoryCardFragment",
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
      "name": "ccbillErrorCode",
      "storageKey": null
    }
  ],
  "type": "AccountFailedTransactionHistory",
  "abstractKey": null
};

(node as any).hash = "c31ad008b9305eb951d851ce91b546e6";

export default node;
