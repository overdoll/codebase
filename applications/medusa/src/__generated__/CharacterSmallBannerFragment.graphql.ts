/**
 * @generated SignedSource<<fcb84929cc7b19493693069c6c8ec92b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CharacterSmallBannerFragment$data = {
  readonly bannerMedia: {
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"ThumbnailMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "CharacterSmallBannerFragment";
};
export type CharacterSmallBannerFragment$key = {
  readonly " $data"?: CharacterSmallBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterSmallBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterSmallBannerFragment",
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
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "a8cb3e7d8e9adf00ef56ca1eac1efc2c";

export default node;
