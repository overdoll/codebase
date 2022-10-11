/**
 * @generated SignedSource<<db421c032bf0b4b9d4375fdd3d50cb96>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerSearchSeriesAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollSearchSeriesAccountFragment">;
  readonly " $fragmentType": "ContainerSearchSeriesAccountFragment";
};
export type ContainerSearchSeriesAccountFragment$key = {
  readonly " $data"?: ContainerSearchSeriesAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchSeriesAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerSearchSeriesAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollSearchSeriesAccountFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "12790f84e330dc038e8e6cd30f5494a2";

export default node;
