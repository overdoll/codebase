/**
 * @generated SignedSource<<2f5d5f551e29eb437fcd1e05e54fbd1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CharacterBannerFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"ThumbnailMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "CharacterBannerFragment";
};
export type CharacterBannerFragment$key = {
  readonly " $data"?: CharacterBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterBannerFragment",
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
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "fec5b3b6413cc4923124fde854c8b3a1";

export default node;
