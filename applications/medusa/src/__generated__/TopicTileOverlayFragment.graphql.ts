/**
 * @generated SignedSource<<eecd8b3fce32a7841c432c99d76fb3bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TopicTileOverlayFragment$data = {
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"TopicBannerFragment">;
  readonly " $fragmentType": "TopicTileOverlayFragment";
};
export type TopicTileOverlayFragment$key = {
  readonly " $data"?: TopicTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TopicTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TopicTileOverlayFragment",
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
      "name": "TopicBannerFragment"
    }
  ],
  "type": "Topic",
  "abstractKey": null
};

(node as any).hash = "c84b64eeba06c5a46a6565c6d980b3b8";

export default node;
