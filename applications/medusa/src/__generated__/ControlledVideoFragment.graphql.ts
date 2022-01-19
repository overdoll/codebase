/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ControlledVideoFragment = {
    readonly " $fragmentRefs": FragmentRefs<"RenderVideoFragment">;
    readonly " $refType": "ControlledVideoFragment";
};
export type ControlledVideoFragment$data = ControlledVideoFragment;
export type ControlledVideoFragment$key = {
    readonly " $data"?: ControlledVideoFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ControlledVideoFragment">;
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
(node as any).hash = 'd0f0048a7445ac40dafd8ddc6c920783';
export default node;
