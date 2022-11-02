/**
 * @generated SignedSource<<08270a70e5217a770968e2b17a03ce49>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollBrowseCharactersFragment$data = {
  readonly characters: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"SearchResultsCharacterFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "ScrollBrowseCharactersFragment";
};
export type ScrollBrowseCharactersFragment$key = {
  readonly " $data"?: ScrollBrowseCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollBrowseCharactersFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "characters"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 24,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./ScrollBrowseCharactersPaginationQuery.graphql')
    }
  },
  "name": "ScrollBrowseCharactersFragment",
  "selections": [
    {
      "alias": "characters",
      "args": [
        {
          "kind": "Literal",
          "name": "excludeEmpty",
          "value": true
        }
      ],
      "concreteType": "CharacterConnection",
      "kind": "LinkedField",
      "name": "__ScrollBrowseCharacters_characters_connection",
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SearchResultsCharacterFragment"
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
      "storageKey": "__ScrollBrowseCharacters_characters_connection(excludeEmpty:true)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "05952aaa60cfab85aa8a0ec49cbb885d";

export default node;
