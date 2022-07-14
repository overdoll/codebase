/**
 * @generated SignedSource<<3f1a29e59164806c917f78c83ca07174>>
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

(node as any).hash = "5b5dda50f7a19ca6cc3b154bac06bc53";

export default node;
