/**
 * @generated SignedSource<<b3c01b7aa6ef25c7a4d1dc0461915297>>
 * @relayHash f0dd7209899351035a73ce04b9e808c8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f0dd7209899351035a73ce04b9e808c8

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsSort = "ALGORITHM" | "NEW" | "TOP" | "%future added value";
export type SupporterOnlyStatus = "FULL" | "NONE" | "PARTIAL" | "%future added value";
export type ResultPublicClubPostsQuery$variables = {
  categorySlugs?: ReadonlyArray<string> | null;
  characterSlugs?: ReadonlyArray<string> | null;
  seed?: string | null;
  seriesSlugs?: ReadonlyArray<string> | null;
  slug: string;
  sortBy: PostsSort;
  supporterOnlyStatus?: ReadonlyArray<SupporterOnlyStatus> | null;
};
export type ResultPublicClubPostsQuery$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"MetaPublicClubPostsFragment">;
  } | null;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"MetaPublicClubPostsViewerFragment">;
  } | null;
};
export type ResultPublicClubPostsQuery = {
  response: ResultPublicClubPostsQuery$data;
  variables: ResultPublicClubPostsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categorySlugs"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "characterSlugs"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "seed"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "seriesSlugs"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "slug"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sortBy"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "supporterOnlyStatus"
},
v7 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v15 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isMedia"
},
v16 = {
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
v17 = [
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/)
],
v18 = [
  (v16/*: any*/),
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
        "selections": (v17/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "mini",
        "plural": false,
        "selections": (v17/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v13/*: any*/)
],
v19 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/)
  ],
  "type": "RawMedia",
  "abstractKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "thumbnailMedia",
  "plural": false,
  "selections": [
    (v14/*: any*/),
    (v15/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v18/*: any*/),
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
          "selections": (v18/*: any*/),
          "storageKey": null
        },
        (v13/*: any*/)
      ],
      "type": "VideoMedia",
      "abstractKey": null
    },
    (v19/*: any*/)
  ],
  "storageKey": null
},
v21 = [
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
    "kind": "Literal",
    "name": "first",
    "value": 5
  },
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
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "small",
  "plural": false,
  "selections": (v17/*: any*/),
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v17/*: any*/),
  "storageKey": null
},
v24 = [
  (v10/*: any*/)
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
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ResultPublicClubPostsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MetaPublicClubPostsFragment"
          }
        ],
        "storageKey": null
      },
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
            "name": "MetaPublicClubPostsViewerFragment"
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
      (v4/*: any*/),
      (v5/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v6/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ResultPublicClubPostsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "banner",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceUrl",
                "kind": "LinkedField",
                "name": "urls",
                "plural": true,
                "selections": [
                  (v10/*: any*/),
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
              (v11/*: any*/),
              (v12/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              (v13/*: any*/)
            ],
            "storageKey": null
          },
          (v13/*: any*/),
          (v20/*: any*/),
          {
            "alias": null,
            "args": (v21/*: any*/),
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
                          (v8/*: any*/),
                          (v13/*: any*/),
                          (v9/*: any*/),
                          (v20/*: any*/)
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
                      (v13/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PostContent",
                        "kind": "LinkedField",
                        "name": "content",
                        "plural": true,
                        "selections": [
                          (v14/*: any*/),
                          (v13/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "media",
                            "plural": false,
                            "selections": [
                              (v14/*: any*/),
                              (v15/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v16/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ImageMediaVariants",
                                    "kind": "LinkedField",
                                    "name": "variants",
                                    "plural": false,
                                    "selections": [
                                      (v22/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "ImageMediaAccess",
                                        "kind": "LinkedField",
                                        "name": "medium",
                                        "plural": false,
                                        "selections": (v17/*: any*/),
                                        "storageKey": null
                                      },
                                      (v23/*: any*/)
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
                                      (v16/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "ImageMediaVariants",
                                        "kind": "LinkedField",
                                        "name": "variants",
                                        "plural": false,
                                        "selections": [
                                          (v23/*: any*/),
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
                                      (v11/*: any*/),
                                      (v12/*: any*/)
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
                                      (v14/*: any*/),
                                      {
                                        "kind": "InlineFragment",
                                        "selections": (v24/*: any*/),
                                        "type": "HLSVideoContainer",
                                        "abstractKey": null
                                      },
                                      {
                                        "kind": "InlineFragment",
                                        "selections": (v24/*: any*/),
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
                              (v19/*: any*/)
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
                        "concreteType": "PostLike",
                        "kind": "LinkedField",
                        "name": "viewerLiked",
                        "plural": false,
                        "selections": [
                          (v14/*: any*/),
                          (v13/*: any*/)
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
            "args": (v21/*: any*/),
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
        "storageKey": null
      },
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
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              (v14/*: any*/),
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
              (v14/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "scheduledDeletion",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v13/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "f0dd7209899351035a73ce04b9e808c8",
    "metadata": {},
    "name": "ResultPublicClubPostsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "b9778f275512b54855c5cdbe989aa6fa";

export default node;
