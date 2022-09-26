/**
 * @generated SignedSource<<adfed85e302955b64ead78959ab959f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategorySmallBannerFragment$data = {
  readonly bannerMedia: {
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"ThumbnailMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "CategorySmallBannerFragment";
};
export type CategorySmallBannerFragment$key = {
  readonly " $data"?: CategorySmallBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CategorySmallBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategorySmallBannerFragment",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ThumbnailMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "dcb4c3866cad0a964c8a42457489ca7e";

export default node;
