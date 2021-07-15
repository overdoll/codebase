/**
 * @flow
 * @relayHash 860923950119add8766b6f36ff2cf899
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
    "id": "860923950119add8766b6f36ff2cf899",
    "metadata": {},
    "name": "RootAccountRefreshQuery",
    "operationKind": "query",
    "text": null
  }
};
// prettier-ignore
(node: any).hash = '306e9e7ab1478cdfad4b641f02db479e';
module.exports = node;
