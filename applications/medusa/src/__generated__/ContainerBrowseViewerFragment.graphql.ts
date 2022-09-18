/**
 * @generated SignedSource<<b52f51395090e2fe880584a50efc8c8a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerBrowseViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerBrowseViewerFragment">;
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "fff25b6c3d00b29bb07f239f6ce1abc2";

export default node;
