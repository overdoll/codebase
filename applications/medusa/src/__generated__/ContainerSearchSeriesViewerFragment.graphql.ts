/**
 * @generated SignedSource<<c85d6d9bc90d0319e1f9d2c4bc68fe26>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerSearchSeriesViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollSearchSeriesViewerFragment">;
  readonly " $fragmentType": "ContainerSearchSeriesViewerFragment";
};
export type ContainerSearchSeriesViewerFragment$key = {
  readonly " $data"?: ContainerSearchSeriesViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchSeriesViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerSearchSeriesViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollSearchSeriesViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "d7e742924c94d20d6016bbf72058f5a4";

export default node;
