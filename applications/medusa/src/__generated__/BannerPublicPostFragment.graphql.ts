/**
 * @generated SignedSource<<228a9580f7bd37c528962aa23319b6b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BannerPublicPostFragment$data = {
  readonly state: PostState;
  readonly " $fragmentType": "BannerPublicPostFragment";
};
export type BannerPublicPostFragment$key = {
  readonly " $data"?: BannerPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerPublicPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "e461ca876e41c4fe2d742afe07c66368";

export default node;
