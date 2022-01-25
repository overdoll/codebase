/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchCharactersGeneralFragment = {
    readonly characters: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly slug: string;
                readonly name: string;
                readonly " $fragmentRefs": FragmentRefs<"CharacterTileOverlayFragment">;
            };
        }>;
    };
    readonly " $refType": "SearchCharactersGeneralFragment";
};
export type SearchCharactersGeneralFragment$data = SearchCharactersGeneralFragment;
export type SearchCharactersGeneralFragment$key = {
    readonly " $data"?: SearchCharactersGeneralFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SearchCharactersGeneralFragment">;
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
      "kind": "RootArgument",
      "name": "charactersSeriesSlug"
    },
    {
      "kind": "RootArgument",
      "name": "charactersSlugs"
    },
    {
      "kind": "RootArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "name"
    },
    {
      "kind": "RootArgument",
      "name": "search"
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
      "operation": require('./SearchCharactersGeneralPaginationFragment.graphql.ts')
    }
  },
  "name": "SearchCharactersGeneralFragment",
  "selections": [
    {
      "alias": "characters",
      "args": [
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
      "concreteType": "CharacterConnection",
      "kind": "LinkedField",
      "name": "__SearchCharactersGeneral_characters_connection",
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
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CharacterTileOverlayFragment"
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
(node as any).hash = '2ef655808968ca4511715bdd08285062';
export default node;
