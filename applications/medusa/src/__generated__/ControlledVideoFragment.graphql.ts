/**
 * @generated SignedSource<<819aaaf771e7cda0afb7d5aaed7cbe9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ControlledVideoFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RenderVideoFragment">;
  readonly " $fragmentType": "ControlledVideoFragment";
};
export type ControlledVideoFragment = ControlledVideoFragment$data;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "RenderVideoFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "d0f0048a7445ac40dafd8ddc6c920783";

export default node;
