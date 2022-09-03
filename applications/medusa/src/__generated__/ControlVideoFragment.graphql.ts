/**
 * @generated SignedSource<<7f23827748704d2673569a7637c46390>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ControlVideoFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"useVideoControlsFragment">;
  readonly " $fragmentType": "ControlVideoFragment";
};
export type ControlVideoFragment$key = {
  readonly " $data"?: ControlVideoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ControlVideoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ControlVideoFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useVideoControlsFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "a998017bfbfe022f0e2538ed322a2603";

export default node;
