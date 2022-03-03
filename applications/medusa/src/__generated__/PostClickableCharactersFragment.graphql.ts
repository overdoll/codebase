/**
 * @generated SignedSource<<78eb49c4d5ce30557a2c2c9be8f01879>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostClickableCharactersFragment$data = {
  readonly characters: ReadonlyArray<{
    readonly thumbnail: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"ClickSeriesFragment" | "ClickCharacterFragment">;
  }>;
  readonly " $fragmentType": "PostClickableCharactersFragment";
};
export type PostClickableCharactersFragment = PostClickableCharactersFragment$data;
export type PostClickableCharactersFragment$key = {
  readonly " $data"?: PostClickableCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostClickableCharactersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostClickableCharactersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClickSeriesFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClickCharacterFragment"
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "ResourceIconFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "1f803202453986e13385fefdb39fe893";

export default node;
