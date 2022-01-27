/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlowHeaderFragment = {
    readonly " $fragmentRefs": FragmentRefs<"checkPostRequirementsFragment" | "ProcessContentFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProcessContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'c3b56f8d9f198223a1e6495fbf9fb1a7';
export default node;
