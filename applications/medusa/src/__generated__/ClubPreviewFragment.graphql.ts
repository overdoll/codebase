/**
 * @generated SignedSource<<f7a506f3124ee7aa41df691fbf7e24e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPreviewFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment">;
  readonly " $fragmentType": "ClubPreviewFragment";
};
export type ClubPreviewFragment$key = {
  readonly " $data"?: ClubPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPreviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubThumbnailFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "79a1ca5a8faa9b01aca7edfebb267778";

export default node;
