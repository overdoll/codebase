/**
 * @generated SignedSource<<e81025805bd928ed7f130a2cd37ed203>>
 * @relayHash 9343b10e35a53bef9b881dbda4bef88c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9343b10e35a53bef9b881dbda4bef88c

import { ConcreteRequest, Query } from 'relay-runtime';
export type PayoutMethod = "PAXUM" | "%future added value";
export type PayoutMethodSettingsQuery$variables = {};
export type PayoutMethodSettingsQueryVariables = PayoutMethodSettingsQuery$variables;
export type PayoutMethodSettingsQuery$data = {
  readonly viewer: {
    readonly payoutMethod: {
      readonly __typename: string;
    } | null;
    readonly details: {
      readonly country: {
        readonly payoutMethods: ReadonlyArray<PayoutMethod>;
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
                (v0/*: any*/)
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
                    (v1/*: any*/)
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
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/)
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
    "id": "9343b10e35a53bef9b881dbda4bef88c",
    "metadata": {},
    "name": "PayoutMethodSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "1df5214f2d269b82cda3a006e0265f95";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
