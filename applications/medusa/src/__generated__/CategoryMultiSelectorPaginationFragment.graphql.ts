/**
 * @generated SignedSource<<596d97a4bc46114d00762be08bb87640>>
 * @relayHash 0addcedc432e975c4470cc890fda6fd4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
<<<<<<< HEAD:applications/medusa/src/__generated__/CategoryMultiSelectorPaginationFragment.graphql.ts
/* @relayHash 467e9600e442ab4c08cbef88fedde076 */
=======
>>>>>>> master:applications/medusa/src/__generated__/SearchCategoriesPaginationFragment.graphql.ts

// @relayRequestID 0addcedc432e975c4470cc890fda6fd4

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD:applications/medusa/src/__generated__/CategoryMultiSelectorPaginationFragment.graphql.ts
export type CategoryMultiSelectorPaginationFragmentVariables = {
    after?: string | null | undefined;
    first?: number | null | undefined;
    title?: string | null | undefined;
};
export type CategoryMultiSelectorPaginationFragmentResponse = {
    readonly " $fragmentRefs": FragmentRefs<"CategoryMultiSelectorFragment">;
};
export type CategoryMultiSelectorPaginationFragment = {
    readonly response: CategoryMultiSelectorPaginationFragmentResponse;
    readonly variables: CategoryMultiSelectorPaginationFragmentVariables;
};



/*
query CategoryMultiSelectorPaginationFragment(
  $after: String
  $first: Int = 5
  $title: String
) {
  ...CategoryMultiSelectorFragment_2PG6LC
}

fragment CategoryMultiSelectorFragment_2PG6LC on Query {
  categories(first: $first, after: $after, title: $title) {
    edges {
      node {
        id
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

fragment VideoSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}
*/

=======
export type SearchCategoriesPaginationFragment$variables = {
  after?: string | null;
  first?: number | null;
  title?: string | null;
};
export type SearchCategoriesPaginationFragmentVariables = SearchCategoriesPaginationFragment$variables;
export type SearchCategoriesPaginationFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SearchCategoriesFragment">;
};
export type SearchCategoriesPaginationFragmentResponse = SearchCategoriesPaginationFragment$data;
export type SearchCategoriesPaginationFragment = {
  variables: SearchCategoriesPaginationFragmentVariables;
  response: SearchCategoriesPaginationFragment$data;
};

>>>>>>> master:applications/medusa/src/__generated__/SearchCategoriesPaginationFragment.graphql.ts
const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 5,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "title"
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
  },
  {
    "kind": "Variable",
    "name": "title",
    "variableName": "title"
  }
],
v2 = {
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
    "name": "CategoryMultiSelectorPaginationFragment",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "CategoryMultiSelectorFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CategoryMultiSelectorPaginationFragment",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                      (v2/*: any*/)
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
        "args": (v1/*: any*/),
        "filters": [
          "title"
        ],
        "handle": "connection",
        "key": "CategoryMultiSelector_categories",
        "kind": "LinkedHandle",
        "name": "categories"
      }
    ]
  },
  "params": {
    "id": "467e9600e442ab4c08cbef88fedde076",
    "metadata": {},
    "name": "CategoryMultiSelectorPaginationFragment",
    "operationKind": "query",
    "text": null
  }
};
})();
<<<<<<< HEAD:applications/medusa/src/__generated__/CategoryMultiSelectorPaginationFragment.graphql.ts
(node as any).hash = 'ddee49fe0340cf7db8034ff6297714de';
=======

(node as any).hash = "820591d8df74cc47f6fe5704e3841869";

>>>>>>> master:applications/medusa/src/__generated__/SearchCategoriesPaginationFragment.graphql.ts
export default node;
