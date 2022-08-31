/**
 * @generated SignedSource<<7d38231dfaa3c1173a363400f47f63bd>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ControlVideoFragment" | "RenderVideoFragment" | "VideoBackgroundFragment">;
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
      "name": "VideoBackgroundFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RenderVideoFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ControlVideoFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "cba86dc6159a95352c53bba530498531";

export default node;
