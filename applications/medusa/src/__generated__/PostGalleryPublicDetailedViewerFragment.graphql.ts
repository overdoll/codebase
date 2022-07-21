/**
 * @generated SignedSource<<19cb07399b76bf54e8eaadfb929043ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostGalleryPublicDetailedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentViewerFragment">;
  readonly " $fragmentType": "PostGalleryPublicDetailedViewerFragment";
};
export type PostGalleryPublicDetailedViewerFragment$key = {
  readonly " $data"?: PostGalleryPublicDetailedViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicDetailedViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostGalleryPublicDetailedViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostSupporterContentViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "e08bcbcf58605eb6fa3b0d883879a360";

export default node;
