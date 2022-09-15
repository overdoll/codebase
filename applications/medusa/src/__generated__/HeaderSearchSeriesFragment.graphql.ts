/**
 * @generated SignedSource<<0ee7f682c4b8f665c479f9cf220bbdfa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderSearchSeriesFragment$data = {
  readonly title: string;
  readonly totalLikes: number;
  readonly totalPosts: number;
  readonly " $fragmentSpreads": FragmentRefs<"SearchSeriesCopyLinkButtonFragment" | "SearchSeriesRecommendationsFragment" | "SearchSeriesShareDiscordButtonFragment" | "SearchSeriesShareRedditButtonFragment" | "SearchSeriesShareTwitterButtonFragment">;
  readonly " $fragmentType": "HeaderSearchSeriesFragment";
};
export type HeaderSearchSeriesFragment$key = {
  readonly " $data"?: HeaderSearchSeriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderSearchSeriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderSearchSeriesFragment",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchSeriesRecommendationsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchSeriesCopyLinkButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchSeriesShareDiscordButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchSeriesShareRedditButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchSeriesShareTwitterButtonFragment"
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "d4a8e58676b3ab6e9809f85a380a86bf";

export default node;
