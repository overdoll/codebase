/**
 * @generated SignedSource<<94bcd17df450730b794b3cfb8efddff6>>
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
  readonly " $fragmentSpreads": FragmentRefs<"SeriesThumbnailFragment">;
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
      "name": "SeriesThumbnailFragment"
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "e883e7f594e940a3106d79139f27247c";

export default node;
