/**
 * @generated SignedSource<<7ba4831ae749efefe194bc8e96f13ca1>>
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
    readonly " $fragmentSpreads": FragmentRefs<"ClickableCharacterFragment">;
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
          "name": "ClickableCharacterFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "fa69771c7bbaae98b4deac0a547adef7";

export default node;
