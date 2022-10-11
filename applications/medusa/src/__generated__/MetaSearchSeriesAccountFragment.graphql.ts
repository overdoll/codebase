/**
 * @generated SignedSource<<7e0774c7c0f7ca1d80b2328ab0745dd6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaSearchSeriesAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchSeriesAccountFragment">;
  readonly " $fragmentType": "MetaSearchSeriesAccountFragment";
};
export type MetaSearchSeriesAccountFragment$key = {
  readonly " $data"?: MetaSearchSeriesAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaSearchSeriesAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaSearchSeriesAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerSearchSeriesAccountFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "9895afb8a427a51f5acfd5230ab3b47a";

export default node;
