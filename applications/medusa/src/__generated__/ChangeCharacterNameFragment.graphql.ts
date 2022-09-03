/**
 * @generated SignedSource<<535bea6cd89050ef86d4f85a640339b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCharacterNameFragment$data = {
  readonly name: string;
  readonly nameTranslations: ReadonlyArray<{
    readonly text: string;
    readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCharacterNameFormFragment">;
  readonly " $fragmentType": "ChangeCharacterNameFragment";
};
export type ChangeCharacterNameFragment$key = {
  readonly " $data"?: ChangeCharacterNameFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCharacterNameFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCharacterNameFragment",
  "selections": [
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
      "concreteType": "Translation",
      "kind": "LinkedField",
      "name": "nameTranslations",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "TranslationSnippetFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeCharacterNameFormFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "4f43f48df4cae7db7e8146099cb728cc";

export default node;
