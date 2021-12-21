/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateBrandButtonFragment = {
    readonly id: string;
    readonly brand: {
        readonly id: string;
    } | null;
    readonly " $refType": "UpdateBrandButtonFragment";
};
export type UpdateBrandButtonFragment$data = UpdateBrandButtonFragment;
export type UpdateBrandButtonFragment$key = {
    readonly " $data"?: UpdateBrandButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UpdateBrandButtonFragment">;
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
  "name": "UpdateBrandButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Brand",
      "kind": "LinkedField",
      "name": "brand",
      "plural": false,
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
(node as any).hash = '502ee53f53c35faf7bde8a5831e0c332';
export default node;
