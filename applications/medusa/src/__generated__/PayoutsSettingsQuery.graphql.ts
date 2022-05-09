/**
 * @generated SignedSource<<739b5e0922ac715d916ea3a55342898f>>
 * @relayHash fa242b35ee5e45ba02cf138479d65f7e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID fa242b35ee5e45ba02cf138479d65f7e

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PayoutsSettingsQuery$variables = {};
export type PayoutsSettingsQueryVariables = PayoutsSettingsQuery$variables;
export type PayoutsSettingsQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"PayoutsDetailsSettingsFragment" | "PayoutsMethodSettingsFragment" | "AccountInformationBannerFragment">;
  };
};
export type PayoutsSettingsQueryResponse = PayoutsSettingsQuery$data;
export type PayoutsSettingsQuery = {
  variables: PayoutsSettingsQueryVariables;
  response: PayoutsSettingsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PayoutsSettingsQuery",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "PayoutsDetailsSettingsFragment"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PayoutsMethodSettingsFragment"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "AccountInformationBannerFragment"
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
    "name": "PayoutsSettingsQuery",
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
            "concreteType": "AccountDetails",
            "kind": "LinkedField",
            "name": "details",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "firstName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Country",
                "kind": "LinkedField",
                "name": "country",
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "emoji",
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "payoutMethod",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isAccountPayoutMethod"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v0/*: any*/),
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
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expires",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountDeleting",
            "kind": "LinkedField",
            "name": "deleting",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "scheduledDeletion",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "fa242b35ee5e45ba02cf138479d65f7e",
    "metadata": {},
    "name": "PayoutsSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "fcd9f2180495b90d3ce1afc606f764b2";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
