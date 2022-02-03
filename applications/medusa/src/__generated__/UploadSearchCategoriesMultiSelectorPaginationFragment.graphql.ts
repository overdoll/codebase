/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash aca602cc48c1f76ddf7766ec0cc0d82f */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UploadSearchCategoriesMultiSelectorPaginationFragmentVariables = {
    after?: string | null | undefined;
    first?: number | null | undefined;
    title?: string | null | undefined;
};
export type UploadSearchCategoriesMultiSelectorPaginationFragmentResponse = {
    readonly " $fragmentRefs": FragmentRefs<"UploadSearchCategoriesMultiSelectorFragment">;
};
export type UploadSearchCategoriesMultiSelectorPaginationFragment = {
    readonly response: UploadSearchCategoriesMultiSelectorPaginationFragmentResponse;
    readonly variables: UploadSearchCategoriesMultiSelectorPaginationFragmentVariables;
};



/*
query UploadSearchCategoriesMultiSelectorPaginationFragment(
  $after: String
  $first: Int = 5
  $title: String
) {
  ...UploadSearchCategoriesMultiSelectorFragment_2PG6LC
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

fragment UploadSearchCategoriesMultiSelectorFragment_2PG6LC on Query {
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
    "name": "UploadSearchCategoriesMultiSelectorPaginationFragment",
    "selections": [
      {
        "args": (v1/*: any*/),
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
    "name": "UploadSearchCategoriesMultiSelectorPaginationFragment",
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
        "key": "UploadSearchCategoriesMultiSelector_categories",
        "kind": "LinkedHandle",
        "name": "categories"
      }
    ]
  },
  "params": {
    "id": "aca602cc48c1f76ddf7766ec0cc0d82f",
    "metadata": {},
    "name": "UploadSearchCategoriesMultiSelectorPaginationFragment",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'd1e1166386f5f63bb0495e9a00f551d5';
export default node;
