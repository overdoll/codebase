/**
 * @generated SignedSource<<b38641f40c3f64fd30c3068adfabe7ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerHomeViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerHomeViewerFragment" | "PostsHomeViewerFragment">;
  readonly " $fragmentType": "ContainerHomeViewerFragment";
};
export type ContainerHomeViewerFragment$key = {
  readonly " $data"?: ContainerHomeViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerHomeViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerHomeViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerHomeViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostsHomeViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "bdd7d0f2ec0231a4bdd283608d588b4f";

export default node;
