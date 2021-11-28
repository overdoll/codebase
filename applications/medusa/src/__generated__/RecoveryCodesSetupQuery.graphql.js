/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { RecoveryCodesListFragment$ref } from "./RecoveryCodesListFragment.graphql";
export type RecoveryCodesSetupQueryVariables = {||};
export type RecoveryCodesSetupQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: RecoveryCodesListFragment$ref
  |}
|};
export type RecoveryCodesSetupQuery = {|
  variables: RecoveryCodesSetupQueryVariables,
  response: RecoveryCodesSetupQueryResponse,
|};


/*
query RecoveryCodesSetupQuery {
  viewer {
    ...RecoveryCodesListFragment
    id
  }
}

fragment RecoveryCodesListFragment on Account {
  recoveryCodes {
    code
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RecoveryCodesSetupQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "RecoveryCodesListFragment"
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
    "name": "RecoveryCodesSetupQuery",
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
            "concreteType": "AccountMultiFactorRecoveryCode",
            "kind": "LinkedField",
            "name": "recoveryCodes",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "code",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9097a2936461090daa359d77db6f3c6e",
    "id": null,
    "metadata": {},
    "name": "RecoveryCodesSetupQuery",
    "operationKind": "query",
    "text": "query RecoveryCodesSetupQuery {\n  viewer {\n    ...RecoveryCodesListFragment\n    id\n  }\n}\n\nfragment RecoveryCodesListFragment on Account {\n  recoveryCodes {\n    code\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '88c415f5d7183030bead5730eb37d3d1';
module.exports = node;
