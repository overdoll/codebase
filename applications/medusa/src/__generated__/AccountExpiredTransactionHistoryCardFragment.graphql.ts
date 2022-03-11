/**
 * @generated SignedSource<<b3e3e8252a64ddf6ae44836a463a0507>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountExpiredTransactionHistoryCardFragment$data = {
  readonly timestamp: any;
  readonly supportedClub: {
    readonly name: string;
  } | null;
  readonly " $fragmentType": "AccountExpiredTransactionHistoryCardFragment";
};
export type AccountExpiredTransactionHistoryCardFragment = AccountExpiredTransactionHistoryCardFragment$data;
export type AccountExpiredTransactionHistoryCardFragment$key = {
  readonly " $data"?: AccountExpiredTransactionHistoryCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountExpiredTransactionHistoryCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountExpiredTransactionHistoryCardFragment",
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
  "type": "AccountExpiredTransactionHistory",
  "abstractKey": null
};

(node as any).hash = "3729c8c04354ae1b4a26edcfc71622c7";

export default node;
