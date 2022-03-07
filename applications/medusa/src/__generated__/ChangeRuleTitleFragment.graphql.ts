/**
 * @generated SignedSource<<58476cb427c43b32ccdfb6a592d2a86b>>
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
    readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleTitleFormFragment">;
  readonly " $fragmentType": "ChangeRuleTitleFragment";
};
export type ChangeRuleTitleFragment = ChangeRuleTitleFragment$data;
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

(node as any).hash = "078880917627bf4de6b6587e37ba1cb7";

export default node;
