/**
 * @generated SignedSource<<6d6889e8ca97b3960bd3de46d89b1c2e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TopicBannerFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"ThumbnailMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "TopicBannerFragment";
};
export type TopicBannerFragment$key = {
  readonly " $data"?: TopicBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TopicBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TopicBannerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "bannerMedia",
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
  "type": "Topic",
  "abstractKey": null
};

(node as any).hash = "b1a46e2ff20aaca1061042808154a3d8";

export default node;
