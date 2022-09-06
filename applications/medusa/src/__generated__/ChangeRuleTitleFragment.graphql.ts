/**
 * @generated SignedSource<<32524d8d2df482ddc3bfd2f8961149ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeRuleTitleFragment$data = {
  readonly title: string;
  readonly titleTranslations: ReadonlyArray<{
    readonly text: string;
    readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleTitleFormFragment">;
  readonly " $fragmentType": "ChangeRuleTitleFragment";
};
export type ChangeRuleTitleFragment$key = {
  readonly " $data"?: ChangeRuleTitleFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleTitleFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeRuleTitleFragment",
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
      "name": "ChangeRuleTitleFormFragment"
    }
  ],
  "type": "Rule",
  "abstractKey": null
};

(node as any).hash = "47d67c130a6ce23653cedbb9c1eb60bc";

export default node;
