/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash b362964b720ce01b03d1ca29b8bb9e55 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueueSettingsQueryVariables = {};
export type QueueSettingsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"QueueSettingsFragment">;
    } | null;
};
export type QueueSettingsQuery = {
    readonly response: QueueSettingsQueryResponse;
    readonly variables: QueueSettingsQueryVariables;
};



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
(node as any).hash = '87666487e59d3d0b0ad33448974d6d75';
export default node;
