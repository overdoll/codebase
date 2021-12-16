/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useUpdateBrandFragment = {
    readonly id: string;
    readonly " $refType": "useUpdateBrandFragment";
};
export type useUpdateBrandFragment$data = useUpdateBrandFragment;
export type useUpdateBrandFragment$key = {
    readonly " $data"?: useUpdateBrandFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"useUpdateBrandFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUpdateBrandFragment",
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
(node as any).hash = '96a904e44032abd131b5b4cc395ebc17';
export default node;
