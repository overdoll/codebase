/**
 * @generated SignedSource<<507324b34206c4115f6c144daa9c218e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubBannerFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"ThumbnailMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "ClubBannerFragment";
};
export type ClubBannerFragment$key = {
  readonly " $data"?: ClubBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubBannerFragment",
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
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "360cc2b5e3f9fbb4e0f6aa8524536431";

export default node;
