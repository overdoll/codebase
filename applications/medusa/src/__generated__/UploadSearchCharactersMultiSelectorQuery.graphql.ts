/**
 * @generated SignedSource<<2eee371ffdbcae903ab85629f52f98d9>>
 * @relayHash f2bf5e69d2c4096d1aa9b5bb0eb3ab27
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadSearchCharactersMultiSelectorQuery.graphql.ts
/* @relayHash 810907b28009e7b7f66ce50f85c0c657 */
=======
>>>>>>> master:applications/medusa/src/__generated__/SearchCharactersQuery.graphql.ts

// @relayRequestID f2bf5e69d2c4096d1aa9b5bb0eb3ab27

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadSearchCharactersMultiSelectorQuery.graphql.ts
export type UploadSearchCharactersMultiSelectorQueryVariables = {
    name?: string | null | undefined;
};
export type UploadSearchCharactersMultiSelectorQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"UploadSearchCharactersMultiSelectorFragment">;
};
export type UploadSearchCharactersMultiSelectorQuery = {
    readonly response: UploadSearchCharactersMultiSelectorQueryResponse;
    readonly variables: UploadSearchCharactersMultiSelectorQueryVariables;
};



/*
query UploadSearchCharactersMultiSelectorQuery(
  $name: String
) {
  ...UploadSearchCharactersMultiSelectorFragment_2aiVTE
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

fragment UploadSearchCharactersMultiSelectorFragment_2aiVTE on Query {
  characters(first: 3, name: $name) {
    edges {
      node {
        id
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

=======
export type SearchCharactersQuery$variables = {
  name?: string | null;
};
export type SearchCharactersQueryVariables = SearchCharactersQuery$variables;
export type SearchCharactersQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SearchCharactersFragment">;
};
export type SearchCharactersQueryResponse = SearchCharactersQuery$data;
export type SearchCharactersQuery = {
  variables: SearchCharactersQueryVariables;
  response: SearchCharactersQuery$data;
};

>>>>>>> master:applications/medusa/src/__generated__/SearchCharactersQuery.graphql.ts
const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  }
],
v1 = {
  "kind": "Variable",
  "name": "name",
  "variableName": "name"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
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
    "name": "UploadSearchCharactersMultiSelectorQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "UploadSearchCharactersMultiSelectorFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UploadSearchCharactersMultiSelectorQuery",
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
          "name"
        ],
        "handle": "connection",
        "key": "UploadSearchCharactersMultiSelector_characters",
        "kind": "LinkedHandle",
        "name": "characters"
      }
    ]
  },
  "params": {
    "id": "810907b28009e7b7f66ce50f85c0c657",
    "metadata": {},
    "name": "UploadSearchCharactersMultiSelectorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadSearchCharactersMultiSelectorQuery.graphql.ts
(node as any).hash = '5deeba0856161292365ad950f891dcbb';
=======

(node as any).hash = "7e0729de03e5cec1277e9e9bb5555859";

>>>>>>> master:applications/medusa/src/__generated__/SearchCharactersQuery.graphql.ts
export default node;
