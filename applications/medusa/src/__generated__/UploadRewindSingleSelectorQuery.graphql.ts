/**
 * @generated SignedSource<<0f024eb6f871bf221d6d738b21486164>>
 * @relayHash 04c207425659c7b19a37067abf271795
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 04c207425659c7b19a37067abf271795

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
export type UploadRewindSingleSelectorQuery$variables = {
  slug: string;
  state?: PostState | null;
};
export type UploadRewindSingleSelectorQuery$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"UploadRewindSingleSelectorFragment">;
  };
};
export type UploadRewindSingleSelectorQuery = {
  response: UploadRewindSingleSelectorQuery$data;
  variables: UploadRewindSingleSelectorQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "state"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 7
  },
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
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
v7 = {
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
      "name": "banner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
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
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UploadRewindSingleSelectorQuery",
    "selections": [
      {
        "kind": "RequiredField",
        "field": {
          "alias": null,
          "args": (v1/*: any*/),
          "concreteType": "Club",
          "kind": "LinkedField",
          "name": "club",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "UploadRewindSingleSelectorFragment"
            }
          ],
          "storageKey": null
        },
        "action": "THROW",
        "path": "club"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UploadRewindSingleSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Category",
                        "kind": "LinkedField",
                        "name": "categories",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/),
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
                            "kind": "ScalarField",
                            "name": "isSupporterOnly",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "media",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
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
                                      (v6/*: any*/),
                                      (v7/*: any*/),
                                      (v3/*: any*/)
                                    ],
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
                                    "kind": "ScalarField",
                                    "name": "duration",
                                    "storageKey": null
                                  },
                                  (v3/*: any*/)
                                ],
                                "type": "VideoMedia",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v3/*: any*/),
                                  (v6/*: any*/),
                                  (v7/*: any*/)
                                ],
                                "type": "ImageMedia",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v3/*: any*/),
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
                                      (v4/*: any*/),
                                      (v3/*: any*/)
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
                              {
                                "kind": "TypeDiscriminator",
                                "abstractKey": "__isMedia"
                              }
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/)
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
            "filters": [
              "sortBy",
              "state"
            ],
            "handle": "connection",
            "key": "ClubPosts_posts",
            "kind": "LinkedHandle",
            "name": "posts"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "04c207425659c7b19a37067abf271795",
    "metadata": {},
    "name": "UploadRewindSingleSelectorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "937e67aa3416555abb17f0bd0b78cc69";

export default node;
