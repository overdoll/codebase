/**
 * @generated SignedSource<<4ee3552129ce9783d9b9e076ec89e392>>
 * @relayHash 8a9ed950651fe0f72b170e9d2cdb68b0
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 8a9ed950651fe0f72b170e9d2cdb68b0

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubsFeedQuery$variables = {};
export type ClubsFeedQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"AccountInformationBannerFragment" | "ClubPostsFeedFragment" | "ClubPostsFeedViewerFragment">;
  } | null;
};
export type ClubsFeedQuery = {
  response: ClubsFeedQuery$data;
  variables: ClubsFeedQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "preview",
  "storageKey": null
},
v8 = [
  (v4/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "videoThumbnail",
  "plural": false,
  "selections": (v8/*: any*/),
  "storageKey": null
},
v10 = [
  (v1/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubsFeedQuery",
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AccountInformationBannerFragment"
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
    "name": "ClubsFeedQuery",
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
                  (v1/*: any*/),
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
                      (v1/*: any*/),
                      (v2/*: any*/),
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
                              (v3/*: any*/),
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ResourceUrl",
                                "kind": "LinkedField",
                                "name": "urls",
                                "plural": true,
                                "selections": [
                                  (v4/*: any*/),
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
                              (v5/*: any*/),
                              (v6/*: any*/),
                              (v7/*: any*/),
                              (v9/*: any*/)
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
                          (v2/*: any*/)
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Resource",
                            "kind": "LinkedField",
                            "name": "thumbnail",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ResourceUrl",
                                "kind": "LinkedField",
                                "name": "urls",
                                "plural": true,
                                "selections": (v8/*: any*/),
                                "storageKey": null
                              },
                              (v5/*: any*/),
                              (v6/*: any*/),
                              (v7/*: any*/),
                              (v9/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "viewerIsOwner",
                            "storageKey": null
                          },
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
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "canSupport",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PostReport",
                        "kind": "LinkedField",
                        "name": "viewerReport",
                        "plural": false,
                        "selections": (v10/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PostLike",
                        "kind": "LinkedField",
                        "name": "viewerLiked",
                        "plural": false,
                        "selections": (v10/*: any*/),
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
            "args": (v0/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "ClubPostsFeed_clubMembersPostsFeed",
            "kind": "LinkedHandle",
            "name": "clubMembersPostsFeed"
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clubMembershipsLimit",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clubMembershipsCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expires",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountDeleting",
            "kind": "LinkedField",
            "name": "deleting",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "scheduledDeletion",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "8a9ed950651fe0f72b170e9d2cdb68b0",
    "metadata": {},
    "name": "ClubsFeedQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "b5ebe556407db342e5665aa9cc58ac60";

export default node;
