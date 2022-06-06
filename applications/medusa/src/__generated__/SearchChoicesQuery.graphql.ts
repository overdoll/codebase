/**
 * @generated SignedSource<<ca13380356c57c86c060a1a5b721e8c9>>
 * @relayHash f5a2263f0b3eadbc682ba1c99254cf9c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f5a2263f0b3eadbc682ba1c99254cf9c

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchChoicesQuery$variables = {
  search?: string | null;
  seriesSlugs?: ReadonlyArray<string> | null;
  charactersSlugs?: ReadonlyArray<string> | null;
  categoriesSlugs?: ReadonlyArray<string> | null;
  charactersSeriesSlug?: string | null;
};
export type SearchChoicesQueryVariables = SearchChoicesQuery$variables;
export type SearchChoicesQuery$data = {
  readonly categories: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly slug: string;
        readonly title: string;
      };
    }>;
  };
  readonly characters: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly slug: string;
        readonly name: string;
        readonly series: {
          readonly slug: string;
        };
      };
    }>;
  };
  readonly series: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly slug: string;
        readonly title: string;
      };
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"GeneralSearchCategoriesFragment" | "GeneralSearchCharactersFragment" | "GeneralSearchSeriesFragment">;
};
export type SearchChoicesQueryResponse = SearchChoicesQuery$data;
export type SearchChoicesQuery = {
  variables: SearchChoicesQueryVariables;
  response: SearchChoicesQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categoriesSlugs"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "charactersSeriesSlug"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "charactersSlugs"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "search"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "seriesSlugs"
},
v5 = {
  "kind": "Literal",
  "name": "first",
  "value": 5
},
v6 = {
  "kind": "Variable",
  "name": "title",
  "variableName": "search"
},
v7 = [
  (v5/*: any*/),
  {
    "kind": "Variable",
    "name": "slugs",
    "variableName": "categoriesSlugs"
  },
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v11 = [
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/)
],
v12 = [
  (v5/*: any*/),
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "search"
  },
  {
    "kind": "Variable",
    "name": "seriesSlug",
    "variableName": "charactersSeriesSlug"
  },
  {
    "kind": "Variable",
    "name": "slugs",
    "variableName": "charactersSlugs"
  }
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v14 = [
  (v5/*: any*/),
  {
    "kind": "Variable",
    "name": "slugs",
    "variableName": "seriesSlugs"
  },
  (v6/*: any*/)
],
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
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceUrl",
      "kind": "LinkedField",
      "name": "urls",
      "plural": true,
      "selections": [
        (v15/*: any*/),
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
        (v15/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "processed",
      "storageKey": null
    },
    (v8/*: any*/)
  ],
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v19 = {
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
v20 = [
  "title",
  "slugs"
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchChoicesQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "GeneralSearchCategoriesFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "GeneralSearchCharactersFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "GeneralSearchSeriesFragment"
      },
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
                "selections": (v11/*: any*/),
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
        "args": (v12/*: any*/),
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
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v13/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Series",
                    "kind": "LinkedField",
                    "name": "series",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
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
        "args": (v14/*: any*/),
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
                "selections": (v11/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
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
      (v3/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "SearchChoicesQuery",
    "selections": [
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
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/)
                ],
                "storageKey": null
              },
              (v18/*: any*/)
            ],
            "storageKey": null
          },
          (v19/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v7/*: any*/),
        "filters": (v20/*: any*/),
        "handle": "connection",
        "key": "GeneralSearchCategories_categories",
        "kind": "LinkedHandle",
        "name": "categories"
      },
      {
        "alias": null,
        "args": (v12/*: any*/),
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
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v13/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Series",
                    "kind": "LinkedField",
                    "name": "series",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v8/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v16/*: any*/),
                  (v17/*: any*/)
                ],
                "storageKey": null
              },
              (v18/*: any*/)
            ],
            "storageKey": null
          },
          (v19/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v12/*: any*/),
        "filters": [
          "name",
          "slugs",
          "seriesSlug"
        ],
        "handle": "connection",
        "key": "SearchCharactersGeneral_characters",
        "kind": "LinkedHandle",
        "name": "characters"
      },
      {
        "alias": null,
        "args": (v14/*: any*/),
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
                  (v8/*: any*/),
                  (v10/*: any*/),
                  (v9/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/)
                ],
                "storageKey": null
              },
              (v18/*: any*/)
            ],
            "storageKey": null
          },
          (v19/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v14/*: any*/),
        "filters": (v20/*: any*/),
        "handle": "connection",
        "key": "GeneralSearchSeries_series",
        "kind": "LinkedHandle",
        "name": "series"
      }
    ]
  },
  "params": {
    "id": "f5a2263f0b3eadbc682ba1c99254cf9c",
    "metadata": {},
    "name": "SearchChoicesQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "aa6540abe12299bbbd59efa4ccc9fd25";

export default node;
