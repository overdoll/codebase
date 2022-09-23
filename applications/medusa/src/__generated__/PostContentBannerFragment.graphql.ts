/**
 * @generated SignedSource<<ea172884b7b39a1588dc9e12a9475565>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContentBannerFragment$data = {
  readonly media: {
    readonly " $fragmentSpreads": FragmentRefs<"ThumbnailMediaFragment">;
  };
  readonly " $fragmentType": "PostContentBannerFragment";
};
export type PostContentBannerFragment$key = {
  readonly " $data"?: PostContentBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentBannerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "media",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ThumbnailMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "8fd93ca3f95a98753786a4b0732628e2";

export default node;
