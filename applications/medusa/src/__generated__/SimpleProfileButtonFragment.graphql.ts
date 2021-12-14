/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SimpleProfileButtonFragment = {
    readonly avatar: unknown;
    readonly " $refType": "SimpleProfileButtonFragment";
};
export type SimpleProfileButtonFragment$data = SimpleProfileButtonFragment;
export type SimpleProfileButtonFragment$key = {
    readonly " $data"?: SimpleProfileButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SimpleProfileButtonFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SimpleProfileButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '07e37685487bc155776476279634d5fe';
export default node;
