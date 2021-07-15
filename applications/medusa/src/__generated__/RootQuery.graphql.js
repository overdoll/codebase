/**
 * @flow
 * @relayHash a4af7c63a12bb944378a23eb8da64e56
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { RootComponent_account$ref } from "./RootComponent_account.graphql";
export type RootQueryVariables = {||};
export type RootQueryResponse = {|
  +$fragmentRefs: RootComponent_account$ref
|};
export type RootQuery = {|
  variables: RootQueryVariables,
  response: RootQueryResponse,
|};


/*
query RootQuery {
  ...RootComponent_account
}

fragment RootComponent_account on Query {
  authenticatedAccount {
    username
    roles
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "RootComponent_account"
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
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "authenticatedAccount",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "roles",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "a4af7c63a12bb944378a23eb8da64e56",
    "metadata": {},
    "name": "RootQuery",
    "operationKind": "query",
    "text": null
  }
};
// prettier-ignore
(node: any).hash = 'ccb034c86a1899fcb487573a204d4eb2';
module.exports = node;
