/**
 * @flow
 * @relayHash f73676f64b625e8a4675220e03185d00
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type tokenStateQueryVariables = {||};
export type tokenStateQueryResponse = {|
  +state: ?{|
    +user: ?{|
      +username: string
    |},
    +tokenData: ?{|
      +redeemed: boolean,
      +registered: boolean,
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
  state {
    user {
      username
    }
    tokenData {
      redeemed
      registered
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "UserState",
    "kind": "LinkedField",
    "name": "state",
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
        "concreteType": "Token",
        "kind": "LinkedField",
        "name": "tokenData",
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
    "id": "9d2a052e29962f7cce23bb95f873323813d7d4141cb1d3552fcf5f6380075e1b",
    "metadata": {},
    "name": "tokenStateQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a4fd4aa56630855526300ec5df3b7648';

module.exports = node;
