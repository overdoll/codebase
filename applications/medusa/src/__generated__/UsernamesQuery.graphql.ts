/**
 * @generated SignedSource<<f41489805ec8b95a96b90d94d603f530>>
 * @relayHash 3b6638f090dfe40224eaaa6e68a7779b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3b6638f090dfe40224eaaa6e68a7779b

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UsernamesQuery$variables = {};
export type UsernamesQueryVariables = UsernamesQuery$variables;
export type UsernamesQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"UsernamesSettingsFragment">;
  } | null;
};
export type UsernamesQueryResponse = UsernamesQuery$data;
export type UsernamesQuery = {
  variables: UsernamesQueryVariables;
  response: UsernamesQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsernamesQuery",
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
            "name": "UsernamesSettingsFragment"
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
    "name": "UsernamesQuery",
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
    "id": "3b6638f090dfe40224eaaa6e68a7779b",
    "metadata": {},
    "name": "UsernamesQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "7c4f06712d73eab470e2b3ef98aacfd7";

export default node;
