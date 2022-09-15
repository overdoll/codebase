/**
 * @generated SignedSource<<1792b38f4c3288aefc8429f2122e3e06>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerSearchCategoryFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HeaderSearchCategoryFragment" | "ScrollSearchCategoryFragment">;
  readonly " $fragmentType": "ContainerSearchCategoryFragment";
};
export type ContainerSearchCategoryFragment$key = {
  readonly " $data"?: ContainerSearchCategoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchCategoryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerSearchCategoryFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HeaderSearchCategoryFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollSearchCategoryFragment"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "73635f05ed40afe024a8afb1a9fac364";

export default node;
