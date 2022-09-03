/**
 * @generated SignedSource<<0854b28d3c12aac56d6041aa554e19f4>>
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
    readonly text: string;
    readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleDescriptionFormFragment">;
  readonly " $fragmentType": "ChangeRuleDescriptionFragment";
};
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
      "name": "ChangeRuleDescriptionFormFragment"
    }
  ],
  "type": "Rule",
  "abstractKey": null
};

(node as any).hash = "5eb543eab904d2547d856e7fd9c71390";

export default node;
