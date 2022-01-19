/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProcessButtonFragment = {
    readonly id: string;
    readonly content: ReadonlyArray<{
        readonly id: string;
        readonly processed: boolean;
    }>;
    readonly " $refType": "ProcessButtonFragment";
};
export type ProcessButtonFragment$data = ProcessButtonFragment;
export type ProcessButtonFragment$key = {
    readonly " $data"?: ProcessButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ProcessButtonFragment">;
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
  "name": "ProcessButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "processed",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();
(node as any).hash = 'cb30e6c90977e0240827c73ffbcc8c8a';
export default node;
