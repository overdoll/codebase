/**
 * @generated SignedSource<<bd494a3bec8b026c8f2129c48a6602d6>>
 * @relayHash 1a55f9e136dc081e3a295141731b3338
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1a55f9e136dc081e3a295141731b3338

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadSearchTopicsSelectorQuery$variables = {};
export type UploadSearchTopicsSelectorQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UploadSearchTopicsSelectorFragment">;
};
export type UploadSearchTopicsSelectorQuery = {
  response: UploadSearchTopicsSelectorQuery$data;
  variables: UploadSearchTopicsSelectorQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = [
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
  },
  (v1/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "bannerMedia",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    {
      "kind": "TypeDiscriminator",
      "abstractKey": "__isMedia"
    },
    {
      "kind": "InlineFragment",
      "selections": (v4/*: any*/),
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
          "selections": (v4/*: any*/),
          "storageKey": null
        },
        (v1/*: any*/)
      ],
      "type": "VideoMedia",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v1/*: any*/)
      ],
      "type": "RawMedia",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v7 = {
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UploadSearchTopicsSelectorQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "UploadSearchTopicsSelectorFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UploadSearchTopicsSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": (v0/*: any*/),
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
                              (v1/*: any*/),
                              (v2/*: any*/),
                              (v5/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": "categories(first:100)"
                  },
                  {
                    "alias": null,
                    "args": (v0/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "UploadSearchTopicCategoriesFragment_categories",
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
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": "topics(first:100)"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "UploadSearchTopicsSelectorFragment_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      }
    ]
  },
  "params": {
    "id": "1a55f9e136dc081e3a295141731b3338",
    "metadata": {},
    "name": "UploadSearchTopicsSelectorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "5dcd3459dd4d1fc3235c77eef0ad5a45";

export default node;
