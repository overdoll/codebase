/**
 * @generated SignedSource<<6fb43e475f23a4d069b831ee76bc8480>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerNewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollNewFragment">;
  readonly " $fragmentType": "ContainerNewFragment";
};
export type ContainerNewFragment$key = {
  readonly " $data"?: ContainerNewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerNewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerNewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollNewFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "549649d3d6cbe078d9bc127d4e49010d";

export default node;
