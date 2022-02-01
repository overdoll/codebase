/**
 * @generated SignedSource<<f86f241537b6db8cf0054ccf12351dfe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FlowFooterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FlowForwardButtonFragment">;
  readonly " $fragmentType": "FlowFooterFragment";
};
export type FlowFooterFragment = FlowFooterFragment$data;
export type FlowFooterFragment$key = {
  readonly " $data"?: FlowFooterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FlowFooterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowFooterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FlowForwardButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "d166dc317911679a6b21a2f779ae9498";

export default node;
