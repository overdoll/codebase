/**
 * @generated SignedSource<<23a61fdede136dd5c1cf3b5616447ea0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TranslationSnippetFragment$data = {
  readonly text: string;
  readonly language: {
    readonly locale: string;
    readonly name: string;
  };
  readonly " $fragmentType": "TranslationSnippetFragment";
};
export type TranslationSnippetFragment = TranslationSnippetFragment$data;
export type TranslationSnippetFragment$key = {
  readonly " $data"?: TranslationSnippetFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TranslationSnippetFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Language",
      "kind": "LinkedField",
      "name": "language",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "locale",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Translation",
  "abstractKey": null
};

(node as any).hash = "82ef5b189b458f044b3716b521083414";

export default node;
