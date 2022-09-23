/**
 * @generated SignedSource<<b04a1d3d1e88f6b76d59b688d9eeb1c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaRandomFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerRandomFragment">;
  readonly " $fragmentType": "MetaRandomFragment";
};
export type MetaRandomFragment$key = {
  readonly " $data"?: MetaRandomFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaRandomFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaRandomFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerRandomFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "1676af36e3846cb2f7bfca05a87c070d";

export default node;
