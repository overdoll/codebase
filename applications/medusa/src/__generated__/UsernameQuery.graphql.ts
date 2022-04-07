/**
 * @generated SignedSource<<89c81f09cfa9f7e24fed8836fd755cc0>>
 * @relayHash 1ad2a11ec98b1164dceea4c1a1d528ae
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1ad2a11ec98b1164dceea4c1a1d528ae

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UsernameQuery$variables = {};
export type UsernameQueryVariables = UsernameQuery$variables;
export type UsernameQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"UsernameSettingsFragment">;
  };
};
export type UsernameQueryResponse = UsernameQuery$data;
export type UsernameQuery = {
  variables: UsernameQueryVariables;
  response: UsernameQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsernameQuery",
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
    "name": "UsernameQuery",
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
    "id": "1ad2a11ec98b1164dceea4c1a1d528ae",
    "metadata": {},
    "name": "UsernameQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "4e5c1a9fe2e92a08374057b96b2f638a";

export default node;
