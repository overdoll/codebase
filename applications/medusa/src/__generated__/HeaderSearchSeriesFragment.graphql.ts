/**
 * @generated SignedSource<<470ed56b4b643693953349f8e7eb63c2>>
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
  readonly " $fragmentSpreads": FragmentRefs<"SearchSeriesCopyLinkButtonFragment" | "SearchSeriesRecommendationsFragment" | "SearchSeriesShareDiscordButtonFragment" | "SearchSeriesShareRedditButtonFragment" | "SearchSeriesShareTwitterButtonFragment" | "SeriesBannerFragment">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "SeriesBannerFragment"
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

(node as any).hash = "96daece01610fd2f55baaa008606b44e";

export default node;
