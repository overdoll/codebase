/**
 * @generated SignedSource<<0e999798273eb4540ae9a93d4bc3e988>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeTopicTitleFragment$data = {
  readonly title: string;
  readonly titleTranslations: ReadonlyArray<{
    readonly text: string;
    readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicTitleFormFragment">;
  readonly " $fragmentType": "ChangeTopicTitleFragment";
};
export type ChangeTopicTitleFragment$key = {
  readonly " $data"?: ChangeTopicTitleFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicTitleFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeTopicTitleFragment",
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
      "name": "ChangeTopicTitleFormFragment"
    }
  ],
  "type": "Topic",
  "abstractKey": null
};

(node as any).hash = "c6af7cfc56999048b98013762d8b45bf";

export default node;
