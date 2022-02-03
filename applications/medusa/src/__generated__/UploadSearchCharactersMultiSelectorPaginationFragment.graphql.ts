/**
 * @generated SignedSource<<ce55cc2188b3b9f6b498561437627f80>>
 * @relayHash ed26bce4074ffd60249bab8dcbe5d01b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadSearchCharactersMultiSelectorPaginationFragment.graphql.ts
/* @relayHash f851de5365ed6eab7eef8db13fe14428 */
=======
>>>>>>> master:applications/medusa/src/__generated__/SearchCharactersPaginationFragment.graphql.ts

// @relayRequestID ed26bce4074ffd60249bab8dcbe5d01b

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadSearchCharactersMultiSelectorPaginationFragment.graphql.ts
export type UploadSearchCharactersMultiSelectorPaginationFragmentVariables = {
    after?: string | null | undefined;
    first?: number | null | undefined;
    name?: string | null | undefined;
};
export type UploadSearchCharactersMultiSelectorPaginationFragmentResponse = {
    readonly " $fragmentRefs": FragmentRefs<"UploadSearchCharactersMultiSelectorFragment">;
};
export type UploadSearchCharactersMultiSelectorPaginationFragment = {
    readonly response: UploadSearchCharactersMultiSelectorPaginationFragmentResponse;
    readonly variables: UploadSearchCharactersMultiSelectorPaginationFragmentVariables;
};



/*
query UploadSearchCharactersMultiSelectorPaginationFragment(
  $after: String
  $first: Int = 3
  $name: String
) {
  ...UploadSearchCharactersMultiSelectorFragment_3cTRis
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

fragment UploadSearchCharactersMultiSelectorFragment_3cTRis on Query {
  characters(first: $first, after: $after, name: $name) {
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
export type SearchCharactersPaginationFragment$variables = {
  after?: string | null;
  first?: number | null;
  name?: string | null;
};
export type SearchCharactersPaginationFragmentVariables = SearchCharactersPaginationFragment$variables;
export type SearchCharactersPaginationFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SearchCharactersFragment">;
};
export type SearchCharactersPaginationFragmentResponse = SearchCharactersPaginationFragment$data;
export type SearchCharactersPaginationFragment = {
  variables: SearchCharactersPaginationFragmentVariables;
  response: SearchCharactersPaginationFragment$data;
};

>>>>>>> master:applications/medusa/src/__generated__/SearchCharactersPaginationFragment.graphql.ts
const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 3,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
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
    "name": "name",
    "variableName": "name"
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
    "name": "UploadSearchCharactersMultiSelectorPaginationFragment",
    "selections": [
      {
        "args": (v1/*: any*/),
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
    "name": "UploadSearchCharactersMultiSelectorPaginationFragment",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
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
                      (v2/*: any*/)
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
    "id": "f851de5365ed6eab7eef8db13fe14428",
    "metadata": {},
    "name": "UploadSearchCharactersMultiSelectorPaginationFragment",
    "operationKind": "query",
    "text": null
  }
};
})();
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadSearchCharactersMultiSelectorPaginationFragment.graphql.ts
(node as any).hash = 'a2d028077c4fcfd29b0f786eb066d549';
=======

(node as any).hash = "ccffac4ef48b0e0365b2f9ab9e150404";

>>>>>>> master:applications/medusa/src/__generated__/SearchCharactersPaginationFragment.graphql.ts
export default node;
