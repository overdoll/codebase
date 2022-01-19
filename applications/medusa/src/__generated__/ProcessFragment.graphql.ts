/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProcessFragment = {
    readonly " $fragmentRefs": FragmentRefs<"RootProcessContentFragment">;
    readonly " $refType": "ProcessFragment";
};
export type ProcessFragment$data = ProcessFragment;
export type ProcessFragment$key = {
    readonly " $data"?: ProcessFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ProcessFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProcessFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RootProcessContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'd5818f4a6fde1a4964e0424817db36da';
export default node;
