/**
 * @flow
 * @relayHash d7c65b4fa9fe3846a5044beb756865e3
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { QueueSettingsFragment$ref } from "./QueueSettingsFragment.graphql";
export type QueueSettingsQueryVariables = {||};
export type QueueSettingsQueryResponse = {|
  +$fragmentRefs: QueueSettingsFragment$ref
|};
export type QueueSettingsQuery = {|
  variables: QueueSettingsQueryVariables,
  response: QueueSettingsQueryResponse,
|};


/*
query QueueSettingsQuery {
  ...QueueSettingsFragment
}

fragment QueueSettingsFragment on Query {
  viewer {
    __typename
    id
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueueSettingsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "QueueSettingsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "QueueSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "d7c65b4fa9fe3846a5044beb756865e3",
    "metadata": {},
    "name": "QueueSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
// prettier-ignore
(node: any).hash = 'afb665c2f2aab07307e71326e449ddf6';
module.exports = node;
