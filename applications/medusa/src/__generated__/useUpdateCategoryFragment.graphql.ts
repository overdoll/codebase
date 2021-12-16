/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useUpdateCategoryFragment = {
    readonly id: string;
    readonly " $refType": "useUpdateCategoryFragment";
};
export type useUpdateCategoryFragment$data = useUpdateCategoryFragment;
export type useUpdateCategoryFragment$key = {
    readonly " $data"?: useUpdateCategoryFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"useUpdateCategoryFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUpdateCategoryFragment",
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
(node as any).hash = 'f3869d2b15ed158c7beabb496a95b627';
export default node;
