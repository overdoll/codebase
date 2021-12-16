/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdatePostFlowFragment = {
    readonly " $fragmentRefs": FragmentRefs<"FlowStepsFragment" | "FlowFooterFragment" | "FlowHeaderFragment">;
    readonly " $refType": "UpdatePostFlowFragment";
};
export type UpdatePostFlowFragment$data = UpdatePostFlowFragment;
export type UpdatePostFlowFragment$key = {
    readonly " $data"?: UpdatePostFlowFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UpdatePostFlowFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdatePostFlowFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FlowStepsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FlowFooterFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FlowHeaderFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = '33185ace4cce97d9b9f4054e0561b145';
export default node;
