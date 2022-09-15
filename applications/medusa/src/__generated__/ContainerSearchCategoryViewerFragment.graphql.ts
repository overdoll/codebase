/**
 * @generated SignedSource<<b499fcf9249aa1053662c063a791c99c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerSearchCategoryViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollSearchCategoryViewerFragment">;
  readonly " $fragmentType": "ContainerSearchCategoryViewerFragment";
};
export type ContainerSearchCategoryViewerFragment$key = {
  readonly " $data"?: ContainerSearchCategoryViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchCategoryViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerSearchCategoryViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollSearchCategoryViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "37d7593f910d0481400fdf46d627e33c";

export default node;
