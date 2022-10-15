/**
 * @generated SignedSource<<54b7e46fd0d8bef538646099fe3d15cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerRandomViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollRandomViewerFragment">;
  readonly " $fragmentType": "ContainerRandomViewerFragment";
};
export type ContainerRandomViewerFragment$key = {
  readonly " $data"?: ContainerRandomViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerRandomViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerRandomViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollRandomViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "b04b82d57124a9ee23c8c80d1d09693e";

export default node;
