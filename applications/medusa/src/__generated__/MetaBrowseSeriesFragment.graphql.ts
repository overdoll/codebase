/**
 * @generated SignedSource<<f63bc845f3d5d1ad6063855eea4bc063>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaBrowseSeriesFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerBrowseSeriesFragment">;
  readonly " $fragmentType": "MetaBrowseSeriesFragment";
};
export type MetaBrowseSeriesFragment$key = {
  readonly " $data"?: MetaBrowseSeriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaBrowseSeriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaBrowseSeriesFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerBrowseSeriesFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "64c0ae3281e5c0a3a88072325d292381";

export default node;
