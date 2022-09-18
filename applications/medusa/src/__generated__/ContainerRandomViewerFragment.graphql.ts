/**
 * @generated SignedSource<<779207b167203e509d895721865f5669>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerRandomViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerRandomViewerFragment">;
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
      "name": "BannerRandomViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "d800bbfca66104af27b8c8ad6525fa1b";

export default node;
