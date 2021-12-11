/**
 * @flow
 * @relayHash 7280c1350737606b34c5261d6a7a623a
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
    +multiFactorSettings: {|
      +__typename: string
    |},
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
    multiFactorSettings {
      __typename
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
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountMultiFactorSettings",
  "kind": "LinkedField",
  "name": "multiFactorSettings",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
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
          (v2/*: any*/),
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
          (v2/*: any*/),
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
    "id": "7280c1350737606b34c5261d6a7a623a",
    "metadata": {},
    "name": "RecoveryCodesSetupQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '0876f9bce52915db3fe9ded92c64ae97';
module.exports = node;
