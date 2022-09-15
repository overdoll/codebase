/**
 * @generated SignedSource<<f3cbe7b8c24977e3fea98244e1e57dcf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerBrowseViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerBrowseViewerFragment" | "ScrollBrowseViewerFragment">;
  readonly " $fragmentType": "ContainerBrowseViewerFragment";
};
export type ContainerBrowseViewerFragment$key = {
  readonly " $data"?: ContainerBrowseViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerBrowseViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerBrowseViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerBrowseViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollBrowseViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "2050fdf2d07ca09a1abb2dc70fee01d0";

export default node;
