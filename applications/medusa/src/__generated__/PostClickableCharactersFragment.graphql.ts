/**
 * @generated SignedSource<<9539cd8f6c10d14ad50eaf4ad0eed349>>
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
    readonly id: string;
    readonly thumbnail: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"ClickCharacterFragment" | "ClickSeriesFragment">;
  }>;
  readonly " $fragmentType": "PostClickableCharactersFragment";
};
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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

(node as any).hash = "b75efa8acb635c17757c30e622cd9195";

export default node;
