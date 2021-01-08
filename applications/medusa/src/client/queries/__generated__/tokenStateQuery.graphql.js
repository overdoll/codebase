/**
 * @flow
 * @relayHash 7e8a58a7116f261f7b6851f2ffd5b6b9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type tokenStateQueryVariables = {||};
export type tokenStateQueryResponse = {|
  +authentication: ?{|
    +user: ?{|
      +username: string
    |},
    +cookie: ?{|
      +redeemed: boolean,
      +registered: boolean,
      +sameSession: boolean,
    |},
  |}
|};
export type tokenStateQuery = {|
  variables: tokenStateQueryVariables,
  response: tokenStateQueryResponse,
|};
*/


/*
query tokenStateQuery {
  authentication {
    user {
      username
    }
    cookie {
      redeemed
      registered
      sameSession
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Authentication",
    "kind": "LinkedField",
    "name": "authentication",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Cookie",
        "kind": "LinkedField",
        "name": "cookie",
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
            "name": "registered",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sameSession",
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
    "name": "tokenStateQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "tokenStateQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "7e8a58a7116f261f7b6851f2ffd5b6b9",
    "metadata": {},
    "name": "tokenStateQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cc4ae48e5e1436343b4b674f7eb1bed8';

module.exports = node;
