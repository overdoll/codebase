/**
 * @generated SignedSource<<4ed76a5baf32c8adde78b2adb35d3b2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ControlledVideoFragment$data = {
  readonly videoNoAudio: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"RenderVideoFragment">;
  readonly " $fragmentType": "ControlledVideoFragment";
};
export type ControlledVideoFragment$key = {
  readonly " $data"?: ControlledVideoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ControlledVideoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ControlledVideoFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "videoNoAudio",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RenderVideoFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "62574abd803f6e9bf8ca33066e4b8c79";

export default node;
