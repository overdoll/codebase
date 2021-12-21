/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlowFooterFragment = {
    readonly " $fragmentRefs": FragmentRefs<"FlowForwardButtonFragment">;
    readonly " $refType": "FlowFooterFragment";
};
export type FlowFooterFragment$data = FlowFooterFragment;
export type FlowFooterFragment$key = {
    readonly " $data"?: FlowFooterFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FlowFooterFragment">;
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
(node as any).hash = 'd166dc317911679a6b21a2f779ae9498';
export default node;
