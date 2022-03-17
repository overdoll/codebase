/**
 * @generated SignedSource<<d80a9df0b38b64a8d1af76bc8f29510a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AccountTransactionType = "CHARGEBACK" | "PAYMENT" | "REFUND" | "VOID" | "%future added value";
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AccountTransactionCardFragment$data = {
  readonly type: AccountTransactionType;
  readonly timestamp: any;
  readonly amount: number;
  readonly currency: Currency;
  readonly clubSupporterSubscription: {
    readonly club?: {
      readonly name: string;
    };
  } | null;
  readonly " $fragmentType": "AccountTransactionCardFragment";
};
export type AccountTransactionCardFragment = AccountTransactionCardFragment$data;
export type AccountTransactionCardFragment$key = {
  readonly " $data"?: AccountTransactionCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountTransactionCardFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Club",
    "kind": "LinkedField",
    "name": "club",
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountTransactionCardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "clubSupporterSubscription",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
          "type": "AccountActiveClubSupporterSubscription",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
          "type": "AccountCancelledClubSupporterSubscription",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
          "type": "AccountExpiredClubSupporterSubscription",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};
})();

(node as any).hash = "3f73abe821687214ad197aabe498f44f";

export default node;
