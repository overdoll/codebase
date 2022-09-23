/**
 * @generated SignedSource<<efb4cf6c0ca115aee87e3ff5d9c713d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RawThumbnailCarouselItemFragment$data = {
  readonly __typename: string;
  readonly " $fragmentSpreads": FragmentRefs<"RawThumbnailMediaFragment">;
  readonly " $fragmentType": "RawThumbnailCarouselItemFragment";
};
export type RawThumbnailCarouselItemFragment$key = {
  readonly " $data"?: RawThumbnailCarouselItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RawThumbnailCarouselItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RawThumbnailCarouselItemFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RawThumbnailMediaFragment"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "type": "Media",
  "abstractKey": "__isMedia"
};

(node as any).hash = "025b26eee03ee83ceea27473a01d1c5c";

export default node;
