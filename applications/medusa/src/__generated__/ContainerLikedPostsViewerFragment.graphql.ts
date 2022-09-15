/**
 * @generated SignedSource<<3bb7151e65fd83b17ef1636609a12c7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerLikedPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerLikedPostsViewerFragment" | "ScrollLikedPostsFragment">;
  readonly " $fragmentType": "ContainerLikedPostsViewerFragment";
};
export type ContainerLikedPostsViewerFragment$key = {
  readonly " $data"?: ContainerLikedPostsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerLikedPostsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerLikedPostsViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerLikedPostsViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollLikedPostsFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "249dfd1bb4c7e580e7254aeec53e6d9f";

export default node;
