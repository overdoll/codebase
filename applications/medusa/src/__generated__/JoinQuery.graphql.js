/**
 * @flow
 * @relayHash 310060b52c63cc09be5b62f5f3f9a25d
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type MultiFactorTypeEnum = "TOTP" | "%future added value";
export type JoinQueryVariables = {||};
export type JoinQueryResponse = {|
  +authenticationTokenStatus: ?{|
    +redeemed: boolean,
    +email: string,
    +accountStatus: ?{|
      +registered: boolean,
      +multiFactor: ?$ReadOnlyArray<MultiFactorTypeEnum>,
    |},
  |}
|};
export type JoinQuery = {|
  variables: JoinQueryVariables,
  response: JoinQueryResponse,
|};


/*
query JoinQuery {
  authenticationTokenStatus {
    redeemed
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
    "name": "authenticationTokenStatus",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "redeemed",
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
    "id": "310060b52c63cc09be5b62f5f3f9a25d",
    "metadata": {},
    "name": "JoinQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'bed1af4c0f9cea2f12acd5d8898dd433';
module.exports = node;
