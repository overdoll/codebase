/**
 * @generated SignedSource<<2bd1638ab703bed81ade66b355aecafa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaBrowseFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerBrowseFragment">;
  readonly " $fragmentType": "MetaBrowseFragment";
};
export type MetaBrowseFragment$key = {
  readonly " $data"?: MetaBrowseFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaBrowseFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaBrowseFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerBrowseFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "3c21b436ff103d27326c99fccccc1903";

export default node;
