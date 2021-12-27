/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash d3c358aa75ea117805bc34ad8cd10703 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UsernamesQueryVariables = {};
export type UsernamesQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"UsernamesSettingsFragment">;
    } | null;
};
export type UsernamesQuery = {
    readonly response: UsernamesQueryResponse;
    readonly variables: UsernamesQueryVariables;
};



/*
query UsernamesQuery {
  viewer {
    ...UsernamesSettingsFragment
    id
  }
}

fragment UsernamesSettingsFragment on Account {
  username
}
*/

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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "d3c358aa75ea117805bc34ad8cd10703",
    "metadata": {},
    "name": "UsernamesQuery",
    "operationKind": "query",
    "text": null
  }
};
(node as any).hash = '7c4f06712d73eab470e2b3ef98aacfd7';
export default node;
