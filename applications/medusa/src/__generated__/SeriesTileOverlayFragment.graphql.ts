/**
 * @generated SignedSource<<8804a049718ed8f932867f7c2e8c5c15>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesTileOverlayFragment$data = {
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesBannerFragment">;
  readonly " $fragmentType": "SeriesTileOverlayFragment";
};
export type SeriesTileOverlayFragment$key = {
  readonly " $data"?: SeriesTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeriesTileOverlayFragment",
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
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "9fa16a8abe994d660bb7063c77e8af3a";

export default node;
