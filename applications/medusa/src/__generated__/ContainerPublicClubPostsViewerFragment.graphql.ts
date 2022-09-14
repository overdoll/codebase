/**
 * @generated SignedSource<<3c54c8acf9324643bd632ec0fffec484>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubPostsViewerFragment" | "ScrollPublicClubPostsViewerFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollPublicClubPostsViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "8aa4ab7d9b99f613d4b391d9eafb5cc1";

export default node;
