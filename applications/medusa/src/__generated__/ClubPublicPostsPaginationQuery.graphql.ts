/**
 * @generated SignedSource<<418431bd2ac17faccc45115950c297cd>>
 * @relayHash f32cb7c96b5ed0cb211dfa080e8a8694
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f32cb7c96b5ed0cb211dfa080e8a8694

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsSort = "ALGORITHM" | "NEW" | "TOP" | "%future added value";
export type SupporterOnlyStatus = "FULL" | "NONE" | "PARTIAL" | "%future added value";
export type ClubPublicPostsPaginationQuery$variables = {
  after?: string | null;
  categorySlugs?: ReadonlyArray<string> | null;
  characterSlugs?: ReadonlyArray<string> | null;
  first?: number | null;
  id: string;
  seed?: string | null;
  seriesSlugs?: ReadonlyArray<string> | null;
  sortBy: PostsSort;
  supporterOnlyStatus?: ReadonlyArray<SupporterOnlyStatus> | null;
};
export type ClubPublicPostsPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"ScrollPublicClubPostsFragment">;
  } | null;
};
export type ClubPublicPostsPaginationQuery = {
  response: ClubPublicPostsPaginationQuery$data;
  variables: ClubPublicPostsPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categorySlugs"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "characterSlugs"
},
v3 = {
  "defaultValue": 5,
  "kind": "LocalArgument",
  "name": "first"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "seed"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "seriesSlugs"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sortBy"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "supporterOnlyStatus"
},
v9 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v10 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v11 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v14 = [
  (v10/*: any*/),
  {
    "kind": "Variable",
    "name": "categorySlugs",
    "variableName": "categorySlugs"
  },
  {
    "kind": "Variable",
    "name": "characterSlugs",
    "variableName": "characterSlugs"
  },
  (v11/*: any*/),
  {
    "kind": "Variable",
    "name": "seed",
    "variableName": "seed"
  },
  {
    "kind": "Variable",
    "name": "seriesSlugs",
    "variableName": "seriesSlugs"
  },
  {
    "kind": "Variable",
    "name": "sortBy",
    "variableName": "sortBy"
  },
  {
    "kind": "Variable",
    "name": "supporterOnlyStatus",
    "variableName": "supporterOnlyStatus"
  }
],
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "ColorPalette",
  "kind": "LinkedField",
  "name": "colorPalettes",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "red",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "green",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "blue",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v19 = [
  (v16/*: any*/),
  (v17/*: any*/),
  (v18/*: any*/)
],
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "small",
  "plural": false,
  "selections": (v19/*: any*/),
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v19/*: any*/),
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "thumbnailHd",
  "plural": false,
  "selections": (v19/*: any*/),
  "storageKey": null
},
v23 = [
  (v16/*: any*/)
],
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v25 = [
  (v12/*: any*/),
  (v13/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubPublicPostsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v9/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ScrollPublicClubPostsFragment"
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "ClubPublicPostsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v9/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v12/*: any*/),
          (v13/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v14/*: any*/),
                "concreteType": "PostConnection",
                "kind": "LinkedField",
                "name": "posts",
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
                          (v13/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PostContent",
                            "kind": "LinkedField",
                            "name": "content",
                            "plural": true,
                            "selections": [
                              (v12/*: any*/),
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "media",
                                "plural": false,
                                "selections": [
                                  (v12/*: any*/),
                                  {
                                    "kind": "TypeDiscriminator",
                                    "abstractKey": "__isMedia"
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v15/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "ImageMediaVariants",
                                        "kind": "LinkedField",
                                        "name": "variants",
                                        "plural": false,
                                        "selections": [
                                          (v20/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "ImageMediaAccess",
                                            "kind": "LinkedField",
                                            "name": "medium",
                                            "plural": false,
                                            "selections": (v19/*: any*/),
                                            "storageKey": null
                                          },
                                          (v21/*: any*/),
                                          (v22/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v13/*: any*/)
                                    ],
                                    "type": "ImageMedia",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "ImageMedia",
                                        "kind": "LinkedField",
                                        "name": "cover",
                                        "plural": false,
                                        "selections": [
                                          (v15/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "ImageMediaVariants",
                                            "kind": "LinkedField",
                                            "name": "variants",
                                            "plural": false,
                                            "selections": [
                                              (v21/*: any*/),
                                              (v20/*: any*/),
                                              (v22/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v13/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "AspectRatio",
                                        "kind": "LinkedField",
                                        "name": "aspectRatio",
                                        "plural": false,
                                        "selections": [
                                          (v18/*: any*/),
                                          (v17/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "duration",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "hasAudio",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": null,
                                        "kind": "LinkedField",
                                        "name": "containers",
                                        "plural": true,
                                        "selections": [
                                          (v12/*: any*/),
                                          {
                                            "kind": "InlineFragment",
                                            "selections": (v23/*: any*/),
                                            "type": "HLSVideoContainer",
                                            "abstractKey": null
                                          },
                                          {
                                            "kind": "InlineFragment",
                                            "selections": (v23/*: any*/),
                                            "type": "MP4VideoContainer",
                                            "abstractKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v13/*: any*/)
                                    ],
                                    "type": "VideoMedia",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v13/*: any*/)
                                    ],
                                    "type": "RawMedia",
                                    "abstractKey": null
                                  }
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
                              }
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
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "viewerIsOwner",
                                "storageKey": null
                              },
                              (v24/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Resource",
                                "kind": "LinkedField",
                                "name": "thumbnail",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "preview",
                                    "storageKey": null
                                  },
                                  (v13/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ResourceUrl",
                                    "kind": "LinkedField",
                                    "name": "urls",
                                    "plural": true,
                                    "selections": [
                                      (v16/*: any*/),
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
                                  (v17/*: any*/),
                                  (v18/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ResourceUrl",
                                    "kind": "LinkedField",
                                    "name": "videoThumbnail",
                                    "plural": false,
                                    "selections": (v23/*: any*/),
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "type",
                                    "storageKey": null
                                  }
                                ],
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
                                  (v13/*: any*/)
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
                            "kind": "ScalarField",
                            "name": "state",
                            "storageKey": null
                          },
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
                            "concreteType": "PostReport",
                            "kind": "LinkedField",
                            "name": "viewerReport",
                            "plural": false,
                            "selections": (v25/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PostLike",
                            "kind": "LinkedField",
                            "name": "viewerLiked",
                            "plural": false,
                            "selections": (v25/*: any*/),
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
                              (v24/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Club",
                                "kind": "LinkedField",
                                "name": "club",
                                "plural": false,
                                "selections": (v25/*: any*/),
                                "storageKey": null
                              },
                              (v13/*: any*/)
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "title",
                                "storageKey": null
                              },
                              (v13/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "description",
                            "storageKey": null
                          },
                          (v12/*: any*/)
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
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v14/*: any*/),
                "filters": [
                  "sortBy",
                  "categorySlugs",
                  "seriesSlugs",
                  "characterSlugs",
                  "supporterOnlyStatus",
                  "seed"
                ],
                "handle": "connection",
                "key": "ClubPublicPosts_posts",
                "kind": "LinkedHandle",
                "name": "posts"
              }
            ],
            "type": "Club",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "f32cb7c96b5ed0cb211dfa080e8a8694",
    "metadata": {},
    "name": "ClubPublicPostsPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "c040f6ab0e7437e70787bccf04978b07";

export default node;
