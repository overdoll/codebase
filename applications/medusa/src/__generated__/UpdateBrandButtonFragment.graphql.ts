/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateBrandButtonFragment = {
    readonly id: string;
    readonly club: {
        readonly id: string;
    };
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
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
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
(node as any).hash = '18b174e970b33010c457a749f07b5f70';
export default node;
