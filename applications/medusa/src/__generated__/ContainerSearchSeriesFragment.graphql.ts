/**
 * @generated SignedSource<<c248e101f75313012c83cf1d1dfcee9f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerSearchSeriesFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HeaderSearchSeriesFragment" | "ScrollSearchSeriesFragment">;
  readonly " $fragmentType": "ContainerSearchSeriesFragment";
};
export type ContainerSearchSeriesFragment$key = {
  readonly " $data"?: ContainerSearchSeriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchSeriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerSearchSeriesFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HeaderSearchSeriesFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollSearchSeriesFragment"
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "874ae627a676cbdade711bca006f70c6";

export default node;
