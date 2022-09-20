/**
 * @generated SignedSource<<8569a9bda33d896c7f4060ab1d11c48c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPreviewCharactersFragment$data = {
  readonly characters: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"CharacterLinkTileFragment" | "PreviewCharacterFragment">;
  }>;
  readonly " $fragmentType": "PostPreviewCharactersFragment";
};
export type PostPreviewCharactersFragment$key = {
  readonly " $data"?: PostPreviewCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewCharactersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPreviewCharactersFragment",
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
          "name": "PreviewCharacterFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CharacterLinkTileFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "41717be94f8ad0291db40bebb6be9e84";

export default node;
