/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UploadFlowHeaderFragment = {
    readonly " $fragmentRefs": FragmentRefs<"ProcessContentFragment">;
    readonly " $refType": "UploadFlowHeaderFragment";
};
export type UploadFlowHeaderFragment$data = UploadFlowHeaderFragment;
export type UploadFlowHeaderFragment$key = {
    readonly " $data"?: UploadFlowHeaderFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadFlowHeaderFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadFlowHeaderFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProcessContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '02267550f973fec42a31a381ed224a6c';
export default node;
