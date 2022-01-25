/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 80ca7d4b1161f5f85a1ca9e35988cae1 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchCharactersGeneralPaginationFragmentVariables = {
    after?: string | null | undefined;
    charactersSeriesSlug?: string | null | undefined;
    charactersSlugs?: Array<string> | null | undefined;
    first?: number | null | undefined;
    name?: string | null | undefined;
    search?: string | null | undefined;
};
export type SearchCharactersGeneralPaginationFragmentResponse = {
    readonly " $fragmentRefs": FragmentRefs<"SearchCharactersGeneralFragment">;
};
export type SearchCharactersGeneralPaginationFragment = {
    readonly response: SearchCharactersGeneralPaginationFragmentResponse;
    readonly variables: SearchCharactersGeneralPaginationFragmentVariables;
};



/*
query SearchCharactersGeneralPaginationFragment(
  $after: String
  $charactersSeriesSlug: String
  $charactersSlugs: [String!]
  $first: Int
  $search: String
) {
  ...SearchCharactersGeneralFragment_31Qta2
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

fragment SearchCharactersGeneralFragment_31Qta2 on Query {
  characters(first: $first, after: $after, name: $search, slugs: $charactersSlugs, seriesSlug: $charactersSeriesSlug) {
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
    "name": "charactersSeriesSlug"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "charactersSlugs"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
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
    "name": "SearchCharactersGeneralPaginationFragment",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name"
          }
        ],
        "kind": "FragmentSpread",
        "name": "SearchCharactersGeneralFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchCharactersGeneralPaginationFragment",
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
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
          "name",
          "slugs",
          "seriesSlug"
        ],
        "handle": "connection",
        "key": "SearchCharactersGeneral_characters",
        "kind": "LinkedHandle",
        "name": "characters"
      }
    ]
  },
  "params": {
    "id": "80ca7d4b1161f5f85a1ca9e35988cae1",
    "metadata": {},
    "name": "SearchCharactersGeneralPaginationFragment",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '2ef655808968ca4511715bdd08285062';
export default node;
