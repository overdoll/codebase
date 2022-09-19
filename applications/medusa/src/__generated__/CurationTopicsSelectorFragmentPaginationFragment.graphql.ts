/**
 * @generated SignedSource<<b51ba0f4a9bb7291b9e49af4d7f3d8a5>>
 * @relayHash 0ebeb2ced9f773fe0ff3e580207515cc
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0ebeb2ced9f773fe0ff3e580207515cc

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationTopicsSelectorFragmentPaginationFragment$variables = {
  after?: string | null;
  first?: number | null;
};
export type CurationTopicsSelectorFragmentPaginationFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CurationTopicsSelectorFragment">;
};
export type CurationTopicsSelectorFragmentPaginationFragment = {
  response: CurationTopicsSelectorFragmentPaginationFragment$data;
  variables: CurationTopicsSelectorFragmentPaginationFragment$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 100,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = [
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
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = [
  {
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
        "name": "thumbnail",
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
  },
  (v2/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "bannerMedia",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    {
      "kind": "TypeDiscriminator",
      "abstractKey": "__isMedia"
    },
    {
      "kind": "InlineFragment",
      "selections": (v5/*: any*/),
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
          "selections": (v5/*: any*/),
          "storageKey": null
        },
        (v2/*: any*/)
      ],
      "type": "VideoMedia",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v2/*: any*/)
      ],
      "type": "RawMedia",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v9 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CurationTopicsSelectorFragmentPaginationFragment",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "CurationTopicsSelectorFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CurationTopicsSelectorFragmentPaginationFragment",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TopicConnection",
        "kind": "LinkedField",
        "name": "topics",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TopicEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Topic",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": (v7/*: any*/),
                    "concreteType": "CategoryConnection",
                    "kind": "LinkedField",
                    "name": "categories",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CategoryEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Category",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              (v6/*: any*/),
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": "categories(first:100)"
                  },
                  {
                    "alias": null,
                    "args": (v7/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "CurationTopicCategoriesFragment_categories",
                    "kind": "LinkedHandle",
                    "name": "categories"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "CurationTopicsSelectorFragment_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      }
    ]
  },
  "params": {
    "id": "0ebeb2ced9f773fe0ff3e580207515cc",
    "metadata": {},
    "name": "CurationTopicsSelectorFragmentPaginationFragment",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "ef5cc801eb9b3479e1f2c82d7e8f40f3";

export default node;
