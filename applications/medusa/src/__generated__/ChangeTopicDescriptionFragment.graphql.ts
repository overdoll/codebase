/**
 * @generated SignedSource<<3ec8259dd5f1fd5ab1bc3e91ed12ff84>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeTopicDescriptionFragment$data = {
  readonly description: string;
  readonly descriptionTranslations: ReadonlyArray<{
    readonly text: string;
    readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicDescriptionFormFragment">;
  readonly " $fragmentType": "ChangeTopicDescriptionFragment";
};
export type ChangeTopicDescriptionFragment$key = {
  readonly " $data"?: ChangeTopicDescriptionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicDescriptionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeTopicDescriptionFragment",
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
      "name": "ChangeTopicDescriptionFormFragment"
    }
  ],
  "type": "Topic",
  "abstractKey": null
};

(node as any).hash = "8e1b584dd24d0884f002bfef02a722e3";

export default node;
