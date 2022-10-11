/**
 * @generated SignedSource<<0e2900fffd53f5c010a13f40a99948cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerSearchCategoryAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollSearchCategoryAccountFragment">;
  readonly " $fragmentType": "ContainerSearchCategoryAccountFragment";
};
export type ContainerSearchCategoryAccountFragment$key = {
  readonly " $data"?: ContainerSearchCategoryAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchCategoryAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerSearchCategoryAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollSearchCategoryAccountFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "26b6b849766934f2c68c959b8c7d3d82";

export default node;
