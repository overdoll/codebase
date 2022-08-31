/**
 * @generated SignedSource<<ee88f43a0ce74ec6248b4f7a417ab53e>>
 * @relayHash ae801335ff3b7778738febd1f1adb9b5
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ae801335ff3b7778738febd1f1adb9b5

import { ConcreteRequest, Query } from 'relay-runtime';
export type MainMenuButtonClubsQuery$variables = {};
export type MainMenuButtonClubsQuery$data = {
  readonly viewer: {
    readonly clubMembersPostsFeed: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly __typename: "Post";
        };
      }>;
    };
    readonly likedPosts: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly __typename: "Post";
        };
      }>;
    };
  } | null;
};
export type MainMenuButtonClubsQuery = {
  response: MainMenuButtonClubsQuery$data;
  variables: MainMenuButtonClubsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PostEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PostEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v3/*: any*/)
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
    "name": "MainMenuButtonClubsQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "likedPosts",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": "likedPosts(first:1)"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "clubMembersPostsFeed",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": "clubMembersPostsFeed(first:1)"
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
    "name": "MainMenuButtonClubsQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "likedPosts",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "likedPosts(first:1)"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "clubMembersPostsFeed",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "clubMembersPostsFeed(first:1)"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "ae801335ff3b7778738febd1f1adb9b5",
    "metadata": {},
    "name": "MainMenuButtonClubsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "dfa75685f96fd482272a8fb7588c13bc";

export default node;
