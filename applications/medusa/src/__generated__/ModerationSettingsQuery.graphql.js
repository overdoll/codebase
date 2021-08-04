/**
 * @flow
 * @relayHash cc281904ed6fe764d570de27c967a161
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { QueueSettingsFragment$ref } from "./QueueSettingsFragment.graphql";
export type ModerationSettingsQueryVariables = {||};
export type ModerationSettingsQueryResponse = {|
  +$fragmentRefs: QueueSettingsFragment$ref
|};
export type ModerationSettingsQuery = {|
  variables: ModerationSettingsQueryVariables,
  response: ModerationSettingsQueryResponse,
|};


/*
query ModerationSettingsQuery {
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
    "name": "ModerationSettingsQuery",
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
    "name": "ModerationSettingsQuery",
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
    "id": "cc281904ed6fe764d570de27c967a161",
    "metadata": {},
    "name": "ModerationSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
// prettier-ignore
(node: any).hash = '555045c3015fa2569090184eff56a879';
module.exports = node;
