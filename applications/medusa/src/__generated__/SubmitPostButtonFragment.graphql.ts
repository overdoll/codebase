/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SubmitPostButtonFragment = {
    readonly id: string;
    readonly " $refType": "SubmitPostButtonFragment";
};
export type SubmitPostButtonFragment$data = SubmitPostButtonFragment;
export type SubmitPostButtonFragment$key = {
    readonly " $data"?: SubmitPostButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SubmitPostButtonFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmitPostButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'd2ed74d380b83af3fcdf503c1030600f';
export default node;
