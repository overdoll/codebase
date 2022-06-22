/**
 * @generated SignedSource<<cafbab3226c3aa54e16ef098b05a3eda>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeAudienceTitleFragment$data = {
  readonly title: string;
  readonly titleTranslations: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"TranslationSnippetFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceTitleFormFragment">;
  readonly " $fragmentType": "ChangeAudienceTitleFragment";
};
export type ChangeAudienceTitleFragment$key = {
  readonly " $data"?: ChangeAudienceTitleFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceTitleFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeAudienceTitleFragment",
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
      "name": "ChangeAudienceTitleFormFragment"
    }
  ],
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "046ca43542b4eeb2360b63ecfd694a0e";

export default node;
