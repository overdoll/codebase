/**
 * @generated SignedSource<<10c8cce3194f89a5fff35aaf31dd3ca3>>
 * @relayHash 8b1db376c9ed56ee456dd30a930dc082
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 8b1db376c9ed56ee456dd30a930dc082

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ResultPublicPostQuery$variables = {
  reference: string;
};
export type ResultPublicPostQuery$data = {
  readonly post: {
    readonly " $fragmentSpreads": FragmentRefs<"MetaPublicPostFragment">;
  } | null;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"MetaPublicPostViewerFragment">;
  } | null;
};
export type ResultPublicPostQuery = {
  response: ResultPublicPostQuery$data;
  variables: ResultPublicPostQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expires",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v9 = [
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "preview",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "urls",
  "plural": true,
  "selections": [
    (v8/*: any*/),
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
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "videoThumbnail",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v16 = [
  (v10/*: any*/),
  (v4/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/),
  (v13/*: any*/),
  (v14/*: any*/),
  (v15/*: any*/)
],
v17 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isMedia"
},
v18 = {
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
v19 = [
  (v8/*: any*/),
  (v12/*: any*/),
  (v13/*: any*/)
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
  "name": "medium",
  "plural": false,
  "selections": (v19/*: any*/),
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v19/*: any*/),
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMedia",
  "kind": "LinkedField",
  "name": "cover",
  "plural": false,
  "selections": [
    (v18/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ImageMediaVariants",
      "kind": "LinkedField",
      "name": "variants",
      "plural": false,
      "selections": [
        (v22/*: any*/),
        (v20/*: any*/)
      ],
      "storageKey": null
    },
    (v4/*: any*/)
  ],
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "duration",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasAudio",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "containers",
  "plural": true,
  "selections": [
    (v7/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v9/*: any*/),
      "type": "HLSVideoContainer",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v9/*: any*/),
      "type": "MP4VideoContainer",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v27 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/)
  ],
  "type": "RawMedia",
  "abstractKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerCanViewSupporterOnlyContent",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSupporterOnly",
  "storageKey": null
},
v30 = [
  (v7/*: any*/),
  (v4/*: any*/)
],
v31 = {
  "alias": null,
  "args": null,
  "concreteType": "PostLike",
  "kind": "LinkedField",
  "name": "viewerLiked",
  "plural": false,
  "selections": (v30/*: any*/),
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v33 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v34 = [
  (v18/*: any*/),
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
        "selections": (v19/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "mini",
        "plural": false,
        "selections": (v19/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ResultPublicPostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MetaPublicPostFragment"
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
            "name": "MetaPublicPostViewerFragment"
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
    "name": "ResultPublicPostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Club",
            "kind": "LinkedField",
            "name": "club",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubSuspension",
                "kind": "LinkedField",
                "name": "suspension",
                "plural": false,
                "selections": [
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubTermination",
                "kind": "LinkedField",
                "name": "termination",
                "plural": false,
                "selections": [
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubLink",
                "kind": "LinkedField",
                "name": "links",
                "plural": true,
                "selections": (v9/*: any*/),
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
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": (v16/*: any*/),
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
                  (v4/*: any*/)
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
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "characters",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "banner",
                "plural": false,
                "selections": (v16/*: any*/),
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Series",
                "kind": "LinkedField",
                "name": "series",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/)
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
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
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v15/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "videoDuration",
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "media",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v17/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v18/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ImageMediaVariants",
                        "kind": "LinkedField",
                        "name": "variants",
                        "plural": false,
                        "selections": [
                          (v20/*: any*/),
                          (v21/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ImageMediaAccess",
                            "kind": "LinkedField",
                            "name": "large",
                            "plural": false,
                            "selections": (v19/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ImageMediaAccess",
                            "kind": "LinkedField",
                            "name": "hd",
                            "plural": false,
                            "selections": (v19/*: any*/),
                            "storageKey": null
                          },
                          (v22/*: any*/)
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
                      (v23/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AspectRatio",
                        "kind": "LinkedField",
                        "name": "aspectRatio",
                        "plural": false,
                        "selections": [
                          (v13/*: any*/),
                          (v12/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v24/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v4/*: any*/)
                    ],
                    "type": "VideoMedia",
                    "abstractKey": null
                  },
                  (v27/*: any*/)
                ],
                "storageKey": null
              },
              (v28/*: any*/),
              (v29/*: any*/)
            ],
            "storageKey": null
          },
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
              (v4/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": [
                  (v10/*: any*/),
                  (v4/*: any*/)
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
            "name": "state",
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PostReport",
            "kind": "LinkedField",
            "name": "viewerReport",
            "plural": false,
            "selections": (v30/*: any*/),
            "storageKey": null
          },
          (v31/*: any*/),
          (v32/*: any*/),
          {
            "alias": null,
            "args": (v33/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "suggestedPosts",
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Club",
                        "kind": "LinkedField",
                        "name": "club",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "thumbnailMedia",
                            "plural": false,
                            "selections": [
                              (v7/*: any*/),
                              (v17/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v34/*: any*/),
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
                                    "selections": (v34/*: any*/),
                                    "storageKey": null
                                  },
                                  (v4/*: any*/)
                                ],
                                "type": "VideoMedia",
                                "abstractKey": null
                              },
                              (v27/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v32/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PostContent",
                        "kind": "LinkedField",
                        "name": "content",
                        "plural": true,
                        "selections": [
                          (v7/*: any*/),
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "media",
                            "plural": false,
                            "selections": [
                              (v7/*: any*/),
                              (v17/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v18/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ImageMediaVariants",
                                    "kind": "LinkedField",
                                    "name": "variants",
                                    "plural": false,
                                    "selections": [
                                      (v20/*: any*/),
                                      (v21/*: any*/),
                                      (v22/*: any*/)
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
                                  (v23/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "AspectRatio",
                                    "kind": "LinkedField",
                                    "name": "aspectRatio",
                                    "plural": false,
                                    "selections": [
                                      (v12/*: any*/),
                                      (v13/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v24/*: any*/),
                                  (v25/*: any*/),
                                  (v26/*: any*/),
                                  (v4/*: any*/)
                                ],
                                "type": "VideoMedia",
                                "abstractKey": null
                              },
                              (v27/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v28/*: any*/),
                          (v29/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v31/*: any*/),
                      (v7/*: any*/)
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
            "storageKey": "suggestedPosts(first:5)"
          },
          {
            "alias": null,
            "args": (v33/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "SuggestedPosts_suggestedPosts",
            "kind": "LinkedHandle",
            "name": "suggestedPosts"
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
              (v7/*: any*/),
              (v6/*: any*/)
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
              (v7/*: any*/),
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
          (v4/*: any*/),
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
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "8b1db376c9ed56ee456dd30a930dc082",
    "metadata": {},
    "name": "ResultPublicPostQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "42a9026f6d95ed801e5fa316058441ea";

export default node;
