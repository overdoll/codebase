/**
 * @generated SignedSource<<2c81a47efa03a39ea90fb27dac921970>>
 * @relayHash 8c61dcdc9dd70430b6bf42b4779f3810
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 8c61dcdc9dd70430b6bf42b4779f3810

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
export type ResultCreatePostQuery$variables = {
  reference: string;
  slug: string;
};
export type ResultCreatePostQuery$data = {
  readonly club: {
    readonly __typename: "Club";
    readonly suspension: {
      readonly __typename: "ClubSuspension";
    } | null;
    readonly termination: {
      readonly __typename: "ClubTermination";
    } | null;
    readonly viewerIsOwner: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"MetaCreatePostClubFragment" | "RestrictedClubCreatePostFragment">;
  } | null;
  readonly post: {
    readonly state: PostState;
    readonly " $fragmentSpreads": FragmentRefs<"MetaCreatePostFragment">;
  } | null;
  readonly viewer: {
    readonly isStaff: boolean;
    readonly isWorker: boolean;
  } | null;
};
export type ResultCreatePostQuery = {
  response: ResultCreatePostQuery$data;
  variables: ResultCreatePostQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
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
  "name": "state",
  "storageKey": null
},
v3 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = [
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "ClubTermination",
  "kind": "LinkedField",
  "name": "termination",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerIsOwner",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isStaff",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isWorker",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v13 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isMedia"
},
v14 = {
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
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v18 = [
  (v15/*: any*/),
  (v16/*: any*/),
  (v17/*: any*/)
],
v19 = [
  (v14/*: any*/),
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
        "selections": (v18/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "mini",
        "plural": false,
        "selections": (v18/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v10/*: any*/)
],
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v21 = [
  (v10/*: any*/),
  (v20/*: any*/)
],
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "small",
  "plural": false,
  "selections": (v18/*: any*/),
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "medium",
  "plural": false,
  "selections": (v18/*: any*/),
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v18/*: any*/),
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "banner",
  "plural": false,
  "selections": (v18/*: any*/),
  "storageKey": null
},
v27 = {
  "kind": "InlineFragment",
  "selections": [
    (v10/*: any*/),
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
        (v2/*: any*/),
        (v10/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "originalFileName",
      "storageKey": null
    }
  ],
  "type": "RawMedia",
  "abstractKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "duration",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasAudio",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSupporterOnly",
  "storageKey": null
},
v31 = {
  "kind": "Literal",
  "name": "state",
  "value": "DRAFT"
},
v32 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  },
  (v31/*: any*/)
],
v33 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaVariants",
  "kind": "LinkedField",
  "name": "variants",
  "plural": false,
  "selections": [
    (v26/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ResultCreatePostQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "MetaCreatePostFragment"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubSuspension",
            "kind": "LinkedField",
            "name": "suspension",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RestrictedClubCreatePostFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MetaCreatePostClubFragment"
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
          (v8/*: any*/),
          (v9/*: any*/)
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
    "name": "ResultCreatePostQuery",
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
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Club",
            "kind": "LinkedField",
            "name": "club",
            "plural": false,
            "selections": [
              (v12/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "canCreateSupporterOnlyPosts",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "thumbnailMedia",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v13/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": (v19/*: any*/),
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
                        "selections": (v19/*: any*/),
                        "storageKey": null
                      },
                      (v10/*: any*/)
                    ],
                    "type": "VideoMedia",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v10/*: any*/)
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
            "concreteType": "Audience",
            "kind": "LinkedField",
            "name": "audience",
            "plural": false,
            "selections": (v21/*: any*/),
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
              (v10/*: any*/),
              (v22/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Series",
                "kind": "LinkedField",
                "name": "series",
                "plural": false,
                "selections": [
                  (v20/*: any*/),
                  (v10/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CharacterRequest",
            "kind": "LinkedField",
            "name": "characterRequests",
            "plural": true,
            "selections": [
              (v10/*: any*/),
              (v22/*: any*/)
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
            "selections": (v21/*: any*/),
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
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "media",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v10/*: any*/),
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ImageMediaVariants",
                        "kind": "LinkedField",
                        "name": "variants",
                        "plural": false,
                        "selections": [
                          (v23/*: any*/),
                          (v24/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ImageMediaAccess",
                            "kind": "LinkedField",
                            "name": "large",
                            "plural": false,
                            "selections": (v18/*: any*/),
                            "storageKey": null
                          },
                          (v25/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ImageMediaAccess",
                            "kind": "LinkedField",
                            "name": "hd",
                            "plural": false,
                            "selections": (v18/*: any*/),
                            "storageKey": null
                          },
                          (v26/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "ImageMedia",
                    "abstractKey": null
                  },
                  (v27/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ImageMedia",
                        "kind": "LinkedField",
                        "name": "cover",
                        "plural": false,
                        "selections": [
                          (v14/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ImageMediaVariants",
                            "kind": "LinkedField",
                            "name": "variants",
                            "plural": false,
                            "selections": [
                              (v25/*: any*/),
                              (v24/*: any*/),
                              (v23/*: any*/),
                              (v26/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v10/*: any*/)
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
                          (v17/*: any*/),
                          (v16/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v28/*: any*/),
                      (v29/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "containers",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
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
                              (v15/*: any*/)
                            ],
                            "type": "HLSVideoContainer",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v15/*: any*/)
                            ],
                            "type": "MP4VideoContainer",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "VideoMedia",
                    "abstractKey": null
                  },
                  (v13/*: any*/)
                ],
                "storageKey": null
              },
              (v30/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubSuspension",
            "kind": "LinkedField",
            "name": "suspension",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
          (v6/*: any*/),
          (v7/*: any*/),
          (v10/*: any*/),
          (v12/*: any*/),
          {
            "alias": "draftPosts",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              (v31/*: any*/)
            ],
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
                      (v4/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "posts(first:1,state:\"DRAFT\")"
          },
          {
            "alias": null,
            "args": (v32/*: any*/),
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
                      (v10/*: any*/),
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PostContent",
                        "kind": "LinkedField",
                        "name": "content",
                        "plural": true,
                        "selections": [
                          (v30/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "media",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
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
                                      (v14/*: any*/),
                                      (v33/*: any*/),
                                      (v10/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v29/*: any*/),
                                  (v28/*: any*/),
                                  (v10/*: any*/)
                                ],
                                "type": "VideoMedia",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v10/*: any*/),
                                  (v14/*: any*/),
                                  (v33/*: any*/)
                                ],
                                "type": "ImageMedia",
                                "abstractKey": null
                              },
                              (v27/*: any*/),
                              (v13/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v10/*: any*/)
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
                          (v22/*: any*/),
                          (v10/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Club",
                        "kind": "LinkedField",
                        "name": "club",
                        "plural": false,
                        "selections": [
                          (v12/*: any*/),
                          (v10/*: any*/)
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
              }
            ],
            "storageKey": "posts(first:5,state:\"DRAFT\")"
          },
          {
            "alias": null,
            "args": (v32/*: any*/),
            "filters": [
              "state"
            ],
            "handle": "connection",
            "key": "ClubPosts_posts",
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
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "8c61dcdc9dd70430b6bf42b4779f3810",
    "metadata": {},
    "name": "ResultCreatePostQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "32ca4b8feb98ce346a6a9a93c8044be3";

export default node;
