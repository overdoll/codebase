/**
 * @flow
 * @relayHash 9b7970fc56affa255f441b8681c82d38
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type JoinFragment$ref = any;
export type RootQueryVariables = {||};
export type RootQueryResponse = {|
  +authentication: ?{|
    +$fragmentRefs: JoinFragment$ref
  |}
|};
export type RootQuery = {|
  variables: RootQueryVariables,
  response: RootQueryResponse,
|};
*/


/*
query RootQuery {
  authentication {
    ...JoinFragment
  }
}

fragment JoinFragment on Authentication {
  user {
    username
  }
  cookie {
    redeemed
    registered
    sameSession
  }
}
*/

const node/*: ConcreteRequest*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Authentication",
        "kind": "LinkedField",
        "name": "authentication",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JoinFragment"
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
    "name": "RootQuery",
    "selections": [
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
    ]
  },
  "params": {
    "id": "9b7970fc56affa255f441b8681c82d38",
    "metadata": {},
    "name": "RootQuery",
    "operationKind": "query",
    "text": null
  }
};
// prettier-ignore
(node/*: any*/).hash = '5bf41ea2f57151c4f5cc01c3e758a806';

module.exports = node;
