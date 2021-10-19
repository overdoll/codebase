/**
 * @flow
 * @relayHash ded8b390ff42221eed982c82395652a6
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { ViewerDraftPostsFragment$ref } from "./ViewerDraftPostsFragment.graphql";
export type ViewerDraftPostsQueryVariables = {||};
export type ViewerDraftPostsQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: ViewerDraftPostsFragment$ref
  |}
|};
export type ViewerDraftPostsQuery = {|
  variables: ViewerDraftPostsQueryVariables,
  response: ViewerDraftPostsQueryResponse,
|};


/*
query ViewerDraftPostsQuery {
  viewer {
    ...ViewerDraftPostsFragment
    id
  }
}

fragment ViewerDraftPostsFragment on Account {
  contributions(first: 4) {
    edges {
      node {
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  }
],
v1 = {
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
    "name": "ViewerDraftPostsQuery",
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
            "name": "ViewerDraftPostsFragment"
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
    "name": "ViewerDraftPostsQuery",
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
            "name": "contributions",
            "plural": false,
            "selections": [
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "contributions(first:4)"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "contributions_contributions",
            "kind": "LinkedHandle",
            "name": "contributions"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "ded8b390ff42221eed982c82395652a6",
    "metadata": {},
    "name": "ViewerDraftPostsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'f5d5982984effacd6e449f19fcbfb060';
module.exports = node;
