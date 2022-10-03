/**
 * @generated SignedSource<<7941d1922e9c9861daf4a59030f9fa64>>
 * @relayHash 78aaf683d3124398207477dd2cc82da0
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 78aaf683d3124398207477dd2cc82da0

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsPaginationQuery$variables = {
  after?: string | null;
  first?: number | null;
  id: string;
};
export type PostsPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"PostModerationQueueFragment">;
  } | null;
};
export type PostsPaginationQuery = {
  response: PostsPaginationQuery$data;
  variables: PostsPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 1,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isMedia"
},
v7 = {
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v11 = [
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/)
],
v12 = [
  (v7/*: any*/),
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
        "selections": (v11/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "mini",
        "plural": false,
        "selections": (v11/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v4/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "small",
  "plural": false,
  "selections": (v11/*: any*/),
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "medium",
  "plural": false,
  "selections": (v11/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v11/*: any*/),
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v17 = [
  (v16/*: any*/),
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PostsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": (v2/*: any*/),
            "kind": "FragmentSpread",
            "name": "PostModerationQueueFragment"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
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
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v2/*: any*/),
                "concreteType": "PostModeratorConnection",
                "kind": "LinkedField",
                "name": "postModeratorQueue",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PostModeratorEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PostModerator",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Post",
                            "kind": "LinkedField",
                            "name": "post",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "postedAt",
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
                                  (v5/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "slug",
                                    "storageKey": null
                                  },
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": null,
                                    "kind": "LinkedField",
                                    "name": "thumbnailMedia",
                                    "plural": false,
                                    "selections": [
                                      (v3/*: any*/),
                                      (v6/*: any*/),
                                      {
                                        "kind": "InlineFragment",
                                        "selections": (v12/*: any*/),
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
                                            "selections": (v12/*: any*/),
                                            "storageKey": null
                                          },
                                          (v4/*: any*/)
                                        ],
                                        "type": "VideoMedia",
                                        "abstractKey": null
                                      },
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          (v4/*: any*/)
                                        ],
                                        "type": "RawMedia",
                                        "abstractKey": null
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
                                  (v3/*: any*/),
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": null,
                                    "kind": "LinkedField",
                                    "name": "media",
                                    "plural": false,
                                    "selections": [
                                      (v3/*: any*/),
                                      (v6/*: any*/),
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "failed",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "MediaProgress",
                                            "kind": "LinkedField",
                                            "name": "progress",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "progress",
                                                "storageKey": null
                                              },
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "state",
                                                "storageKey": null
                                              },
                                              (v4/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "originalFileName",
                                            "storageKey": null
                                          },
                                          (v4/*: any*/)
                                        ],
                                        "type": "RawMedia",
                                        "abstractKey": null
                                      },
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          (v7/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "ImageMediaVariants",
                                            "kind": "LinkedField",
                                            "name": "variants",
                                            "plural": false,
                                            "selections": [
                                              (v13/*: any*/),
                                              (v14/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "ImageMediaAccess",
                                                "kind": "LinkedField",
                                                "name": "large",
                                                "plural": false,
                                                "selections": (v11/*: any*/),
                                                "storageKey": null
                                              },
                                              (v15/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "ImageMediaAccess",
                                                "kind": "LinkedField",
                                                "name": "hd",
                                                "plural": false,
                                                "selections": (v11/*: any*/),
                                                "storageKey": null
                                              }
                                            ],
                                            "storageKey": null
                                          },
                                          (v4/*: any*/)
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
                                              (v7/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "ImageMediaVariants",
                                                "kind": "LinkedField",
                                                "name": "variants",
                                                "plural": false,
                                                "selections": [
                                                  (v15/*: any*/),
                                                  (v14/*: any*/),
                                                  (v13/*: any*/)
                                                ],
                                                "storageKey": null
                                              },
                                              (v4/*: any*/)
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
                                              (v10/*: any*/),
                                              (v9/*: any*/)
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
                                              (v3/*: any*/),
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
                                                  (v8/*: any*/)
                                                ],
                                                "type": "HLSVideoContainer",
                                                "abstractKey": null
                                              },
                                              {
                                                "kind": "InlineFragment",
                                                "selections": [
                                                  (v8/*: any*/)
                                                ],
                                                "type": "MP4VideoContainer",
                                                "abstractKey": null
                                              }
                                            ],
                                            "storageKey": null
                                          },
                                          (v4/*: any*/)
                                        ],
                                        "type": "VideoMedia",
                                        "abstractKey": null
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
                                "concreteType": "Audience",
                                "kind": "LinkedField",
                                "name": "audience",
                                "plural": false,
                                "selections": (v17/*: any*/),
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
                                  (v4/*: any*/),
                                  (v5/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Series",
                                    "kind": "LinkedField",
                                    "name": "series",
                                    "plural": false,
                                    "selections": (v17/*: any*/),
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
                                  (v4/*: any*/),
                                  (v16/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
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
                "args": (v2/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "Posts_postModeratorQueue",
                "kind": "LinkedHandle",
                "name": "postModeratorQueue"
              }
            ],
            "type": "Account",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "78aaf683d3124398207477dd2cc82da0",
    "metadata": {},
    "name": "PostsPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "943b918e39d92c60dedc8bc916749273";

export default node;
