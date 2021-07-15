/**
 * @flow
 * @relayHash 19ac107dd1b6cb54d7ab3fa2bc25d36b
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RootComponent_account$ref: FragmentReference;
declare export opaque type RootComponent_account$fragmentType: RootComponent_account$ref;
export type RootAccountRefreshQueryVariables = {||};
export type RootAccountRefreshQueryResponse = {|
  +$fragmentRefs: RootComponent_account$ref
|};
export type RootAccountRefreshQuery = {|
  variables: RootAccountRefreshQueryVariables,
  response: RootAccountRefreshQueryResponse,
|};


/*
query RootAccountRefreshQuery {
  ...RootComponent_account
}

fragment RootComponent_account on Query {
  viewer {
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
    "name": "RootAccountRefreshQuery",
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
    "name": "RootAccountRefreshQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
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
    "id": "19ac107dd1b6cb54d7ab3fa2bc25d36b",
    "metadata": {},
    "name": "RootAccountRefreshQuery",
    "operationKind": "query",
    "text": null
  }
};
// prettier-ignore
(node: any).hash = 'b2c00bb941f6dd7e2b6aa2df3f3d257e';
module.exports = node;
