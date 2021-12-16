<<<<<<< HEAD:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.js
/**
 * @flow
 * @relayHash b362964b720ce01b03d1ca29b8bb9e55
 */

=======
/* tslint:disable */
>>>>>>> master:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.ts
/* eslint-disable */
// @ts-nocheck
/* @relayHash dcb46663ed45d0d4edb35941026f4a66 */

import { ConcreteRequest } from "relay-runtime";
export type QueueSettingsQueryVariables = {};
export type QueueSettingsQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly moderatorSettings: {
            readonly isInModeratorQueue: boolean;
        };
    } | null;
};
export type QueueSettingsQuery = {
    readonly response: QueueSettingsQueryResponse;
    readonly variables: QueueSettingsQueryVariables;
};

<<<<<<< HEAD:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.js
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
=======
>>>>>>> master:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.ts


/*
query QueueSettingsQuery {
  viewer {
<<<<<<< HEAD:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.js
    ...QueueSettingsFragment
=======
>>>>>>> master:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.ts
    id
    moderatorSettings {
      isInModeratorQueue
    }
  }
}

fragment QueueSettingsFragment on Account {
  id
  moderatorSettings {
    isInModeratorQueue
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
<<<<<<< HEAD:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.js
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
=======
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
>>>>>>> master:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.ts
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
<<<<<<< HEAD:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.js
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
=======
            "name": "isInModeratorQueue",
>>>>>>> master:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.ts
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueueSettingsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "QueueSettingsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
<<<<<<< HEAD:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.js
    "id": "b362964b720ce01b03d1ca29b8bb9e55",
=======
    "id": "dcb46663ed45d0d4edb35941026f4a66",
>>>>>>> master:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.ts
    "metadata": {},
    "name": "QueueSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
<<<<<<< HEAD:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.js
// prettier-ignore
(node: any).hash = '87666487e59d3d0b0ad33448974d6d75';
module.exports = node;
=======
})();
(node as any).hash = '39706208c79f01166cccd0abdabd866e';
export default node;
>>>>>>> master:applications/medusa/src/__generated__/QueueSettingsQuery.graphql.ts
