/**
 * @generated SignedSource<<55e66ef5d2492352de7059145747c9e3>>
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
export type StaffTransactionCardFragment$data = {
  readonly type: AccountTransactionType;
  readonly timestamp: any;
  readonly amount: number;
  readonly currency: Currency;
  readonly clubSupporterSubscription: {
    readonly club?: {
      readonly name: string;
    };
  } | null;
  readonly " $fragmentType": "StaffTransactionCardFragment";
};
export type StaffTransactionCardFragment = StaffTransactionCardFragment$data;
export type StaffTransactionCardFragment$key = {
  readonly " $data"?: StaffTransactionCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffTransactionCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffTransactionCardFragment",
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
          "selections": [
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
          ],
          "type": "IAccountClubSupporterSubscription",
          "abstractKey": "__isIAccountClubSupporterSubscription"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};

(node as any).hash = "79c1b6e16b9523a60edc0dd3181519e2";

export default node;
