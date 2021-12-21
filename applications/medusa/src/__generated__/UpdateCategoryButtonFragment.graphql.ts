/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateCategoryButtonFragment = {
    readonly id: string;
    readonly categories: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly " $refType": "UpdateCategoryButtonFragment";
};
export type UpdateCategoryButtonFragment$data = UpdateCategoryButtonFragment;
export type UpdateCategoryButtonFragment$key = {
    readonly " $data"?: UpdateCategoryButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UpdateCategoryButtonFragment">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdateCategoryButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "categories",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();
(node as any).hash = 'a3070fccc8c5db4dad3c4446e479716a';
export default node;
