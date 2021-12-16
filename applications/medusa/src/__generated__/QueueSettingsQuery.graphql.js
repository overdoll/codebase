/**
 * @flow
 * @relayHash b362964b720ce01b03d1ca29b8bb9e55
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { QueueSettingsFragment$ref } from "./QueueSettingsFragment.graphql";
export type QueueSettingsQueryVariables = {||};
export type QueueSettingsQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: QueueSettingsFragment$ref
  |}
|};
export type QueueSettingsQuery = {|
  variables: QueueSettingsQueryVariables,
  response: QueueSettingsQueryResponse,
|};


/*
query QueueSettingsQuery {
  viewer {
    ...QueueSettingsFragment
    id
  }
}

fragment QueueSettingsFragment on Account {
  id
  moderatorSettings {
    isInModeratorQueue
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
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "QueueSettingsFragment"
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
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ModeratorSettings",
            "kind": "LinkedField",
            "name": "moderatorSettings",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isInModeratorQueue",
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
    "id": "b362964b720ce01b03d1ca29b8bb9e55",
    "metadata": {},
    "name": "QueueSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
// prettier-ignore
(node: any).hash = '87666487e59d3d0b0ad33448974d6d75';
module.exports = node;
