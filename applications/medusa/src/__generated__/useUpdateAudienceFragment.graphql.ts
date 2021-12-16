/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useUpdateAudienceFragment = {
    readonly id: string;
    readonly " $refType": "useUpdateAudienceFragment";
};
export type useUpdateAudienceFragment$data = useUpdateAudienceFragment;
export type useUpdateAudienceFragment$key = {
    readonly " $data"?: useUpdateAudienceFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"useUpdateAudienceFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUpdateAudienceFragment",
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
(node as any).hash = 'f2dd1f3b86cb3ebe502b24814dad8f7b';
export default node;
