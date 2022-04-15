/**
 * @generated SignedSource<<1142ea4a5c6bee5814c7b444156418d3>>
 * @relayHash b362964b720ce01b03d1ca29b8bb9e55
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b362964b720ce01b03d1ca29b8bb9e55

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QueueSettingsQuery$variables = {};
export type QueueSettingsQueryVariables = QueueSettingsQuery$variables;
export type QueueSettingsQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"QueueSettingsFragment">;
  };
};
export type QueueSettingsQueryResponse = QueueSettingsQuery$data;
export type QueueSettingsQuery = {
  variables: QueueSettingsQueryVariables;
  response: QueueSettingsQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueueSettingsQuery",
    "selections": [
      {
        "kind": "RequiredField",
        "field": {
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
        },
        "action": "THROW",
        "path": "viewer"
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

(node as any).hash = "57ff9744625fc42fac1ebff3305c7f18";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
