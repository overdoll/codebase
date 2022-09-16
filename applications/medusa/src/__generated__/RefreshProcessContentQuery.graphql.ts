/**
 * @generated SignedSource<<1aa245e1f8e93f05c3e67bcb6200998f>>
 * @relayHash bb2017c3885845e1829c48ebdb951068
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID bb2017c3885845e1829c48ebdb951068

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
export type ResourceProgressState = "FINALIZING" | "STARTED" | "WAITING" | "%future added value";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type RefreshProcessContentQuery$variables = {
  reference: string;
};
export type RefreshProcessContentQuery$data = {
  readonly post: {
    readonly content: ReadonlyArray<{
      readonly id: string;
      readonly isSupporterOnly: boolean;
      readonly media: {
        readonly " $fragmentSpreads": FragmentRefs<"RawCinematicMediaFragment" | "RawThumbnailMediaFragment">;
      };
      readonly resource: {
        readonly failed: boolean;
        readonly height: number;
        readonly id: string;
        readonly preview: string;
        readonly processed: boolean;
        readonly progress: {
          readonly progress: number;
          readonly state: ResourceProgressState;
        } | null;
        readonly type: ResourceType;
        readonly urls: ReadonlyArray<{
          readonly mimeType: string;
          readonly url: string;
        }>;
        readonly videoDuration: number;
        readonly videoThumbnail: {
          readonly url: string;
        } | null;
        readonly width: number;
      };
      readonly viewerCanViewSupporterOnlyContent: boolean;
      readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewMemoFragment">;
    }>;
    readonly id: string;
    readonly reference: string;
    readonly state: PostState;
    readonly " $fragmentSpreads": FragmentRefs<"ArchivedPostFragment" | "DraftPostFragment" | "PostContentPreviewMemoPostFragment" | "ProcessContentDisplayFragment" | "PublishedPostFragment" | "RejectedPostFragment" | "RemovedPostFragment" | "ReviewPostFragment">;
  } | null;
};
export type RefreshProcessContentQuery = {
  response: RefreshProcessContentQuery$data;
  variables: RefreshProcessContentQuery$variables;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerCanViewSupporterOnlyContent",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSupporterOnly",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "failed",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "processed",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoDuration",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "progress",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v13 = [
  (v12/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "videoThumbnail",
  "plural": false,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "urls",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mimeType",
      "storageKey": null
    },
    (v12/*: any*/)
  ],
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
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "preview",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v20 = {
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
v21 = [
  (v12/*: any*/),
  (v16/*: any*/),
  (v17/*: any*/)
],
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "small",
  "plural": false,
  "selections": (v21/*: any*/),
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "medium",
  "plural": false,
  "selections": (v21/*: any*/),
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v21/*: any*/),
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMediaAccess",
  "kind": "LinkedField",
  "name": "thumbnailHd",
  "plural": false,
  "selections": (v21/*: any*/),
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoNoAudio",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RefreshProcessContentQuery",
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
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PostContent",
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "media",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "RawCinematicMediaFragment"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "RawThumbnailMediaFragment"
                  }
                ],
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
                  (v2/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceProgress",
                    "kind": "LinkedField",
                    "name": "progress",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/)
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PostContentPreviewMemoFragment"
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProcessContentDisplayFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostContentPreviewMemoPostFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DraftPostFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PublishedPostFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ReviewPostFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RejectedPostFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArchivedPostFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RemovedPostFragment"
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
    "name": "RefreshProcessContentQuery",
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
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PostContent",
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "media",
                "plural": false,
                "selections": [
                  (v19/*: any*/),
                  {
                    "kind": "TypeDiscriminator",
                    "abstractKey": "__isMedia"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "MediaProgress",
                        "kind": "LinkedField",
                        "name": "progress",
                        "plural": false,
                        "selections": [
                          (v11/*: any*/),
                          (v3/*: any*/),
                          (v2/*: any*/)
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
                      (v2/*: any*/)
                    ],
                    "type": "RawMedia",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v20/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ImageMediaVariants",
                        "kind": "LinkedField",
                        "name": "variants",
                        "plural": false,
                        "selections": [
                          (v22/*: any*/),
                          (v23/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ImageMediaAccess",
                            "kind": "LinkedField",
                            "name": "large",
                            "plural": false,
                            "selections": (v21/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ImageMediaAccess",
                            "kind": "LinkedField",
                            "name": "hd",
                            "plural": false,
                            "selections": (v21/*: any*/),
                            "storageKey": null
                          },
                          (v24/*: any*/),
                          (v25/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ImageMediaVariants",
                            "kind": "LinkedField",
                            "name": "variants",
                            "plural": false,
                            "selections": [
                              (v24/*: any*/),
                              (v23/*: any*/),
                              (v22/*: any*/),
                              (v25/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/),
                          (v20/*: any*/)
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
                          (v19/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v13/*: any*/),
                            "type": "HLSVideoContainer",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v13/*: any*/),
                            "type": "MP4VideoContainer",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "type": "VideoMedia",
                    "abstractKey": null
                  }
                ],
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
                  (v2/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceProgress",
                    "kind": "LinkedField",
                    "name": "progress",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v11/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v26/*: any*/)
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
                  (v8/*: any*/),
                  (v10/*: any*/),
                  (v26/*: any*/),
                  (v2/*: any*/)
                ],
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
                "name": "canCreateSupporterOnlyPosts",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
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
    "id": "bb2017c3885845e1829c48ebdb951068",
    "metadata": {},
    "name": "RefreshProcessContentQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "10882cf457c4b56df983ae1b28cd5473";

export default node;
