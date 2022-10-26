/**
 * @generated SignedSource<<1b62c1f74e63327f9d308e9d3e3a87b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollPublicClubPostsAccountFragment">;
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
      "name": "ScrollPublicClubPostsAccountFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "caf82a77ba92cafd966cdf30fd5041bb";

export default node;
