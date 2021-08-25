/**
 * @flow
 * @relayHash 02937eb4168667b6e20b7b7f530e6d9c
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { RecoveryCodesListFragment$ref } from "./RecoveryCodesListFragment.graphql";
export type RecoveryCodesSetupQueryVariables = {||};
export type RecoveryCodesSetupQueryResponse = {|
  +viewer: ?{|
    +recoveryCodes: $ReadOnlyArray<{|
      +code: string
    |}>,
    +$fragmentRefs: RecoveryCodesListFragment$ref,
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
    recoveryCodes {
      code
    }
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
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
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountMultiFactorRecoveryCode",
            "kind": "LinkedField",
            "name": "recoveryCodes",
            "plural": true,
            "selections": [
              (v0/*: any*/)
            ],
            "storageKey": null
          },
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
              (v0/*: any*/),
              {
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
              }
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
    "id": "02937eb4168667b6e20b7b7f530e6d9c",
    "metadata": {},
    "name": "RecoveryCodesSetupQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '51021e92b99995cae4ec8f3995e6ed23';
module.exports = node;
