/**
 * @generated SignedSource<<9c1f0fab5f08f810a6949026ed57313f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesBannerFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"BannerMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "SeriesBannerFragment";
};
export type SeriesBannerFragment$key = {
  readonly " $data"?: SeriesBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeriesBannerFragment",
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
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "43eac018c989ee5cc53ed612193ee24e";

export default node;
