/**
 * @generated SignedSource<<bb58fca9037ce789b5162d613c5bdfa1>>
 * @relayHash 5bfe0f800f9ec5354fd7797aa24086d8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadSearchCategoriesMultiSelectorQuery.graphql.ts
/* @relayHash ca2923da6221b4474dfe0fdb2ad2daae */
=======
>>>>>>> master:applications/medusa/src/__generated__/SearchCategoriesQuery.graphql.ts

// @relayRequestID 5bfe0f800f9ec5354fd7797aa24086d8

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadSearchCategoriesMultiSelectorQuery.graphql.ts
export type UploadSearchCategoriesMultiSelectorQueryVariables = {
    title?: string | null | undefined;
};
export type UploadSearchCategoriesMultiSelectorQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"UploadSearchCategoriesMultiSelectorFragment">;
};
export type UploadSearchCategoriesMultiSelectorQuery = {
    readonly response: UploadSearchCategoriesMultiSelectorQueryResponse;
    readonly variables: UploadSearchCategoriesMultiSelectorQueryVariables;
};



/*
query UploadSearchCategoriesMultiSelectorQuery(
  $title: String
) {
  ...UploadSearchCategoriesMultiSelectorFragment_3FzUSU
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

fragment UploadSearchCategoriesMultiSelectorFragment_3FzUSU on Query {
  categories(first: 5, title: $title) {
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

fragment VideoSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}
*/

=======
export type SearchCategoriesQuery$variables = {
  title?: string | null;
};
export type SearchCategoriesQueryVariables = SearchCategoriesQuery$variables;
export type SearchCategoriesQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SearchCategoriesFragment">;
};
export type SearchCategoriesQueryResponse = SearchCategoriesQuery$data;
export type SearchCategoriesQuery = {
  variables: SearchCategoriesQueryVariables;
  response: SearchCategoriesQuery$data;
};

>>>>>>> master:applications/medusa/src/__generated__/SearchCategoriesQuery.graphql.ts
const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "title"
  }
],
v1 = {
  "kind": "Variable",
  "name": "title",
  "variableName": "title"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  },
  (v1/*: any*/)
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
    "name": "UploadSearchCategoriesMultiSelectorQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "UploadSearchCategoriesMultiSelectorFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UploadSearchCategoriesMultiSelectorQuery",
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
          "title"
        ],
        "handle": "connection",
        "key": "UploadSearchCategoriesMultiSelector_categories",
        "kind": "LinkedHandle",
        "name": "categories"
      }
    ]
  },
  "params": {
    "id": "ca2923da6221b4474dfe0fdb2ad2daae",
    "metadata": {},
    "name": "UploadSearchCategoriesMultiSelectorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadSearchCategoriesMultiSelectorQuery.graphql.ts
(node as any).hash = '2c2c7335c9466f6faa6288581e3d06cd';
=======

(node as any).hash = "4f48576e48f3ef7919d14cf7d1dc2763";

>>>>>>> master:applications/medusa/src/__generated__/SearchCategoriesQuery.graphql.ts
export default node;
