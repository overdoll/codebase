/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceIconFragment = {
    readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
    readonly " $refType": "ResourceIconFragment";
};
export type ResourceIconFragment$data = ResourceIconFragment;
export type ResourceIconFragment$key = {
    readonly " $data"?: ResourceIconFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceIconFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceItemFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};
(node as any).hash = '03da2a16b7301d10959b565ebcd28268';
export default node;
