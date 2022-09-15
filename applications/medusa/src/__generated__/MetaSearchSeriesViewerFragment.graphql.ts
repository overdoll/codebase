/**
 * @generated SignedSource<<b357aa11b2cb1528949628438753e74f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaSearchSeriesViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchSeriesViewerFragment">;
  readonly " $fragmentType": "MetaSearchSeriesViewerFragment";
};
export type MetaSearchSeriesViewerFragment$key = {
  readonly " $data"?: MetaSearchSeriesViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaSearchSeriesViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaSearchSeriesViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerSearchSeriesViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "06e3ac306db4f6cea0d127e973c1f218";

export default node;
