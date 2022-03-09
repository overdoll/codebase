/**
 * @generated SignedSource<<59426d0c2f33839be7398eb03d321db2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectPaymentMethodFragment$data = {
  readonly savedPaymentMethods: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly paymentMethod: {
          readonly card: {
            readonly last4: string;
            readonly expiration: string;
            readonly " $fragmentSpreads": FragmentRefs<"DisplayCardFragment">;
          };
        };
      };
    }>;
  };
  readonly " $fragmentType": "SelectPaymentMethodFragment";
};
export type SelectPaymentMethodFragment = SelectPaymentMethodFragment$data;
export type SelectPaymentMethodFragment$key = {
  readonly " $data"?: SelectPaymentMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectPaymentMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectPaymentMethodFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountSavedPaymentMethodConnection",
      "kind": "LinkedField",
      "name": "savedPaymentMethods",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountSavedPaymentMethodEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AccountSavedPaymentMethod",
              "kind": "LinkedField",
              "name": "node",
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
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "last4",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "expiration",
                          "storageKey": null
                        },
                        {
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "DisplayCardFragment"
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "021508f9939827a8c69de427f7558ba1";

export default node;
