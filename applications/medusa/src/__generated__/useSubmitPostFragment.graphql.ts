/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useSubmitPostFragment = {
    readonly id: string;
    readonly " $refType": "useSubmitPostFragment";
};
export type useSubmitPostFragment$data = useSubmitPostFragment;
export type useSubmitPostFragment$key = {
    readonly " $data"?: useSubmitPostFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"useSubmitPostFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useSubmitPostFragment",
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
(node as any).hash = 'd1ae3e23e4bfdb82bc14b213dc3bf626';
export default node;
