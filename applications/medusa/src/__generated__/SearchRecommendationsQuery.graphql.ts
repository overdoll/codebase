/**
 * @generated SignedSource<<b59c98323d1a04f1b25d2b82fb4eb613>>
 * @relayHash a0fe9ebbd1b15dc9b3147c26897e3541
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a0fe9ebbd1b15dc9b3147c26897e3541

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchRecommendationsQuery$variables = {};
export type SearchRecommendationsQuery$data = {
  readonly categories: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"SearchResultsCategoryFragment">;
      };
    }>;
  };
  readonly characters: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"SearchResultsCharacterFragment">;
      };
    }>;
  };
  readonly discoverClubs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"SearchResultsClubFragment">;
      };
    }>;
  };
  readonly series: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"SearchResultsSeriesFragment">;
      };
    }>;
  };
};
export type SearchRecommendationsQuery = {
  response: SearchRecommendationsQuery$data;
  variables: SearchRecommendationsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "excludeEmpty",
  "value": true
},
v1 = {
  "kind": "Literal",
  "name": "first",
  "value": 17
},
v2 = [
  {
    "kind": "Literal",
    "name": "clubCharacters",
    "value": false
  },
  (v0/*: any*/),
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v0/*: any*/),
  (v1/*: any*/)
],
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 8
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isMedia"
},
v11 = {
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
v12 = [
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
v13 = [
  (v11/*: any*/),
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
        "selections": (v12/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v3/*: any*/)
],
v14 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/)
  ],
  "type": "RawMedia",
  "abstractKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "bannerMedia",
  "plural": false,
  "selections": [
    (v9/*: any*/),
    (v10/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v13/*: any*/),
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
          "selections": (v13/*: any*/),
          "storageKey": null
        },
        (v3/*: any*/)
      ],
      "type": "VideoMedia",
      "abstractKey": null
    },
    (v14/*: any*/)
  ],
  "storageKey": null
},
v16 = [
  (v3/*: any*/),
  (v8/*: any*/),
  (v7/*: any*/),
  (v15/*: any*/)
],
v17 = [
  (v11/*: any*/),
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
        "selections": (v12/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "mini",
        "plural": false,
        "selections": (v12/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchRecommendationsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                  (v3/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "SearchResultsCharacterFragment"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "characters(clubCharacters:false,excludeEmpty:true,first:17)"
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
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
                  (v3/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "SearchResultsCategoryFragment"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "categories(excludeEmpty:true,first:17)"
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
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
                "selections": [
                  (v3/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "SearchResultsSeriesFragment"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "series(excludeEmpty:true,first:17)"
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "ClubConnection",
        "kind": "LinkedField",
        "name": "discoverClubs",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "SearchResultsClubFragment"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "discoverClubs(first:8)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SearchRecommendationsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Series",
                    "kind": "LinkedField",
                    "name": "series",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v3/*: any*/),
                      (v8/*: any*/)
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
                      (v6/*: any*/),
                      (v3/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v15/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "characters(clubCharacters:false,excludeEmpty:true,first:17)"
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
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
                "selections": (v16/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "categories(excludeEmpty:true,first:17)"
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
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
                "selections": (v16/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "series(excludeEmpty:true,first:17)"
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "ClubConnection",
        "kind": "LinkedField",
        "name": "discoverClubs",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v8/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "thumbnailMedia",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v10/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v17/*: any*/),
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
                            "selections": (v17/*: any*/),
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "type": "VideoMedia",
                        "abstractKey": null
                      },
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v15/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "discoverClubs(first:8)"
      }
    ]
  },
  "params": {
    "id": "a0fe9ebbd1b15dc9b3147c26897e3541",
    "metadata": {},
    "name": "SearchRecommendationsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "078eb2745a875a0a3d1870497cac7453";

export default node;
