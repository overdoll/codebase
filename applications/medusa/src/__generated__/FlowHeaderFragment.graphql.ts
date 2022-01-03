/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlowHeaderFragment = {
    readonly " $fragmentRefs": FragmentRefs<"checkPostRequirementsFragment">;
    readonly " $refType": "FlowHeaderFragment";
};
export type FlowHeaderFragment$data = FlowHeaderFragment;
export type FlowHeaderFragment$key = {
    readonly " $data"?: FlowHeaderFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FlowHeaderFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowHeaderFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "checkPostRequirementsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'b71aeae73c3b1e83f4151e6de8991dc2';
export default node;
