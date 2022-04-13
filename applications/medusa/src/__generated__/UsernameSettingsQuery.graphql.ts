/**
 * @generated SignedSource<<fa82e815b2f971a987245038341977e4>>
 * @relayHash 3cd36d59940bd069576f2bf07c5ce378
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3cd36d59940bd069576f2bf07c5ce378

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UsernameSettingsQuery$variables = {};
export type UsernameSettingsQueryVariables = UsernameSettingsQuery$variables;
export type UsernameSettingsQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"UsernameSettingsFragment">;
  };
};
export type UsernameSettingsQueryResponse = UsernameSettingsQuery$data;
export type UsernameSettingsQuery = {
  variables: UsernameSettingsQueryVariables;
  response: UsernameSettingsQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsernameSettingsQuery",
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
              "name": "UsernameSettingsFragment"
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
    "name": "UsernameSettingsQuery",
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
            "name": "username",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "usernameEditAvailableAt",
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
    "id": "3cd36d59940bd069576f2bf07c5ce378",
    "metadata": {},
    "name": "UsernameSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "50f38746e1ddf3e49912d63cd4839343";

export default node;
