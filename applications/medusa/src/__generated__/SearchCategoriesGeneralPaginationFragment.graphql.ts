/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash bffd9e46bea4c56848592e76c73fadd9 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchCategoriesGeneralPaginationFragmentVariables = {
    after?: string | null | undefined;
    categoriesSlugs?: Array<string> | null | undefined;
    first?: number | null | undefined;
    search?: string | null | undefined;
    title?: string | null | undefined;
};
export type SearchCategoriesGeneralPaginationFragmentResponse = {
    readonly " $fragmentRefs": FragmentRefs<"SearchCategoriesGeneralFragment">;
};
export type SearchCategoriesGeneralPaginationFragment = {
    readonly response: SearchCategoriesGeneralPaginationFragmentResponse;
    readonly variables: SearchCategoriesGeneralPaginationFragmentVariables;
};



/*
query SearchCategoriesGeneralPaginationFragment(
  $after: String
  $categoriesSlugs: [String!]
  $first: Int
  $search: String
) {
  ...SearchCategoriesGeneralFragment_2fTRgi
}

fragment CategoryTileOverlayFragment on Category {
  title
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

fragment SearchCategoriesGeneralFragment_2fTRgi on Query {
  categories(first: $first, after: $after, title: $search, slugs: $categoriesSlugs) {
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

fragment VideoSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "categoriesSlugs"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "title"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "slugs",
    "variableName": "categoriesSlugs"
  },
  {
    "kind": "Variable",
    "name": "title",
    "variableName": "search"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchCategoriesGeneralPaginationFragment",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          {
            "kind": "Variable",
            "name": "title",
            "variableName": "title"
          }
        ],
        "kind": "FragmentSpread",
        "name": "SearchCategoriesGeneralFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchCategoriesGeneralPaginationFragment",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  {
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
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
          "title",
          "slugs"
        ],
        "handle": "connection",
        "key": "SearchCategoriesGeneral_categories",
        "kind": "LinkedHandle",
        "name": "categories"
      }
    ]
  },
  "params": {
    "id": "bffd9e46bea4c56848592e76c73fadd9",
    "metadata": {},
    "name": "SearchCategoriesGeneralPaginationFragment",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '520ed291d34c115ada1b7b76f65b3029';
export default node;
