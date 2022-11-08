/**
 * @generated SignedSource<<1b15bbc59144514aa6d3557588497557>>
 * @relayHash d51ea245ae8b7cdc12d2d2644777e07c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d51ea245ae8b7cdc12d2d2644777e07c

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsSort = "ALGORITHM" | "NEW" | "TOP" | "%future added value";
export type SupporterOnlyStatus = "FULL" | "NONE" | "PARTIAL" | "%future added value";
export type ClubPublicPostsPaginationQuery$variables = {
  after?: string | null;
  categorySlugs?: ReadonlyArray<string> | null;
  characterSlugs?: ReadonlyArray<string> | null;
  clubCharacterSlugs?: ReadonlyArray<string> | null;
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
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "clubCharacterSlugs"
},
v4 = {
  "defaultValue": 6,
  "kind": "LocalArgument",
  "name": "first"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "seed"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "seriesSlugs"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sortBy"
},
v9 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "supporterOnlyStatus"
},
v10 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v11 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v12 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v15 = [
  (v11/*: any*/),
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
  {
    "kind": "Variable",
    "name": "clubCharacterSlugs",
    "variableName": "clubCharacterSlugs"
  },
  (v12/*: any*/),
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
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v18 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isMedia"
},
v19 = {
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
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v23 = [
  (v20/*: any*/),
  (v21/*: any*/),
  (v22/*: any*/)
],
v24 = [
  (v19/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "ImageMediaVariants",
    "kind": "LinkedField",
    "name": "variants",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "icon",
        "plural": false,
        "selections": (v23/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "mini",
        "plural": false,
        "selections": (v23/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v14/*: any*/)
],
v25 = [
  (v14/*: any*/)
],
v26 = {
  "kind": "InlineFragment",
  "selections": (v25/*: any*/),
  "type": "RawMedia",
  "abstractKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "small",
  "plural": false,
  "selections": (v23/*: any*/),
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "medium",
  "plural": false,
  "selections": (v23/*: any*/),
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v23/*: any*/),
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "banner",
  "plural": false,
  "selections": (v23/*: any*/),
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "smallBanner",
  "plural": false,
  "selections": (v23/*: any*/),
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v33 = {
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
},
v34 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 12
  }
],
v35 = [
  (v14/*: any*/),
  (v16/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  }
],
v36 = [
  (v16/*: any*/),
  (v14/*: any*/)
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
      (v8/*: any*/),
      (v9/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubPublicPostsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v10/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              (v11/*: any*/),
              (v12/*: any*/)
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
      (v4/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      (v9/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Operation",
    "name": "ClubPublicPostsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v10/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v13/*: any*/),
          (v14/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v15/*: any*/),
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
                          (v14/*: any*/),
                          (v13/*: any*/),
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
                            "concreteType": "Club",
                            "kind": "LinkedField",
                            "name": "club",
                            "plural": false,
                            "selections": [
                              (v16/*: any*/),
                              (v14/*: any*/),
                              (v17/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "thumbnailMedia",
                                "plural": false,
                                "selections": [
                                  (v13/*: any*/),
                                  (v18/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v24/*: any*/),
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
                                        "selections": (v24/*: any*/),
                                        "storageKey": null
                                      },
                                      (v14/*: any*/)
                                    ],
                                    "type": "VideoMedia",
                                    "abstractKey": null
                                  },
                                  (v26/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "canSupport",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "viewerIsOwner",
                                "storageKey": null
                              }
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PostContent",
                            "kind": "LinkedField",
                            "name": "content",
                            "plural": true,
                            "selections": [
                              (v13/*: any*/),
                              (v14/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "media",
                                "plural": false,
                                "selections": [
                                  (v13/*: any*/),
                                  (v18/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v19/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "ImageMediaVariants",
                                        "kind": "LinkedField",
                                        "name": "variants",
                                        "plural": false,
                                        "selections": [
                                          (v27/*: any*/),
                                          (v28/*: any*/),
                                          (v29/*: any*/),
                                          (v30/*: any*/),
                                          (v31/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v14/*: any*/)
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
                                          (v19/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "ImageMediaVariants",
                                            "kind": "LinkedField",
                                            "name": "variants",
                                            "plural": false,
                                            "selections": [
                                              (v29/*: any*/),
                                              (v28/*: any*/),
                                              (v27/*: any*/),
                                              (v30/*: any*/),
                                              (v31/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v14/*: any*/)
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
                                          (v21/*: any*/),
                                          (v22/*: any*/)
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
                                          (v13/*: any*/),
                                          {
                                            "kind": "InlineFragment",
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "targetDevice",
                                                "storageKey": null
                                              },
                                              (v20/*: any*/)
                                            ],
                                            "type": "HLSVideoContainer",
                                            "abstractKey": null
                                          },
                                          {
                                            "kind": "InlineFragment",
                                            "selections": [
                                              (v20/*: any*/)
                                            ],
                                            "type": "MP4VideoContainer",
                                            "abstractKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v14/*: any*/)
                                    ],
                                    "type": "VideoMedia",
                                    "abstractKey": null
                                  },
                                  (v26/*: any*/)
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "supporterOnlyVideoMediaDuration",
                                "storageKey": null
                              }
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
                              (v13/*: any*/),
                              (v14/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "state",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v32/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ClientExtension",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__id",
                        "storageKey": null
                      }
                    ]
                  },
                  (v33/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v15/*: any*/),
                "filters": [
                  "sortBy",
                  "categorySlugs",
                  "seriesSlugs",
                  "characterSlugs",
                  "supporterOnlyStatus",
                  "clubCharacterSlugs",
                  "seed"
                ],
                "handle": "connection",
                "key": "ClubPublicPosts_posts",
                "kind": "LinkedHandle",
                "name": "posts"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "postsView",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v34/*: any*/),
                "concreteType": "TagConnection",
                "kind": "LinkedField",
                "name": "tags",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TagEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v13/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v35/*: any*/),
                            "type": "Category",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v14/*: any*/),
                              (v16/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Series",
                                "kind": "LinkedField",
                                "name": "series",
                                "plural": false,
                                "selections": (v36/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Club",
                                "kind": "LinkedField",
                                "name": "club",
                                "plural": false,
                                "selections": (v36/*: any*/),
                                "storageKey": null
                              },
                              (v17/*: any*/)
                            ],
                            "type": "Character",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v35/*: any*/),
                            "type": "Series",
                            "abstractKey": null
                          },
                          {
                            "kind": "TypeDiscriminator",
                            "abstractKey": "__isSearch"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v25/*: any*/),
                            "type": "Node",
                            "abstractKey": "__isNode"
                          }
                        ],
                        "storageKey": null
                      },
                      (v32/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v33/*: any*/)
                ],
                "storageKey": "tags(first:12)"
              },
              {
                "alias": null,
                "args": (v34/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "ClubPublicPosts_tags",
                "kind": "LinkedHandle",
                "name": "tags"
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
    "id": "d51ea245ae8b7cdc12d2d2644777e07c",
    "metadata": {},
    "name": "ClubPublicPostsPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "2e682762967b6b196aecb367b9966bb3";

export default node;
