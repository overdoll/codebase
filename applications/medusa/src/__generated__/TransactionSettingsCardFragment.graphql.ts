/**
 * @generated SignedSource<<887b68522e3152503d3d5b5b2621a2aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AccountTransactionType = "CHARGEBACK" | "PAYMENT" | "REFUND" | "VOID" | "%future added value";
export type CardType = "AMEX" | "DISCOVER" | "JCB" | "MASTERCARD" | "OTHER" | "VISA" | "%future added value";
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TransactionSettingsCardFragment$data = {
  readonly amount: number;
  readonly clubSupporterSubscription: {
    readonly club?: {
      readonly name: string;
      readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment">;
    };
  } | null;
  readonly createdAt: any;
  readonly currency: Currency;
  readonly paymentMethod: {
    readonly card: {
      readonly last4: string;
      readonly type: CardType;
    };
  };
  readonly totalRefunded: number;
  readonly type: AccountTransactionType;
  readonly " $fragmentType": "TransactionSettingsCardFragment";
};
export type TransactionSettingsCardFragment$key = {
  readonly " $data"?: TransactionSettingsCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TransactionSettingsCardFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TransactionSettingsCardFragment",
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
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalRefunded",
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
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ClubThumbnailFragment"
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
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PaymentMethod",
      "kind": "LinkedField",
      "name": "paymentMethod",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Card",
          "kind": "LinkedField",
          "name": "card",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "last4",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};
})();

(node as any).hash = "8a76c696d66354a873a0fed21ad6e347";

export default node;
