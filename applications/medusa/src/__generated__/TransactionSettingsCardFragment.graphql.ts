/**
 * @generated SignedSource<<c16a2344d13cf4aa6a2a3d9b7fcbb441>>
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
  readonly currency: Currency;
  readonly createdAt: any;
  readonly clubSupporterSubscription: {
    readonly club?: {
      readonly id: string;
      readonly name: string;
      readonly thumbnail: {
        readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
      } | null;
    };
  } | null;
  readonly type: AccountTransactionType;
  readonly paymentMethod: {
    readonly card: {
      readonly type: CardType;
      readonly last4: string;
    };
  };
  readonly " $fragmentType": "TransactionSettingsCardFragment";
};
export type TransactionSettingsCardFragment = TransactionSettingsCardFragment$data;
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
                  "name": "id",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Resource",
                  "kind": "LinkedField",
                  "name": "thumbnail",
                  "plural": false,
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ResourceIconFragment"
                    }
                  ],
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

(node as any).hash = "6e558620711662234da44219fd2c6d4a";

export default node;
