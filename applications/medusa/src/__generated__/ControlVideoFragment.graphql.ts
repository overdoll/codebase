/**
 * @generated SignedSource<<15b5260fd59cf17acb754df681b24178>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ControlVideoFragment$data = {
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "useVideoControlsFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "dadf82919aad20a045f49bbc6af66f49";

export default node;
