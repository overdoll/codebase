/**
 * @generated SignedSource<<91960c5f377beeea82585034b388d454>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchResultsSeriesFragment$data = {
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesTileOverlayFragment">;
  readonly " $fragmentType": "SearchResultsSeriesFragment";
};
export type SearchResultsSeriesFragment$key = {
  readonly " $data"?: SearchResultsSeriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchResultsSeriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchResultsSeriesFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SeriesTileOverlayFragment"
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "838798c224b05b5920cf8a1a074d35e5";

export default node;
