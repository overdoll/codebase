/**
 * @generated SignedSource<<f552095636dcb039a211dbaa1d17f434>>
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
    readonly " $fragmentSpreads": FragmentRefs<"BannerMediaFragment">;
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
          "name": "BannerMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Topic",
  "abstractKey": null
};

(node as any).hash = "c49e1177ab58720fe15841b13f5daba9";

export default node;
