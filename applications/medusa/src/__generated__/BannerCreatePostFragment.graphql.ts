/**
 * @generated SignedSource<<9ffa3b6c862c39f63654b1acb58a8c19>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BannerCreatePostFragment$data = {
  readonly state: PostState;
  readonly " $fragmentType": "BannerCreatePostFragment";
};
export type BannerCreatePostFragment$key = {
  readonly " $data"?: BannerCreatePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerCreatePostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerCreatePostFragment",
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

(node as any).hash = "d496d5feada095fb0b42b91ba3f7b57d";

export default node;
