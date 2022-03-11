/**
 * @generated SignedSource<<3f0ddd681dd4e5b9a94e046e9a33ed03>>
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
    readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCancellationReasonTitleFormFragment">;
  readonly " $fragmentType": "ChangeCancellationReasonTitleFragment";
};
export type ChangeCancellationReasonTitleFragment = ChangeCancellationReasonTitleFragment$data;
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

(node as any).hash = "fd8396ab23f0c00e1d878ade4de68b64";

export default node;
