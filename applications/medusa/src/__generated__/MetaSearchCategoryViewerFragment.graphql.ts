/**
 * @generated SignedSource<<8c3aa7dca25dcc768bfa330a86516c48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaSearchCategoryViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchCategoryViewerFragment">;
  readonly " $fragmentType": "MetaSearchCategoryViewerFragment";
};
export type MetaSearchCategoryViewerFragment$key = {
  readonly " $data"?: MetaSearchCategoryViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaSearchCategoryViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaSearchCategoryViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerSearchCategoryViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "51b446938b0249cb1c37efdfbc3e56e7";

export default node;
