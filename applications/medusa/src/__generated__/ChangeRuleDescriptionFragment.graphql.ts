/**
 * @generated SignedSource<<d2166155bc2308ff2fece9691f3e79ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeRuleDescriptionFragment$data = {
  readonly description: string;
  readonly descriptionTranslations: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleDescriptionFormFragment">;
  readonly " $fragmentType": "ChangeRuleDescriptionFragment";
};
export type ChangeRuleDescriptionFragment = ChangeRuleDescriptionFragment$data;
export type ChangeRuleDescriptionFragment$key = {
  readonly " $data"?: ChangeRuleDescriptionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleDescriptionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeRuleDescriptionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Translation",
      "kind": "LinkedField",
      "name": "descriptionTranslations",
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
      "name": "ChangeRuleDescriptionFormFragment"
    }
  ],
  "type": "Rule",
  "abstractKey": null
};

(node as any).hash = "e2b3909b163281ca8a0e9fca27e3ff25";

export default node;
