/**
 * @generated SignedSource<<05e73483fa1ec9db749167f7c1079be5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadSearchCharactersMultiSelectorFragment.graphql.ts
export type UploadSearchCharactersMultiSelectorFragment = {
    readonly characters: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
                readonly " $fragmentRefs": FragmentRefs<"CharacterTileOverlayFragment">;
            };
        }>;
    };
    readonly " $refType": "UploadSearchCharactersMultiSelectorFragment";
};
export type UploadSearchCharactersMultiSelectorFragment$data = UploadSearchCharactersMultiSelectorFragment;
export type UploadSearchCharactersMultiSelectorFragment$key = {
    readonly " $data"?: UploadSearchCharactersMultiSelectorFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadSearchCharactersMultiSelectorFragment">;
=======
export type SearchCharactersFragment$data = {
  readonly characters: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly " $fragmentSpreads": FragmentRefs<"CharacterTileOverlayFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "SearchCharactersFragment";
};
export type SearchCharactersFragment = SearchCharactersFragment$data;
export type SearchCharactersFragment$key = {
  readonly " $data"?: SearchCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCharactersFragment">;
>>>>>>> master:applications/medusa/src/__generated__/SearchCharactersFragment.graphql.ts
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
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadSearchCharactersMultiSelectorFragment.graphql.ts
      "operation": require('./UploadSearchCharactersMultiSelectorPaginationFragment.graphql.ts')
=======
      "operation": require('./SearchCharactersPaginationFragment.graphql')
>>>>>>> master:applications/medusa/src/__generated__/SearchCharactersFragment.graphql.ts
    }
  },
  "name": "UploadSearchCharactersMultiSelectorFragment",
  "selections": [
    {
      "alias": "characters",
      "args": [
        {
          "kind": "Variable",
          "name": "name",
          "variableName": "name"
        }
      ],
      "concreteType": "CharacterConnection",
      "kind": "LinkedField",
      "name": "__UploadSearchCharactersMultiSelector_characters_connection",
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
                  "name": "name",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CharacterTileOverlayFragment"
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadSearchCharactersMultiSelectorFragment.graphql.ts
(node as any).hash = 'a2d028077c4fcfd29b0f786eb066d549';
=======

(node as any).hash = "ccffac4ef48b0e0365b2f9ab9e150404";

>>>>>>> master:applications/medusa/src/__generated__/SearchCharactersFragment.graphql.ts
export default node;
