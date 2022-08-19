/**
 * @generated SignedSource<<72c7767683f726244106ef59e442685e>>
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
  readonly " $fragmentSpreads": FragmentRefs<"RenderVideoFragment" | "VideoBackgroundFragment">;
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
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "2a889cdf16211e39851d9a9550e43cbf";

export default node;
