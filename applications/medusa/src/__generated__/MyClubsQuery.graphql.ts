/**
 * @generated SignedSource<<9f22610fb5d44f8812719fd466e94ce5>>
 * @relayHash 3a96ded0a1eabb0072eac94df77b3362
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3a96ded0a1eabb0072eac94df77b3362

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyClubsQuery$variables = {};
export type MyClubsQueryVariables = MyClubsQuery$variables;
export type MyClubsQuery$data = {
  readonly viewer: {
    readonly clubMembershipsCount: number;
    readonly " $fragmentSpreads": FragmentRefs<"ClubPostsFeedFragment" | "ClubPostsFeedViewerFragment">;
  } | null;
};
export type MyClubsQueryResponse = MyClubsQuery$data;
export type MyClubsQuery = {
  variables: MyClubsQueryVariables;
  response: MyClubsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clubMembershipsCount",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "urls",
  "plural": true,
  "selections": [
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mimeType",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceUrl",
      "kind": "LinkedField",
      "name": "videoThumbnail",
      "plural": false,
      "selections": [
        (v5/*: any*/)
      ],
      "storageKey": null
    },
    (v4/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyClubsQuery",
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
            "name": "ClubPostsFeedFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClubPostsFeedViewerFragment"
          },
          (v0/*: any*/)
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
    "name": "MyClubsQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "clubMembersPostsFeed",
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
                  (v2/*: any*/),
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
                    "concreteType": "Post",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "reference",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PostContent",
                        "kind": "LinkedField",
                        "name": "content",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Resource",
                            "kind": "LinkedField",
                            "name": "resource",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              (v6/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "viewerCanViewSupporterOnlyContent",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isSupporterOnly",
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Club",
                        "kind": "LinkedField",
                        "name": "club",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          (v3/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ClubMember",
                            "kind": "LinkedField",
                            "name": "viewerMember",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isSupporter",
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Category",
                        "kind": "LinkedField",
                        "name": "categories",
                        "plural": true,
                        "selections": [
                          (v7/*: any*/),
                          (v10/*: any*/),
                          (v9/*: any*/),
                          (v3/*: any*/)
                        ],
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Series",
                            "kind": "LinkedField",
                            "name": "series",
                            "plural": false,
                            "selections": [
                              (v10/*: any*/),
                              (v7/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v8/*: any*/),
                          (v7/*: any*/),
                          (v9/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PostLike",
                        "kind": "LinkedField",
                        "name": "viewerLiked",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "likes",
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
            "storageKey": "clubMembersPostsFeed(first:10)"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "ClubPostsFeed_clubMembersPostsFeed",
            "kind": "LinkedHandle",
            "name": "clubMembersPostsFeed"
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clubMembershipsLimit",
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "3a96ded0a1eabb0072eac94df77b3362",
    "metadata": {},
    "name": "MyClubsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "60f69cfc9840dcaf6cce7aa1b570b535";

export default node;
