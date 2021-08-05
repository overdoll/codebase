/**
 * @flow
 * @relayHash e2b9e029f597eba6ddaf0b9de1ef41bf
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { QueueSettingsFragment$ref } from "./QueueSettingsFragment.graphql";
export type PreparedQueueSettingsQueryVariables = {||};
export type PreparedQueueSettingsQueryResponse = {|
  +$fragmentRefs: QueueSettingsFragment$ref
|};
export type PreparedQueueSettingsQuery = {|
  variables: PreparedQueueSettingsQueryVariables,
  response: PreparedQueueSettingsQueryResponse,
|};


/*
query PreparedQueueSettingsQuery {
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
    "name": "PreparedQueueSettingsQuery",
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
    "name": "PreparedQueueSettingsQuery",
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
    "id": "e2b9e029f597eba6ddaf0b9de1ef41bf",
    "metadata": {},
    "name": "PreparedQueueSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
// prettier-ignore
(node: any).hash = 'cee13b9eff45fcaef6b3f977124d37ee';
module.exports = node;
