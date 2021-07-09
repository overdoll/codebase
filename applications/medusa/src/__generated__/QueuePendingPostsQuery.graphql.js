/**
 * @flow
 * @relayHash 7443eb8018b9947b071f783c15b2706b
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type QueuePendingPostsQueryVariables = {|
  before?: ?string,
  after?: ?string,
  first?: ?number,
  last?: ?number,
|};
export type QueuePendingPostsQueryResponse = {|
  +pendingPosts: {|
    +edges: $ReadOnlyArray<{|
      +cursor: string,
      +node: {|
        +id: string,
        +state: string,
        +contributor: {|
          +username: string,
          +avatar: string,
        |},
        +content: $ReadOnlyArray<string>,
        +categories: $ReadOnlyArray<{|
          +title: string
        |}>,
        +characters: $ReadOnlyArray<{|
          +name: string,
          +media: {|
            +title: string
          |},
        |}>,
        +mediaRequests: ?$ReadOnlyArray<string>,
        +characterRequests: ?$ReadOnlyArray<{|
          +name: string,
          +media: string,
        |}>,
        +artistUsername: string,
      |},
    |}>,
    +pageInfo: {|
      +startCursor: ?string,
      +endCursor: ?string,
      +hasNextPage: boolean,
      +hasPreviousPage: boolean,
    |},
  |}
|};
export type QueuePendingPostsQuery = {|
  variables: QueuePendingPostsQueryVariables,
  response: QueuePendingPostsQueryResponse,
|};


/*
query QueuePendingPostsQuery(
  $before: String
  $after: String
  $first: Int
  $last: Int
) {
  pendingPosts(input: {first: $first, before: $before, after: $after, last: $last}, filter: {}) {
    edges {
      cursor
      node {
        id
        state
        contributor {
          username
          avatar
        }
        content
        categories {
          title
        }
        characters {
          name
          media {
            title
          }
        }
        mediaRequests
        characterRequests {
          name
          media
        }
        artistUsername
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "before"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "last"
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "filter",
        "value": {}
      },
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "after",
            "variableName": "after"
          },
          {
            "kind": "Variable",
            "name": "before",
            "variableName": "before"
          },
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "first"
          },
          {
            "kind": "Variable",
            "name": "last",
            "variableName": "last"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "PendingPostConnection",
    "kind": "LinkedField",
    "name": "pendingPosts",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PendingPostEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PendingPost",
            "kind": "LinkedField",
            "name": "node",
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
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Contributor",
                "kind": "LinkedField",
                "name": "contributor",
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
                    "name": "avatar",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "content",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Category",
                "kind": "LinkedField",
                "name": "categories",
                "plural": true,
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "characters",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Media",
                    "kind": "LinkedField",
                    "name": "media",
                    "plural": false,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "mediaRequests",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CharacterRequestType",
                "kind": "LinkedField",
                "name": "characterRequests",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "media",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artistUsername",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageInfo",
        "kind": "LinkedField",
        "name": "pageInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startCursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endCursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasNextPage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasPreviousPage",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueuePendingPostsQuery",
    "selections": (v6/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "QueuePendingPostsQuery",
    "selections": (v6/*: any*/)
  },
  "params": {
    "id": "7443eb8018b9947b071f783c15b2706b",
    "metadata": {},
    "name": "QueuePendingPostsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '8832bf2303a8b59d716a3e4f3f9d72b8';
module.exports = node;
