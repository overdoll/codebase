/**
 * @generated SignedSource<<a61ff86071633339f22801e8b383b477>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ControlledVideoFragment$data = {
  readonly id: string;
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
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "42b65cc6d3e6a8ce3eb1ea369fa5b838";

export default node;
