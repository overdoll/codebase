/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useUpdateContentFragment = {
    readonly id: string;
    readonly " $refType": "useUpdateContentFragment";
};
export type useUpdateContentFragment$data = useUpdateContentFragment;
export type useUpdateContentFragment$key = {
    readonly " $data"?: useUpdateContentFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"useUpdateContentFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUpdateContentFragment",
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
(node as any).hash = 'dd4d2de9ae9cbb4039f5b1d150c707e9';
export default node;
