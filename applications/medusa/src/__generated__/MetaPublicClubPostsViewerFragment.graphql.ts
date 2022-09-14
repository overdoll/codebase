/**
 * @generated SignedSource<<119f5456a2d7e4f0659d17c37d0bf928>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaPublicClubPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubPostsViewerFragment">;
  readonly " $fragmentType": "MetaPublicClubPostsViewerFragment";
};
export type MetaPublicClubPostsViewerFragment$key = {
  readonly " $data"?: MetaPublicClubPostsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaPublicClubPostsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaPublicClubPostsViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerPublicClubPostsViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "776aaa2b9a62aca63997de1624c87c25";

export default node;
