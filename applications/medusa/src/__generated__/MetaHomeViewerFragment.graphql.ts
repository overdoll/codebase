/**
 * @generated SignedSource<<fff015c6fd7e08ae01ce84658f3d98d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaHomeViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerHomeViewerFragment">;
  readonly " $fragmentType": "MetaHomeViewerFragment";
};
export type MetaHomeViewerFragment$key = {
  readonly " $data"?: MetaHomeViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaHomeViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaHomeViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerHomeViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "b0be2799b6187bb3bbb2663c57351ab6";

export default node;
