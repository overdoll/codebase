/**
 * @generated SignedSource<<261c0d96cccc6fedda3f019177156621>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaBrowseViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerBrowseViewerFragment">;
  readonly " $fragmentType": "MetaBrowseViewerFragment";
};
export type MetaBrowseViewerFragment$key = {
  readonly " $data"?: MetaBrowseViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaBrowseViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaBrowseViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerBrowseViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "cd136ea6e152654591f2c1fe4bd82409";

export default node;
