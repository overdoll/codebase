/**
 * @generated SignedSource<<17c597a3d712c78d1e04b5e753eea7b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewSeriesFragment$data = {
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesSmallBannerFragment">;
  readonly " $fragmentType": "PreviewSeriesFragment";
};
export type PreviewSeriesFragment$key = {
  readonly " $data"?: PreviewSeriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewSeriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewSeriesFragment",
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
      "name": "SeriesSmallBannerFragment"
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "ecb5fd59a45163ab9771267164242185";

export default node;
