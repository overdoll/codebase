/**
 * @flow
 * @relayHash f8f92ad46d5b8aebeba065ad06a145f5
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type TokenQueryVariables = {|
  token?: ?string
|};
export type TokenQueryResponse = {|
  +viewAuthenticationToken: ?{|
    +id: string,
    +verified: boolean,
    +sameSession: boolean,
    +location: {|
      +city: string,
      +subdivision: string,
      +country: string,
    |},
    +device: string,
    +secure: boolean,
  |}
|};
export type TokenQuery = {|
  variables: TokenQueryVariables,
  response: TokenQueryResponse,
|};


/*
query TokenQuery(
  $token: String
) {
  viewAuthenticationToken(token: $token) {
    id
    verified
    sameSession
    location {
      city
      subdivision
      country
    }
    device
    secure
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
        "name": "sameSession",
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
        "name": "device",
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
    "id": "f8f92ad46d5b8aebeba065ad06a145f5",
    "metadata": {},
    "name": "TokenQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'ee85e0458f8390e45f4776fa378bd6c6';
module.exports = node;
