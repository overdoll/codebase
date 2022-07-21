/**
 * @generated SignedSource<<5999938d4407c4b128ad49097792a69a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullSimplePostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsViewerFragment" | "PostGalleryPublicSimpleViewerFragment" | "PostHeaderViewerFragment">;
  readonly " $fragmentType": "FullSimplePostViewerFragment";
};
export type FullSimplePostViewerFragment$key = {
  readonly " $data"?: FullSimplePostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullSimplePostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderViewerFragment"
    },
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

(node as any).hash = "2d4c5e84822d2ab57241ca1355607a54";

export default node;
