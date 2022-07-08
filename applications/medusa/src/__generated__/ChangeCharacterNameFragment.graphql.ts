/**
 * @generated SignedSource<<8215d7590b30b944523995588af35ec2>>
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

(node as any).hash = "0129559edbe4c2ee1d3c60f4d3430f1d";

export default node;
