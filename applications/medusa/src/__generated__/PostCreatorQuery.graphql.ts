/**
 * @generated SignedSource<<117483774d7dabf31a87d1165d54cc28>>
 * @relayHash 5410dc39f52204d6197c35af81c375f8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5410dc39f52204d6197c35af81c375f8

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostCreatorQuery$variables = {
  reference: string;
  slug: string;
};
export type PostCreatorQuery$data = {
  readonly club: {
    readonly __typename: "Club";
    readonly suspension: {
      readonly __typename: "ClubSuspension";
    } | null;
    readonly termination: {
      readonly __typename: "ClubTermination";
    } | null;
    readonly viewerIsOwner: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"ClubRestrictedFragment" | "PostStateClubFragment">;
  } | null;
  readonly post: {
    readonly __typename: "Post";
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"PostStateFragment">;
  } | null;
  readonly viewer: {
    readonly isStaff: boolean;
  } | null;
};
export type PostCreatorQuery = {
  response: PostCreatorQuery$data;
  variables: PostCreatorQuery$variables;
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
v4 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v5 = [
  (v2/*: any*/)
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
  "name": "state",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "preview",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "urls",
  "plural": true,
  "selections": [
    (v13/*: any*/),
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
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "videoThumbnail",
  "plural": false,
  "selections": [
    (v13/*: any*/)
  ],
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v19 = [
  (v12/*: any*/),
  (v3/*: any*/),
  (v14/*: any*/),
  (v15/*: any*/),
  (v16/*: any*/),
  (v17/*: any*/),
  (v18/*: any*/)
],
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v21 = [
  (v20/*: any*/),
  (v3/*: any*/)
],
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "Club",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": (v21/*: any*/),
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "processed",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "failed",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoNoAudio",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "progress",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoDuration",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSupporterOnly",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "supporterOnlyResource",
  "plural": false,
  "selections": [
    (v18/*: any*/),
    (v27/*: any*/),
    (v25/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v31 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v32 = {
  "kind": "Literal",
  "name": "state",
  "value": "DRAFT"
},
v33 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  },
  (v32/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PostCreatorQuery",
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
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostStateFragment"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "name": "PostStateClubFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClubRestrictedFragment"
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
          (v8/*: any*/)
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
    "name": "PostCreatorQuery",
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
          (v3/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Audience",
            "kind": "LinkedField",
            "name": "audience",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
              (v3/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "banner",
                "plural": false,
                "selections": (v19/*: any*/),
                "storageKey": null
              },
              (v20/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Series",
                "kind": "LinkedField",
                "name": "series",
                "plural": false,
                "selections": (v21/*: any*/),
                "storageKey": null
              },
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
            "selections": [
              (v3/*: any*/),
              (v10/*: any*/),
              (v20/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": [
                  (v12/*: any*/),
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
                  (v18/*: any*/),
                  (v23/*: any*/),
                  (v24/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v12/*: any*/),
                  (v25/*: any*/),
                  (v17/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceProgress",
                    "kind": "LinkedField",
                    "name": "progress",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v26/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v27/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/),
              (v28/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "viewerCanViewSupporterOnlyContent",
                "storageKey": null
              },
              (v29/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v30/*: any*/),
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
                "name": "canCreateSupporterOnlyPosts",
                "storageKey": null
              },
              (v3/*: any*/),
              (v7/*: any*/),
              (v20/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "canSupport",
                "storageKey": null
              },
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": (v19/*: any*/),
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
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "contributor",
            "plural": false,
            "selections": (v31/*: any*/),
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
        "args": (v4/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubSuspension",
            "kind": "LinkedField",
            "name": "suspension",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
          (v3/*: any*/),
          (v20/*: any*/),
          {
            "alias": "draftPosts",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              (v32/*: any*/)
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
                    "selections": (v31/*: any*/),
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
            "args": (v33/*: any*/),
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
                      (v3/*: any*/),
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PostContent",
                        "kind": "LinkedField",
                        "name": "content",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          (v28/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Resource",
                            "kind": "LinkedField",
                            "name": "resource",
                            "plural": false,
                            "selections": [
                              (v18/*: any*/),
                              (v23/*: any*/),
                              (v27/*: any*/),
                              (v25/*: any*/),
                              (v12/*: any*/),
                              (v24/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ResourceProgress",
                                "kind": "LinkedField",
                                "name": "progress",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
                                  (v26/*: any*/),
                                  (v9/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v3/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              (v17/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v29/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v30/*: any*/),
                      (v22/*: any*/),
                      (v2/*: any*/)
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
            "args": (v33/*: any*/),
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
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "5410dc39f52204d6197c35af81c375f8",
    "metadata": {},
    "name": "PostCreatorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "00f35306c9f7934d261bf647de591649";

export default node;
