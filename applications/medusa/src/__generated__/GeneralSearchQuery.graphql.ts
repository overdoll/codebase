/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash f014e2ac6d74512e38b8ec708733d22e */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneralSearchQueryVariables = {
    search?: string | null | undefined;
    first?: number | null | undefined;
    seriesSlugs?: Array<string> | null | undefined;
    charactersSlugs?: Array<string> | null | undefined;
    categoriesSlugs?: Array<string> | null | undefined;
    charactersSeriesSlug?: string | null | undefined;
};
export type GeneralSearchQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"SearchCategoriesGeneralFragment" | "SearchCharactersGeneralFragment" | "SearchSeriesGeneralFragment">;
};
export type GeneralSearchQuery = {
    readonly response: GeneralSearchQueryResponse;
    readonly variables: GeneralSearchQueryVariables;
};



/*
query GeneralSearchQuery(
  $search: String
  $first: Int
  $seriesSlugs: [String!]
  $charactersSlugs: [String!]
  $categoriesSlugs: [String!]
  $charactersSeriesSlug: String
) {
  ...SearchCategoriesGeneralFragment
  ...SearchCharactersGeneralFragment
  ...SearchSeriesGeneralFragment
}

fragment CategoryTileOverlayFragment on Category {
  title
  thumbnail {
    ...ResourceItemFragment
    id
  }
}

fragment CharacterTileOverlayFragment on Character {
  name
  series {
    title
    id
  }
  thumbnail {
    ...ResourceItemFragment
    id
  }
}

fragment ImageSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}

fragment ResourceItemFragment on Resource {
  type
  ...ImageSnippetFragment
  ...VideoSnippetFragment
}

fragment SearchCategoriesGeneralFragment on Query {
  categories(first: $first, title: $search, slugs: $categoriesSlugs) {
    edges {
      node {
        id
        slug
        title
        ...CategoryTileOverlayFragment
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment SearchCharactersGeneralFragment on Query {
  characters(first: $first, name: $search, slugs: $charactersSlugs, seriesSlug: $charactersSeriesSlug) {
    edges {
      node {
        id
        slug
        name
        ...CharacterTileOverlayFragment
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment SearchSeriesGeneralFragment on Query {
  series(first: $first, title: $search, slugs: $seriesSlugs) {
    edges {
      node {
        id
        title
        slug
        ...SeriesTileOverlayFragment
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment SeriesTileOverlayFragment on Series {
  title
  thumbnail {
    ...ResourceItemFragment
    id
  }
}

fragment VideoSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}
*/

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
  "name": "first"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "search"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "seriesSlugs"
},
v6 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v7 = {
  "kind": "Variable",
  "name": "title",
  "variableName": "search"
},
v8 = [
  (v6/*: any*/),
  {
    "kind": "Variable",
    "name": "slugs",
    "variableName": "categoriesSlugs"
  },
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v12 = {
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
          "name": "mimeType",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v9/*: any*/)
  ],
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v15 = {
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
v16 = [
  "title",
  "slugs"
],
v17 = [
  (v6/*: any*/),
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
v18 = [
  (v6/*: any*/),
  {
    "kind": "Variable",
    "name": "slugs",
    "variableName": "seriesSlugs"
  },
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneralSearchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SearchCategoriesGeneralFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SearchCharactersGeneralFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SearchSeriesGeneralFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v4/*: any*/),
      (v3/*: any*/),
      (v5/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "GeneralSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
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
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/)
                ],
                "storageKey": null
              },
              (v14/*: any*/)
            ],
            "storageKey": null
          },
          (v15/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v8/*: any*/),
        "filters": (v16/*: any*/),
        "handle": "connection",
        "key": "SearchCategoriesGeneral_categories",
        "kind": "LinkedHandle",
        "name": "categories"
      },
      {
        "alias": null,
        "args": (v17/*: any*/),
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
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Series",
                    "kind": "LinkedField",
                    "name": "series",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/),
                  (v13/*: any*/)
                ],
                "storageKey": null
              },
              (v14/*: any*/)
            ],
            "storageKey": null
          },
          (v15/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v17/*: any*/),
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
        "args": (v18/*: any*/),
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
                  (v9/*: any*/),
                  (v11/*: any*/),
                  (v10/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/)
                ],
                "storageKey": null
              },
              (v14/*: any*/)
            ],
            "storageKey": null
          },
          (v15/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v18/*: any*/),
        "filters": (v16/*: any*/),
        "handle": "connection",
        "key": "SearchSeriesGeneral_series",
        "kind": "LinkedHandle",
        "name": "series"
      }
    ]
  },
  "params": {
    "id": "f014e2ac6d74512e38b8ec708733d22e",
    "metadata": {},
    "name": "GeneralSearchQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '44d4f6f43e5b91dfc1d813ff9face834';
export default node;
