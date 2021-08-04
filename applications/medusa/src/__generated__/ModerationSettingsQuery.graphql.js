/**
 * @flow
 * @relayHash 336ee446efb9ac696e4711e4d6371ee0
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { QueueSettingsFragment$ref } from "./QueueSettingsFragment.graphql";
export type ModerationSettingsQueryVariables = {||};
export type ModerationSettingsQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: QueueSettingsFragment$ref
  |}
|};
export type ModerationSettingsQuery = {|
  variables: ModerationSettingsQueryVariables,
  response: ModerationSettingsQueryResponse,
|};


/*
query ModerationSettingsQuery {
  viewer {
    ...QueueSettingsFragment
    id
  }
}

fragment QueueSettingsFragment on Account {
  moderator {
    __typename
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
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
            "concreteType": "Moderator",
            "kind": "LinkedField",
            "name": "moderator",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "336ee446efb9ac696e4711e4d6371ee0",
    "metadata": {},
    "name": "ModerationSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '704937f3ebc33dece32dba64592da904';
module.exports = node;
