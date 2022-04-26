/**
 * @generated SignedSource<<cc2e0df1b554120f07214588d69ac169>>
 * @relayHash bdb3c15f83326969860a6f5976dfb9d0
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID bdb3c15f83326969860a6f5976dfb9d0

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PayoutMethod = "PAXUM" | "%future added value";
export type PayoutMethodSettingsQuery$variables = {};
export type PayoutMethodSettingsQueryVariables = PayoutMethodSettingsQuery$variables;
export type PayoutMethodSettingsQuery$data = {
  readonly viewer: {
    readonly payoutMethod: {
      readonly __typename: string;
      readonly " $fragmentSpreads": FragmentRefs<"PayoutMethodDeleteFragment">;
    } | null;
    readonly details: {
      readonly country: {
        readonly payoutMethods: ReadonlyArray<PayoutMethod>;
        readonly " $fragmentSpreads": FragmentRefs<"PayoutMethodSetupFlowFragment" | "PayoutCountryNotSupportedFragment">;
      };
    } | null;
  };
};
export type PayoutMethodSettingsQueryResponse = PayoutMethodSettingsQuery$data;
export type PayoutMethodSettingsQuery = {
  variables: PayoutMethodSettingsQueryVariables;
  response: PayoutMethodSettingsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "payoutMethods",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PayoutMethodSettingsQuery",
    "selections": [
      {
        "kind": "RequiredField",
        "field": {
          "alias": null,
          "args": null,
          "concreteType": "Account",
          "kind": "LinkedField",
          "name": "viewer",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "payoutMethod",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PayoutMethodDeleteFragment"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "AccountDetails",
              "kind": "LinkedField",
              "name": "details",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Country",
                  "kind": "LinkedField",
                  "name": "country",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "PayoutMethodSetupFlowFragment"
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "PayoutCountryNotSupportedFragment"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        "action": "THROW",
        "path": "viewer"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PayoutMethodSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "payoutMethod",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isAccountPayoutMethod"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "email",
                    "storageKey": null
                  }
                ],
                "type": "AccountPaxumPayoutMethod",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountDetails",
            "kind": "LinkedField",
            "name": "details",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Country",
                "kind": "LinkedField",
                "name": "country",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "bdb3c15f83326969860a6f5976dfb9d0",
    "metadata": {},
    "name": "PayoutMethodSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "8a9e6f04333b6305f4f1bdefcf5d4144";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
