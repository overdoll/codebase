/**
 * @generated SignedSource<<a8e3dc21016024e568912612565c666e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCancellationReasonTitleFragment$data = {
  readonly title: string;
  readonly titleTranslations: ReadonlyArray<{
    readonly text: string;
    readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCancellationReasonTitleFormFragment">;
  readonly " $fragmentType": "ChangeCancellationReasonTitleFragment";
};
export type ChangeCancellationReasonTitleFragment$key = {
  readonly " $data"?: ChangeCancellationReasonTitleFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCancellationReasonTitleFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCancellationReasonTitleFragment",
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
      "name": "ChangeCancellationReasonTitleFormFragment"
    }
  ],
  "type": "CancellationReason",
  "abstractKey": null
};

(node as any).hash = "d30c821f832299c0f0f64ae46e8a8317";

export default node;
