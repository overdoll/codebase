/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlowHeaderFragment = {
    readonly " $fragmentRefs": FragmentRefs<"useCheckRequirementsFragment">;
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
      "name": "useCheckRequirementsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'cf8763855c099df759353ffd089fbcd7';
export default node;
