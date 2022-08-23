/**
 * @generated SignedSource<<41e8775b327b8c908afeebb896077824>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCategoryShareDiscordButtonFragment$data = {
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "SearchCategoryShareDiscordButtonFragment";
};
export type SearchCategoryShareDiscordButtonFragment$key = {
  readonly " $data"?: SearchCategoryShareDiscordButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCategoryShareDiscordButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchCategoryShareDiscordButtonFragment",
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
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "4510ff6a336347331b85f291e8010b46";

export default node;
