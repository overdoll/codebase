/**
 * @generated SignedSource<<3b86b43bf18f660c21cda7e39397322f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoryBannerFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"BannerMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "CategoryBannerFragment";
};
export type CategoryBannerFragment$key = {
  readonly " $data"?: CategoryBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CategoryBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryBannerFragment",
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
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "55a98093f87fbbdc9d3ab2f46fe77ae1";

export default node;
