/**
 * @flow
 * @relayHash d660dc6770c44c1877ca917fb555406c
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type MultiFactorTypeEnum = "TOTP" | "%future added value";
export type TokenQueryVariables = {|
  token: string
|};
export type TokenQueryResponse = {|
  +redeemAuthenticationToken: ?{|
    +redeemed: boolean,
    +email: string,
    +session: string,
    +sameSession: boolean,
    +accountStatus: ?{|
      +registered: boolean,
      +authenticated: boolean,
      +multiFactor: ?$ReadOnlyArray<MultiFactorTypeEnum>,
    |},
  |}
|};
export type TokenQuery = {|
  variables: TokenQueryVariables,
  response: TokenQueryResponse,
|};


/*
query TokenQuery(
  $token: String!
) {
  redeemAuthenticationToken(token: $token) {
    redeemed
    email
    session
    sameSession
    accountStatus {
      registered
      authenticated
      multiFactor
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "AuthenticationToken",
    "kind": "LinkedField",
    "name": "redeemAuthenticationToken",
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
        "kind": "ScalarField",
        "name": "session",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "sameSession",
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
            "name": "authenticated",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TokenQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TokenQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "d660dc6770c44c1877ca917fb555406c",
    "metadata": {},
    "name": "TokenQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'ba49eb0156ee17633f68ef074eb575c0';
module.exports = node;
