/**
 * @generated SignedSource<<47994214251ad8a51b9b9919f5a6f9be>>
 * @relayHash d2d11d40ce9a2a3f5520815727ff14de
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d2d11d40ce9a2a3f5520815727ff14de

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LazyNewTopPostsHomeQuery$variables = {};
export type LazyNewTopPostsHomeQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"GridNewTopPostsHomeFragment">;
};
export type LazyNewTopPostsHomeQuery = {
  response: LazyNewTopPostsHomeQuery$data;
  variables: LazyNewTopPostsHomeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
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
        "name": "smallBanner",
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
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageMedia",
  "kind": "LinkedField",
  "name": "cover",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": null
},
v4 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isMedia"
},
v5 = {
  "kind": "InlineFragment",
  "selections": (v2/*: any*/),
  "type": "ImageMedia",
  "abstractKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    (v1/*: any*/)
  ],
  "type": "RawMedia",
  "abstractKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v8 = [
  (v7/*: any*/),
  (v1/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Club",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": (v8/*: any*/),
  "storageKey": null
},
v10 = [
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
            "concreteType": "PostContent",
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "media",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "duration",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      (v1/*: any*/)
                    ],
                    "type": "VideoMedia",
                    "abstractKey": null
                  },
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v1/*: any*/)
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
          (v9/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v11 = {
  "kind": "Literal",
  "name": "first",
  "value": 3
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "bannerMedia",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v4/*: any*/),
    (v5/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        (v3/*: any*/),
        (v1/*: any*/)
      ],
      "type": "VideoMedia",
      "abstractKey": null
    },
    (v6/*: any*/)
  ],
  "storageKey": null
},
v13 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  },
  (v1/*: any*/),
  (v12/*: any*/),
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LazyNewTopPostsHomeQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "GridNewTopPostsHomeFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LazyNewTopPostsHomeQuery",
    "selections": [
      {
        "alias": "topPosts",
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 4
          },
          {
            "kind": "Literal",
            "name": "sortBy",
            "value": "TOP"
          }
        ],
        "concreteType": "PostConnection",
        "kind": "LinkedField",
        "name": "posts",
        "plural": false,
        "selections": (v10/*: any*/),
        "storageKey": "posts(first:4,sortBy:\"TOP\")"
      },
      {
        "alias": "newPosts",
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 5
          },
          {
            "kind": "Literal",
            "name": "sortBy",
            "value": "NEW"
          }
        ],
        "concreteType": "PostConnection",
        "kind": "LinkedField",
        "name": "posts",
        "plural": false,
        "selections": (v10/*: any*/),
        "storageKey": "posts(first:5,sortBy:\"NEW\")"
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "excludeEmpty",
            "value": true
          },
          (v11/*: any*/),
          {
            "kind": "Literal",
            "name": "sortBy",
            "value": "POPULAR"
          }
        ],
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
                "selections": (v13/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "categories(excludeEmpty:true,first:3,sortBy:\"POPULAR\")"
      },
      {
        "alias": null,
        "args": [
          (v11/*: any*/)
        ],
        "concreteType": "CharacterConnection",
        "kind": "LinkedField",
        "name": "characters",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CharacterEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  (v12/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Series",
                    "kind": "LinkedField",
                    "name": "series",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "characters(first:3)"
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 2
          }
        ],
        "concreteType": "SeriesConnection",
        "kind": "LinkedField",
        "name": "series",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SeriesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Series",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": (v13/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "series(first:2)"
      }
    ]
  },
  "params": {
    "id": "d2d11d40ce9a2a3f5520815727ff14de",
    "metadata": {},
    "name": "LazyNewTopPostsHomeQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "2f3f7d5815695b9b2b135932a5979c65";

export default node;
