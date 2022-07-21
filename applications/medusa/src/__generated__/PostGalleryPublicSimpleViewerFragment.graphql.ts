/**
 * @generated SignedSource<<d0d532cd2051903fb0d221789900de7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostGalleryPublicSimpleViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentViewerFragment">;
  readonly " $fragmentType": "PostGalleryPublicSimpleViewerFragment";
};
export type PostGalleryPublicSimpleViewerFragment$key = {
  readonly " $data"?: PostGalleryPublicSimpleViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicSimpleViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostGalleryPublicSimpleViewerFragment",
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

(node as any).hash = "5c3ec08e88330c964220b6af57104983";

export default node;
