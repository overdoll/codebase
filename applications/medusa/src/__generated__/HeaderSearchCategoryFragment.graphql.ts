/**
 * @generated SignedSource<<26132abc9266d7e76a091c822c8f84e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderSearchCategoryFragment$data = {
  readonly title: string;
  readonly totalLikes: number;
  readonly totalPosts: number;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCategoryCopyLinkButtonFragment" | "SearchCategoryShareDiscordButtonFragment" | "SearchCategoryShareRedditButtonFragment" | "SearchCategoryShareTwitterButtonFragment">;
  readonly " $fragmentType": "HeaderSearchCategoryFragment";
};
export type HeaderSearchCategoryFragment$key = {
  readonly " $data"?: HeaderSearchCategoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderSearchCategoryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderSearchCategoryFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalPosts",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalLikes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCategoryCopyLinkButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCategoryShareDiscordButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCategoryShareRedditButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCategoryShareTwitterButtonFragment"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "ba8543913a6b2e8d6b237f53342790f2";

export default node;
