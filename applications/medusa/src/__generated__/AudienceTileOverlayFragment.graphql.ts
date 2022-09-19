/**
 * @generated SignedSource<<dedb3e4091e5b8beab257c0a4f84e337>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AudienceTileOverlayFragment$data = {
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"AudienceBannerFragment">;
  readonly " $fragmentType": "AudienceTileOverlayFragment";
};
export type AudienceTileOverlayFragment$key = {
  readonly " $data"?: AudienceTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AudienceTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AudienceTileOverlayFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AudienceBannerFragment"
    }
  ],
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "2e22c530f7fcf80e27dc21110a2d55b0";

export default node;
