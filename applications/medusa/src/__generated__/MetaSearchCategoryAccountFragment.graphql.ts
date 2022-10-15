/**
 * @generated SignedSource<<47c8600b0e1d6e96a7f595c4f5175f1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaSearchCategoryAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchCategoryAccountFragment">;
  readonly " $fragmentType": "MetaSearchCategoryAccountFragment";
};
export type MetaSearchCategoryAccountFragment$key = {
  readonly " $data"?: MetaSearchCategoryAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaSearchCategoryAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaSearchCategoryAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerSearchCategoryAccountFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "fc6d54f6e1776e9b75cedbd723a98a65";

export default node;
