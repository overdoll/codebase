/**
 * @generated SignedSource<<e2fd66a3bb3cb517607d9e35d29f1a5c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerRandomViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerRandomViewerFragment" | "ScrollRandomViewerFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerRandomViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "486d772e473748b56ce95ba430299649";

export default node;
