/**
 * @generated SignedSource<<c43e3f42f9d0ace66cb160102902150a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollPublicClubPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullClubPostViewerFragment">;
  readonly " $fragmentType": "ScrollPublicClubPostsViewerFragment";
};
export type ScrollPublicClubPostsViewerFragment$key = {
  readonly " $data"?: ScrollPublicClubPostsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollPublicClubPostsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollPublicClubPostsViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullClubPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "c284c91121e46502ec68ad5e25f0e009";

export default node;
