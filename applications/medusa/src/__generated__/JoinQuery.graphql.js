/**
 * @flow
 * @relayHash 2b51a5e9b2393d80f07edf51d08a95ff
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type MultiFactorType = "TOTP" | "%future added value";
export type JoinQueryVariables = {||};
export type JoinQueryResponse = {|
  +viewAuthenticationToken: ?{|
    +verified: boolean,
    +email: string,
    +accountStatus: ?{|
      +registered: boolean,
      +multiFactor: ?$ReadOnlyArray<MultiFactorType>,
    |},
  |}
|};
export type JoinQuery = {|
  variables: JoinQueryVariables,
  response: JoinQueryResponse,
|};


/*
query JoinQuery {
  viewAuthenticationToken {
    verified
    email
    accountStatus {
      registered
      multiFactor
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AuthenticationToken",
    "kind": "LinkedField",
    "name": "viewAuthenticationToken",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "verified",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AuthenticationTokenAccountStatus",
        "kind": "LinkedField",
        "name": "accountStatus",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "registered",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "multiFactor",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "JoinQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "JoinQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "2b51a5e9b2393d80f07edf51d08a95ff",
    "metadata": {},
    "name": "JoinQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'f2bafb3d876fdbce22cd089176e67050';
module.exports = node;
