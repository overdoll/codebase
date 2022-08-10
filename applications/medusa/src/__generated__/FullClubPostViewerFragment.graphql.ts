/**
 * @generated SignedSource<<418732107fa1f70db618bc896835c4c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullClubPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsViewerFragment" | "PostGalleryPublicSimpleViewerFragment">;
  readonly " $fragmentType": "FullClubPostViewerFragment";
};
export type FullClubPostViewerFragment$key = {
  readonly " $data"?: FullClubPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullClubPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullClubPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicSimpleViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostFooterButtonsViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "1bf0944103cd028560e818f9605cb1d9";

export default node;
