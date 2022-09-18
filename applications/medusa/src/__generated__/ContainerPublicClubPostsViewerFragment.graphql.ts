/**
 * @generated SignedSource<<96028e821078e7845bd2ecc7c62a74f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubPostsViewerFragment">;
  readonly " $fragmentType": "ContainerPublicClubPostsViewerFragment";
};
export type ContainerPublicClubPostsViewerFragment$key = {
  readonly " $data"?: ContainerPublicClubPostsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubPostsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicClubPostsViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerPublicClubPostsViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "49767be43f62551bcdeb8c1df79a1805";

export default node;
