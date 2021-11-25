/**
 * @flow
 * @relayHash d659ceb54b09f8d4df5d0b249e40119c
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RecoveryCodesSetupQueryVariables = {||};
export type RecoveryCodesSetupQueryResponse = {|
  +viewer: ?{|
    +__id: string,
    +recoveryCodes: $ReadOnlyArray<{|
      +__id: string,
      +code: string,
    |}>,
  |}
|};
export type RecoveryCodesSetupQuery = {|
  variables: RecoveryCodesSetupQueryVariables,
  response: RecoveryCodesSetupQueryResponse,
|};


/*
query RecoveryCodesSetupQuery {
  viewer {
    recoveryCodes {
      code
    }
    id
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
},
v1 = {
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
          (v1/*: any*/),
          (v0/*: any*/)
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
          (v1/*: any*/),
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
    "id": "d659ceb54b09f8d4df5d0b249e40119c",
    "metadata": {},
    "name": "RecoveryCodesSetupQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '49e6c015be3f175b95ab88a3ac4023ec';
module.exports = node;
