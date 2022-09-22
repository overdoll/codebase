/**
 * @generated SignedSource<<cb37e2097b4f281f53daf9a6b083a3e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewSeriesTileHomeFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PreviewSeriesFragment" | "SeriesLinkTileFragment">;
  readonly " $fragmentType": "PreviewSeriesTileHomeFragment";
};
export type PreviewSeriesTileHomeFragment$key = {
  readonly " $data"?: PreviewSeriesTileHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewSeriesTileHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewSeriesTileHomeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PreviewSeriesFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SeriesLinkTileFragment"
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "318b0796c106fa203fd7365f9ed248ed";

export default node;
