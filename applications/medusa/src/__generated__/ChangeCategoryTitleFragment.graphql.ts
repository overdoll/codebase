/**
 * @generated SignedSource<<36dce87a7935fa5b6bad984ea2664fd3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCategoryTitleFragment$data = {
  readonly title: string;
  readonly titleTranslations: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCategoryTitleFormFragment">;
  readonly " $fragmentType": "ChangeCategoryTitleFragment";
};
export type ChangeCategoryTitleFragment = ChangeCategoryTitleFragment$data;
export type ChangeCategoryTitleFragment$key = {
  readonly " $data"?: ChangeCategoryTitleFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCategoryTitleFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCategoryTitleFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Translation",
      "kind": "LinkedField",
      "name": "titleTranslations",
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
      "name": "ChangeCategoryTitleFormFragment"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "aa0d23a8e4b04cd4a2699ee371f786ef";

export default node;
