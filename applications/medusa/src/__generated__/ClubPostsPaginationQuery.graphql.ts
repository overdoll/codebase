/**
 * @generated SignedSource<<a492c57a97a46af11cbb3e4365707f42>>
 * @relayHash 32a4b7470c52c01aa28cd7dd5d4e54bf
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 32a4b7470c52c01aa28cd7dd5d4e54bf

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
export type ClubPostsPaginationQuery$variables = {
  after?: string | null;
  first?: number | null;
  id: string;
  state?: PostState | null;
};
export type ClubPostsPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"ClubPostsFragment">;
  } | null;
};
export type ClubPostsPaginationQuery = {
  response: ClubPostsPaginationQuery$data;
  variables: ClubPostsPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": 17,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "state"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v5 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v6 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
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
  "name": "id",
  "storageKey": null
},
v9 = [
  (v5/*: any*/),
  (v6/*: any*/),
  {
    "kind": "Literal",
    "name": "sortBy",
    "value": "NEW"
  },
  {
    "kind": "Variable",
    "name": "state",
    "variableName": "state"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoDuration",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoNoAudio",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubPostsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ClubPostsFragment"
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
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ClubPostsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v9/*: any*/),
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
                          (v8/*: any*/),
                          (v10/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PostContent",
                            "kind": "LinkedField",
                            "name": "content",
                            "plural": true,
                            "selections": [
                              (v8/*: any*/),
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
                                "concreteType": "Resource",
                                "kind": "LinkedField",
                                "name": "resource",
                                "plural": false,
                                "selections": [
                                  (v11/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "processed",
                                    "storageKey": null
                                  },
                                  (v12/*: any*/),
                                  (v13/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "preview",
                                    "storageKey": null
                                  },
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
                                    "concreteType": "ResourceProgress",
                                    "kind": "LinkedField",
                                    "name": "progress",
                                    "plural": false,
                                    "selections": [
                                      (v8/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "progress",
                                        "storageKey": null
                                      },
                                      (v10/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v8/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ResourceUrl",
                                    "kind": "LinkedField",
                                    "name": "urls",
                                    "plural": true,
                                    "selections": [
                                      (v14/*: any*/),
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
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "width",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "height",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ResourceUrl",
                                    "kind": "LinkedField",
                                    "name": "videoThumbnail",
                                    "plural": false,
                                    "selections": [
                                      (v14/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Resource",
                                "kind": "LinkedField",
                                "name": "supporterOnlyResource",
                                "plural": false,
                                "selections": [
                                  (v11/*: any*/),
                                  (v12/*: any*/),
                                  (v13/*: any*/),
                                  (v8/*: any*/)
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "slug",
                                "storageKey": null
                              },
                              (v8/*: any*/)
                            ],
                            "storageKey": null
                          },
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
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v9/*: any*/),
                "filters": [
                  "state",
                  "sortBy"
                ],
                "handle": "connection",
                "key": "ClubPosts_posts",
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
    "id": "32a4b7470c52c01aa28cd7dd5d4e54bf",
    "metadata": {},
    "name": "ClubPostsPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "cb61df8b60e4a4941a2015b1f7bef3ef";

export default node;
