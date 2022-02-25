/**
 * @generated SignedSource<<a10add17d20ebdfeecb072ab0a570242>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeSeriesTitleFragment$data = {
  readonly title: string;
  readonly titleTranslations: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeSeriesTitleFormFragment">;
  readonly " $fragmentType": "ChangeSeriesTitleFragment";
};
export type ChangeSeriesTitleFragment = ChangeSeriesTitleFragment$data;
export type ChangeSeriesTitleFragment$key = {
  readonly " $data"?: ChangeSeriesTitleFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeSeriesTitleFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeSeriesTitleFragment",
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
      "name": "ChangeSeriesTitleFormFragment"
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "f6911a597c1b682406b17136b5580111";

export default node;
