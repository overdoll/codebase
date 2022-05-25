/**
 * @generated SignedSource<<ad69e85423c0b445debc348b4a308f9c>>
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
  readonly amount: number;
  readonly currency: Currency;
  readonly createdAt: any;
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
      "name": "createdAt",
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

(node as any).hash = "a71d2ec6b0623d442d73e7a6ca309ece";

export default node;
