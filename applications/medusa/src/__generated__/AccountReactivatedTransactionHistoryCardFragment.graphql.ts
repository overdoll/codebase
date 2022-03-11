/**
 * @generated SignedSource<<a2a705dfdaa9e5f09d7ab5d707d68751>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountReactivatedTransactionHistoryCardFragment$data = {
  readonly timestamp: any;
  readonly supportedClub: {
    readonly name: string;
  } | null;
  readonly " $fragmentType": "AccountReactivatedTransactionHistoryCardFragment";
};
export type AccountReactivatedTransactionHistoryCardFragment = AccountReactivatedTransactionHistoryCardFragment$data;
export type AccountReactivatedTransactionHistoryCardFragment$key = {
  readonly " $data"?: AccountReactivatedTransactionHistoryCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountReactivatedTransactionHistoryCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountReactivatedTransactionHistoryCardFragment",
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
    }
  ],
  "type": "AccountReactivatedTransactionHistory",
  "abstractKey": null
};

(node as any).hash = "7529de572d1e30942324ccf2c3060685";

export default node;
