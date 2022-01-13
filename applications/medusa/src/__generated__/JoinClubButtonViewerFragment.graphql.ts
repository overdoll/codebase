/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type JoinClubButtonViewerFragment = {
    readonly clubMembershipsLimit: number;
    readonly clubMembershipsCount: number;
    readonly " $refType": "JoinClubButtonViewerFragment";
};
export type JoinClubButtonViewerFragment$data = JoinClubButtonViewerFragment;
export type JoinClubButtonViewerFragment$key = {
    readonly " $data"?: JoinClubButtonViewerFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"JoinClubButtonViewerFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubButtonViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsLimit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsCount",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '30529c7b0eabb5adc6e85910bc63948e';
export default node;
