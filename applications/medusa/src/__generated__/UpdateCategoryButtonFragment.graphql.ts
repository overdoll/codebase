/**
 * @generated SignedSource<<e5a73fccf9e4906dd6b141d92c4facb8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateCategoryButtonFragment$data = {
  readonly id: string;
  readonly categories: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly " $fragmentType": "UpdateCategoryButtonFragment";
};
export type UpdateCategoryButtonFragment = UpdateCategoryButtonFragment$data;
export type UpdateCategoryButtonFragment$key = {
  readonly " $data"?: UpdateCategoryButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdateCategoryButtonFragment">;
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

(node as any).hash = "a3070fccc8c5db4dad3c4446e479716a";

export default node;
