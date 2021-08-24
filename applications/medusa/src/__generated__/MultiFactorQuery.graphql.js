/**
 * @flow
 * @relayHash 83a17f651be56f7d014d2e5f59734266
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { MultiFactorTotpFragment$ref } from "./MultiFactorTotpFragment.graphql";
export type MultiFactorQueryVariables = {||};
export type MultiFactorQueryResponse = {|
  +viewer: ?{|
    +multiFactorSettings: {|
      +multiFactorEnabled: boolean,
      +recoveryCodesGenerated: boolean,
      +$fragmentRefs: MultiFactorTotpFragment$ref,
    |}
  |}
|};
export type MultiFactorQuery = {|
  variables: MultiFactorQueryVariables,
  response: MultiFactorQueryResponse,
|};


/*
query MultiFactorQuery {
  viewer {
    multiFactorSettings {
      multiFactorEnabled
      ...MultiFactorTotpFragment
      recoveryCodesGenerated
    }
    id
  }
}

fragment MultiFactorTotpFragment on AccountMultiFactorSettings {
  multiFactorTotpConfigured
  canDisableMultiFactor
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "multiFactorEnabled",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "recoveryCodesGenerated",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MultiFactorQuery",
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
            "concreteType": "AccountMultiFactorSettings",
            "kind": "LinkedField",
            "name": "multiFactorSettings",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MultiFactorTotpFragment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MultiFactorQuery",
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
            "concreteType": "AccountMultiFactorSettings",
            "kind": "LinkedField",
            "name": "multiFactorSettings",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "multiFactorTotpConfigured",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "canDisableMultiFactor",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "83a17f651be56f7d014d2e5f59734266",
    "metadata": {},
    "name": "MultiFactorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '8e86a5313fd621b5b28fe3fffc4bb3ac';
module.exports = node;
