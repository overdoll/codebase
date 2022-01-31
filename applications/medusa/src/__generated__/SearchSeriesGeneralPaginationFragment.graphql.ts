/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 41bb7ee459692cde0f1234ce83faecbb */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchSeriesGeneralPaginationFragmentVariables = {
    after?: string | null | undefined;
    first?: number | null | undefined;
    search?: string | null | undefined;
    seriesSlugs?: Array<string> | null | undefined;
    title?: string | null | undefined;
};
export type SearchSeriesGeneralPaginationFragmentResponse = {
    readonly " $fragmentRefs": FragmentRefs<"SearchSeriesGeneralFragment">;
};
export type SearchSeriesGeneralPaginationFragment = {
    readonly response: SearchSeriesGeneralPaginationFragmentResponse;
    readonly variables: SearchSeriesGeneralPaginationFragmentVariables;
};



/*
query SearchSeriesGeneralPaginationFragment(
  $after: String
  $first: Int
  $search: String
  $seriesSlugs: [String!]
) {
  ...SearchSeriesGeneralFragment_2fTRgi
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

fragment SearchSeriesGeneralFragment_2fTRgi on Query {
  series(first: $first, after: $after, title: $search, slugs: $seriesSlugs) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
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
    "name": "seriesSlugs"
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
    "variableName": "seriesSlugs"
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
    "name": "SearchSeriesGeneralPaginationFragment",
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
        "name": "SearchSeriesGeneralFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchSeriesGeneralPaginationFragment",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
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
        "key": "SearchSeriesGeneral_series",
        "kind": "LinkedHandle",
        "name": "series"
      }
    ]
  },
  "params": {
    "id": "41bb7ee459692cde0f1234ce83faecbb",
    "metadata": {},
    "name": "SearchSeriesGeneralPaginationFragment",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '87c724fbd9d085dc41897c368428bbba';
export default node;
