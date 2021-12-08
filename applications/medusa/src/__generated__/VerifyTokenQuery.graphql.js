/**
 * @flow
 * @relayHash 10f25abf5f453ed34a15659b68d91744
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type VerifyTokenQueryVariables = {|
  token: string,
  secret?: ?string,
|};
export type VerifyTokenQueryResponse = {|
  +viewAuthenticationToken: ?{|
    +id: string,
    +verified: boolean,
    +sameDevice: boolean,
    +location: {|
      +city: string,
      +subdivision: string,
      +country: string,
    |},
    +userAgent: string,
    +secure: boolean,
  |}
|};
export type VerifyTokenQuery = {|
  variables: VerifyTokenQueryVariables,
  response: VerifyTokenQueryResponse,
|};


/*
query VerifyTokenQuery(
  $token: String!
  $secret: String
) {
  viewAuthenticationToken(token: $token, secret: $secret) {
    id
    verified
    sameDevice
    location {
      city
      subdivision
      country
    }
    userAgent
    secure
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "secret"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "token"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "secret",
        "variableName": "secret"
      },
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "AuthenticationToken",
    "kind": "LinkedField",
    "name": "viewAuthenticationToken",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
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
        "name": "sameDevice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Location",
        "kind": "LinkedField",
        "name": "location",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "city",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "subdivision",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "country",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "userAgent",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "secure",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "VerifyTokenQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "VerifyTokenQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "10f25abf5f453ed34a15659b68d91744",
    "metadata": {},
    "name": "VerifyTokenQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '49330ec24843baef6b796ca2039088c5';
module.exports = node;
