/**
 * @generated SignedSource<<bb0a756d720991d8351ead34b2d63c9b>>
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
  readonly " $fragmentSpreads": FragmentRefs<"CategoryBannerFragment" | "SearchCategoryCopyLinkButtonFragment" | "SearchCategoryShareDiscordButtonFragment" | "SearchCategoryShareRedditButtonFragment" | "SearchCategoryShareTwitterButtonFragment">;
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
      "name": "title",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CategoryBannerFragment"
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

(node as any).hash = "82fc9b713bd8b9f01fc312210c06e4ec";

export default node;
